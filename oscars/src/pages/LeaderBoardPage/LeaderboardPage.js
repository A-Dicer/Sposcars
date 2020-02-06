import React, { Component } from "react";
import "./LeaderboardPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faArrowUp, faArrowDown, faUsers } from '@fortawesome/free-solid-svg-icons';

let io; let socket;
const time = toString(new Date())

class LeaderboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      opacity: 0 
    }
}

updateLeaderboardFromSockets(payload) {
  let finalInfo =  payload.leaderboard.filter((user)=> user.username !== "SiftPop")
  this.setState({players: finalInfo, livePicks: payload.picks, opacity: 1})
}

startCheck(payload) {
  if(payload.users.length){
    let data = payload.users.filter((user)=> user.username !== "SiftPop")
    this.setState({players: data, opacity: 1})
  }
}

componentDidMount() {
  io = require('socket.io-client')  
  socket = io() 
  socket.on("leaderboardInfo", (payload) => {this.updateLeaderboardFromSockets(payload)})
  socket.on(time, (payload) => {this.startCheck(payload)})
  socket.emit('startCheck', time)
} // socket.io to check if started
componentWillUnmount() {socket.emit('disconnect')}
// -------------------------------------------- suffix ------------------------------------------------------
  suffix = (i) => {
    let j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  }

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container-fluid" style={{"opacity": this.state.opacity}}> 
        <div className="row justify-content-center" id="leaderboardOverlay" style={{opacity: this.state.opacity}}>
          <table className="table  table-sm">
            <thead className="thead-dark">
              <tr>
                <th scope="col"><FontAwesomeIcon icon={faUsers} /></th>
                <th scope="col">Name</th>
                <th scope="col">Points</th>
                <th scope="col">Pos</th>
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
                      </tr>
                  )
                  :null
              }
            </tbody>
          </table>
        </div>     
      </div>
    );
  }
}

export default LeaderboardPage;
