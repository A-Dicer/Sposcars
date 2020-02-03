import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import Profile from "../../components/ProfileSpo";
// import noms from "../../assets/js/noms.js";
import {Leaderboard, Category} from "../../components/Leaderboard/";


//remove siftPop from the list. √
//check game state when arriving... √
//mobile fixes. 
//save siftPops data
//selections always visable.. although it is nice to have it hidden for mobile.
//min height for entire thing

const io = require('socket.io-client')  
const socket = io() 
let time = toString(new Date())
class Sposcars extends Component {
  constructor(props) {
  super(props);
  this.state = {
    catOpacity: 1,
    proOpacity: 0,
    height: 0,
    width: 0,
    start: false,
    noms: {category: '', noms: [{movie: '', perc: 0}]},
    guru: false,
    livePicks: [],
    players: {},
    user:  {},
    picks: [],
    picksHeight: 0,
  }
    socket.on("oscarNom", (payload) => {this.updateNomsFromSockets(payload)})
    socket.on("leaderboardInfo", (payload) => {this.updateLeaderboardFromSockets(payload)})
    socket.on(time, (payload) => {this.startCheck(payload)})
}
  componentDidMount() { 
    this.loadUsers(); // load users
    this.setState({ width: window.innerWidth, height: window.innerHeight }); //set width and height
    socket.emit('startCheck', time) // socket.io to check if started
    socket.emit('connect');
    window.addEventListener('resize', this.updateDimensions);  //add listener
  }

  componentWillUnmount() {window.removeEventListener('resize', this.updateDimensions); socket.emit('disconnect')}

// ------------------------------------------- socketIO ------------------------------------------------------
  startCheck(payload) {
    if(payload.users.length){
      this.setState({players: payload.users, livePicks: payload.picks })
      this.userData(payload.users[0])
    }
  }

  updateNomsFromSockets(payload) {
    if(payload.info){
      let tempInfo = JSON.parse(JSON.stringify(payload.info));

      tempInfo.noms.forEach((pick)=>pick.perc = 0)
      this.setState({noms: tempInfo})
      
      setTimeout(()=>{this.setState({catOpacity: 0})}, 100)
        let time = 500;
        tempInfo.noms.forEach((nom, i)=>{
          setTimeout(()=> {
            nom.perc = payload.info.noms[i].perc
            this.setState({noms: tempInfo})
          }, time)      
          time = time+100;
        }) 

    } else {
      this.setState({catOpacity: 1})
      setTimeout(()=>{this.setState({noms: {category: '', noms: [{movie: '', perc: 0}]}})}, 1000)
    }
    
  }
  updateLeaderboardFromSockets(payload) {
    let newUserInfo = payload.leaderboard.filter((user)=> user._id === this.state.user._id)
    let finalInfo =  payload.leaderboard.filter((user)=> user.username !== "SiftPop")
    
    this.userData(newUserInfo[0])
    
    this.setState({
      players: finalInfo, 
      livePicks: payload.picks
    })
  }

// --------------------------------------- updateDimensions --------------------------------------------------
  updateDimensions = () => {
   if(this.state.width > 768) this.picksBtn(1);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

// ------------------------------------------- userData ------------------------------------------------------
  userData = (user) => {
    if(user.twitterId){
      API.getTwitter(user.twitterId)
        .then(res => {
          user.screenName = `@${res.data.results.screenName}`;
          user.img = res.data.results.img
          this.setState({user: user})
        })
        .catch(err => console.log(err))
    } else {
      user.img = "https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
      this.setState({user: user})
    }
    API.getPicks(user._id)
        .then(res => {this.setState({picks: res.data.results.picks})})
        .catch(err => console.log(err))
  }

// ------------------------------------------ updateUser -----------------------------------------------------
  updateUser = event => {
    event.preventDefault()
    let {value} = event.target;
    let data =  Object.assign({}, this.state.players[value])
    this.setState({proOpacity: 0})

    setTimeout(()=>{
      if(data.twitterId){
        API.getTwitter(this.state.players[value].twitterId)
          .then(res => {
            data.screenName = `@${res.data.results.screenName}`;
            data.img = res.data.results.img
            this.setState({user: data})
          })
          .catch(err => console.log(err))
      } else {
        data.img = "https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
        this.setState({user: data})
      }
  
      API.getPicks(this.state.players[value]._id)
        .then(res => {this.setState({picks: res.data.results.picks})})
        .catch(err => console.log(err))
    }, 1100)

    setTimeout(()=>{this.setState({proOpacity: 1})}, 1200)
  }

// ------------------------------------------ loadUsers ------------------------------------------------------
  loadUsers = () => {
    API.getUsers()
      .then(res => {
        let users = res.data.results.filter((user)=> user.username !== "SiftPop")
        this.userData(users[0])
        this.setState({players: users})
        setTimeout(()=>{this.setState({proOpacity: 1})},500)
      })
      .catch(err => console.log(err));
  };

// ------------------------------------------- picksBtn ------------------------------------------------------
  picksBtn = (thing) => {
 
    let offsetHeight = document.getElementById('right').offsetHeight;
    let offsetHeight2 = document.getElementById('picksSpo').offsetHeight;
    let height;
    if(thing && this.state.picksHeight === 0) ;
    else if(thing){
      height = this.state.height - (offsetHeight - offsetHeight2) - 50
      this.setState({picksHeight: height})
    } 
    else {
      this.state.picksHeight === 0 ? height = this.state.height - offsetHeight -50 : height = 0
      this.setState({picksHeight: height})
    }
  }
  
// -----------------------------------------------------------------------------------------------------------
// ----------------------------------------- Frontend Code ---------------------------------------------------  
  render() {
    return (
      <div className="container-fluid" style={{"opacity": this.state.opacity}}>
        <Navbar info={this.state.user} />
        <div className="row">
          
          <div className={`col-md-8 left ${this.state.width < 768 ? ' order-2' : null}` }>
            <div className="row leaderboard">
              <div className="col-12" style={this.state.width > 768 ?{'height': this.state.height-50} :{'height': '400px'}}>
                <Leaderboard 
                  guru={this.state.guru} 
                  data={this.state.players} 
                  user={this.state.user} 
                  onClick={this.updateUser}
                  widthCheck={this.state.width > 768 ? true : false}
                />              
              </div>
            </div>
          </div>

          <div className={`col-md-4 right ${(this.state.width > 768) ? ' order-1' : null}` } style={(this.state.width > 786) ?{'height': this.state.height-50}:{'height': 'inherit'}} >
            <div className="row" id="right">
              <div className="col-12" >
                <Category oscars={this.state.noms} opacity={this.state.catOpacity} />      
              </div>
              <div className="col-12">
                <Profile
                  opacity={this.state.proOpacity}
                  start={this.state.start}
                  user={this.state.user} 
                  picks={this.state.picks}
                  livePicks={this.state.livePicks} 
                  picksBtn={this.picksBtn}
                  picksHeight={this.state.picksHeight}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sposcars;
