import React, { Component } from "react";
import API from "../../utils/API";
import "./PlayersPage.css";
import Navbar from "../../components/Navbar";
import Noms from "../../components/Noms";
import Picks from "../../components/Picks";
import Profile from "../../components/Profile";
import noms from "../../assets/js/noms.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faArrowUp, faArrowDown, faAward} from '@fortawesome/free-solid-svg-icons';
import {  } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let socket;
const time = toString(new Date())

class PlayersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      noms: noms 
    }
    // socket.on("leaderboardInfo", (payload) => {this.updateLeaderboardFromSockets(payload)})
  }

// updateLeaderboardFromSockets(payload) {
  
//   let finalInfo =  payload.leaderboard.filter((user)=> user.username !== "SiftPop")
  
//   this.setState({
//     players: finalInfo, 
//     livePicks: payload.picks
//   })
// }

  componentDidMount() {
    const io = require('socket.io-client')  
    socket = io() 
    socket.on('playerDisplay', (payload) => {this.updatePlayer(payload)})
    socket.emit('startCheck', time) // socket.io to check if started
    // //check for back button 
    // performance.navigation.type === 2
    //  ? window.location.reload(true) //reload page
    //  : this.getPicks(this.this.state.match.params.id) //get user picks
  }

  componentWillUnmount() {socket.emit('disconnect')}

  updatePlayer(payload) {
    this.setState({user: payload.player, opacity: payload.opacity})
    console.log(payload)
  }

// -------------------------------------------- suffix ------------------------------------------------------
  suffix = (i) => {
    let j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  }

timeConvert = (time) =>{
  let data =  Object.assign({}, this.state.time)

  data.hour = Math.floor(time/3600);
  data.min = Math.floor((time/60-(data.hour*60)));
  if(data.min < 10) data.min = `0${data.min}`
  data.sec = (time%60);
  if(data.sec < 10) data.sec = `0${data.sec}`
  return(`${data.hour}:${data.min}:${data.sec}`)
}

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div style={{'padding': '1vw'}}>
        {this.state.user
          ?
          <div className="container-fluid">   
            <div className="row justify-content-center" id="Player" style={{"opacity": this.state.opacity}}>
              <div className="col-6">
                <div className="card-body text-center">  
                  <img src={this.state.user.img} alt="User Img" />
                  <h4 className="card-title">  
                      { this.state.user.guru ? <FontAwesomeIcon icon={faUserAstronaut} />  : null } {this.state.user.username}
                  </h4>
                  { this.state.user.twitterId ? 
                      <a href={`https://twitter.com/${this.state.user.screenName.replace('@', '')}`} target='new'> 
                          <FontAwesomeIcon icon={faTwitter} /> { this.state.user.screenName}
                      </a>
                  : null
                  }
                  <hr />
                  <div className="col-12"> 
                      <h6> 
                          <FontAwesomeIcon icon={faAward} /> {this.state.user.place !== 0 ? this.suffix(this.state.user.place) : null} Place {this.state.user.direction ? <FontAwesomeIcon icon={this.state.user.direction === 'down' ? faArrowDown : faArrowUp} />: null } - {this.state.user.points}pts
                      </h6>
                  </div>
                </div> 
              </div>
              <div className="col-6">
                {
                  this.state.user.oscar.map((pick, i) =>
                  <div className="row category" key={`pick${i}`} style={i === 0 ?{'paddingTop':'.5vw'} : {'borderTop':'solid #000 1px'}}>
                    <div className="text-truncate" > 
                        {noms[i].category}: 
                        <div className="text-truncate"> 
                           <p>{i===24 ? this.timeConvert(pick) :pick}</p>
                        </div> 
                      </div>   
                  </div>
                  )
                }
              </div>
            </div>        
          </div>
        : null
        } 
      </div>
    );
  }
}

export default PlayersPage;
