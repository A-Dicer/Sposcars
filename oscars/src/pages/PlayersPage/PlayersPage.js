import React, { Component } from "react";
import API from "../../utils/API";
import "./Overlays.css";
import Navbar from "../../components/Navbar";
import Noms from "../../components/Noms";
import Picks from "../../components/Picks";
import Profile from "../../components/Profile";
import noms from "../../assets/js/noms.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faArrowUp, faArrowDown, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons'


const io = require('socket.io-client')  
const socket = io() 

class PlayersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
     
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
  // //check for back button 
  // performance.navigation.type === 2
  //  ? window.location.reload(true) //reload page
  //  : this.getPicks(this.props.match.params.id) //get user picks
}

componentWillUnmount() {socket.emit('disconnect')}
// -------------------------------------------- suffix ------------------------------------------------------
  suffix = (i) => {
    let j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  }

timeConvert = (time) =>{
  
  // let data =  Object.assign({}, this.state.time)

  // data.hour = Math.floor(time/3600);
  // data.min = Math.floor((time/60-(data.hour*60)));
  // data.sec = (time%60);

  // this.setState({time: data})
}




// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container-fluid" style={{"opacity": this.state.opacity}}> 
        <div className="row justify-content-center" id="leaderboard" 
          style={{height: '720px', width: '1280px', border: 'solid'}}>
          {/* <table className="table  table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col"><FontAwesomeIcon icon={faUsers} /></th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
                <th scope="col">Pos</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              { this.state.players.length 
                  ? this.state.players.map((user, i)=>
                      <tr key={`user${i}`} >
                        {(i > 0 && user.place === this.state.players[i-1].place) || user.place === 0 ? <th scope="row text-right" style={{'border': 'none'}}></th> : <th scope="row text-right">{this.suffix(user.place)}:</th>}
                        <td className="text-truncate"> {user.guru ?<FontAwesomeIcon icon={faUserAstronaut} /> :null} {user.username} </td>
                        <td>{user.points}pts</td>
                        <td>{user.direction ? <FontAwesomeIcon icon={user.direction === 'down' ? faArrowDown : faArrowUp} />: null }</td>
                        <td><button className="btn btn-sm" name={user.username} value={i}><FontAwesomeIcon icon={faUser} /></button></td>
                      </tr>
                  )
                  :null
              }
            </tbody>
          </table> */}
        </div>     
      </div>
    );
  }
}

export default PlayersPage;
