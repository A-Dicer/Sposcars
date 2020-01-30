const db = require("./models");
let dataPrev = [];  

exports = module.exports = function(io) {  
  io.on('connection', (socket) => {  // Set socket.io listeners ------------------------

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
      let dataCurrent = [];
        // tallyPoints -------------------------------------
        db.User.find({}, function(err, user){
          if(data.filter((picks)=> picks).length > 24){
            dataPrev.forEach((player, a) => {
              db.Picks.findOne({"_id": player.oscar}, function(err, picks){
                // console.log(`user: ${player.username} - userTime: ${picks.picks[24]} - difference: ${Math.abs(picks.picks[24] - data[24])}`)
                player.time = Math.abs(picks.picks[24] - data[24])
              })  
            })

            setTimeout(()=>{
              //sort
              dataPrev.sort(function compareNumbers(a, b){ 
                if(a.points === b.points) return a.time - b.time
                else return b.points - a.points
              })

              let same = 1;
              let position = 1;
              //find position
              dataPrev.forEach((player, i)=>{
                user[i-1]
                ? 
                  player.time === user[i-1].time
                  ? same += 1
                  : ( position += same, same = 1 )
                : null

              player.place = position;
              })

              //movement
              if(data.filter(res => res).length > 1){
                dataPrev.forEach((player, i)=> {
                  if(player.place === dataPrev[i].place) player.direction = '';
                  else if(player.place < dataPrev[i].place) player.direction = 'up';
                  else player.direction = 'down';
                })
              }

              socket.broadcast.emit("leaderboardInfo", {"leaderboard": dataPrev, "picks": data}) 
            },500 ) 
           
          } else {
          user.forEach((player, a) => {
            player.points = 0; 
            db.Picks.findOne({"_id": player.oscar}, function(err, picks){
              picks.picks.forEach((pick, i) => {
                if(pick && pick === data[i] && i < 24) player.points++    
              })
              dataCurrent.push(player)  
            })  
          })

          setTimeout(()=>{
            //sort
            dataCurrent.sort(function compareNumbers(a, b){ 
              if(a.points === b.points) return b.username - a.username
              else return b.points - a.points
            })

            let same = 1;
            let position = 1;

            //find position
            dataCurrent.forEach((player, i)=>{
              dataCurrent[i-1]
              ? 
                player.points === dataCurrent[i-1].points
                ? same += 1
                : ( position += same, same = 1 )
              : null

            player.place = position;
            })

            //movement
            if(data.filter(res => res).length > 1){
              dataCurrent.forEach((player, i)=> {
                if(player.place === dataPrev[i].place) player.direction = '';
                else if(player.place < dataPrev[i].place) player.direction = 'up';
                else player.direction = 'down';
              })
            }
          }, 500)
          setTimeout(()=>{
            socket.broadcast.emit("leaderboardInfo", {"leaderboard": dataCurrent, "picks": data})
            dataPrev = Object.assign([], dataCurrent)
          }, 1000)    
        }
      }) 
    })

//--------------------------------------------------------------------------------------

  })
}