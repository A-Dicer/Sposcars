const db = require("./models");
let dataPrev = []; let picksBackup; 

//--------------------------------------- sort -----------------------------------------
const sort =(data)=>{
  data.sort(function compareNumbers(a, b){ 
    if(a.points === b.points) return a.time - b.time
    else return b.points - a.points
  })
  return data
}

//------------------------------------- position ---------------------------------------
const postion =(data, pos)=>{
  let same = 1; let position = 1;
  data.forEach((player, i)=>{
    if(data[i-1]){
      player[pos] === data[i-1][pos] ? same += 1 : ( position += same, same = 1 )
    }
    player.place = position;
  })
  return data
}

//------------------------------------- direction --------------------------------------
const direction =(data)=>{
  data.forEach((player, i)=> {
    let oldPlayer = dataPrev.filter((user)=> user.username === player.username)
    if(player.place === oldPlayer[0].place) player.direction = '';
    else if(player.place < oldPlayer[0].place) player.direction = 'up';
    else player.direction = 'down';
  })
  return data
}

//--------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------

exports = module.exports = function(io) {  
  io.on('connection', (socket) => {  // Set socket.io listeners ------------------------

//------------------------------------ startCheck --------------------------------------   
    socket.on('startCheck', function(data){
      socket.emit(data, {users: dataPrev, picks: picksBackup})
    })

//----------------------------------- inspectUpdate ------------------------------------
    socket.on('updateInspector', function(data){
      db.User.find({}, function(err, user){socket.broadcast.emit("inspector", user)})           
    })

//----------------------------------- categoryUpdate -----------------------------------
    socket.on('updateOscarNom', function(data){    
      if(data && data.pos !== 24){
        db.Picks.find({}, function(err, picks){ 
          data.info.noms.forEach((choice, i)=>{
          let pickAmt =  picks.filter((pick)=> pick.picks[data.pos] === choice.movie)
            choice.perc = `${Math.round((pickAmt.length/picks.length)*100)}%`
          })
          socket.broadcast.emit("oscarNom", data)
        })
      } else socket.broadcast.emit("oscarNom", false)
    });

//--------------------------------- leaderboardUpdate ----------------------------------  
    socket.on('updateLeaderboard', function(data){
      let dataCurrent = []; picksBackup = data;
      
      db.User.find({}, function(err, user){
        db.Picks.find({}, function(err, picks){
          if(data.filter((picks)=> picks).length > 24){
            dataCurrent = JSON.parse(JSON.stringify(dataPrev));
            // tallyDifference ----------------------------------      
            dataCurrent.forEach((player, a) => {
              let pickFilter = picks.filter((pick)=> pick.username.toString()=== player._id.toString());
              player.time = Math.abs(pickFilter[0].picks[24] - data[24])
            })
  
            setTimeout(()=>{
              dataCurrent = sort(dataCurrent)//sort
              dataCurrent = postion(dataCurrent, 'time')//find position     
              dataCurrent = direction(dataCurrent)//movement
              socket.broadcast.emit("leaderboardInfo", {"leaderboard": dataCurrent, "picks": data}) 
            }, 200) 
            
          } else {
            // tallyPoints -------------------------------------  
            user.forEach((player, a) => {
              let pickFilter = picks.filter((pick)=> pick.username.toString()=== player._id.toString());
              pickFilter[0].picks.forEach((pick, i) => {
                if(pick && pick === data[i] && i < 24) player.points++    
              })
              dataCurrent.push(player)   
            })

            setTimeout(()=>{
              dataCurrent = sort(dataCurrent)//sort
              dataCurrent = postion(dataCurrent, 'points')//find position
              if(data.filter(res => res).length > 1)dataCurrent = direction(dataCurrent)//movement        
              socket.broadcast.emit("leaderboardInfo", {"leaderboard": dataCurrent, "picks": data})
              dataPrev = Object.assign([], dataCurrent)
            }, 200)    
          }    
        })     
      }) 
    })
//--------------------------------------------------------------------------------------
  })
}