import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faUserAstronaut, faUser, faUsers, faArrowDown, faPlayCircle} from '@fortawesome/free-solid-svg-icons';
import "./Sposcars.css";

const suffix = (i) => {
  let j = i % 10, k = i % 100;
  if (j == 1 && k != 11) return i + "st";
  if (j == 2 && k != 12) return i + "nd";
  if (j == 3 && k != 13) return i + "rd";
  return i + "th";
}

export const Leaderboard = props => 
  <table className="table  table-sm">
    <thead className="thead-dark">
      <tr>
        <th scope="col"><FontAwesomeIcon icon={faUsers} className={props.guru ? '' : 'selectedGuru'}/> / <FontAwesomeIcon icon={faUserAstronaut} className={props.guru ? 'selectedGuru' : ''}/></th>
        <th scope="col">Name</th>
        <th scope="col">Points</th>
        <th scope="col">Pos</th>
        <th scope="col">View</th>
      </tr>
    </thead>
    <tbody>
      { props.data.length 
          ? props.data.map((user, i)=>
              <tr key={`user${i}`} className={user.username === props.user.username ? 'selected' : null}>
                {i > 0 && user.place === props.data[i-1].place ? <th scope="row text-right" style={{'border': 'none'}}></th> : <th scope="row text-right">{suffix(user.place)}:</th>}
                <td> {user.guru ?<FontAwesomeIcon icon={faUserAstronaut} /> :null} {user.username} </td>
                <td>{user.points}pts</td>
                <td>{user.direction ? <FontAwesomeIcon icon={user.direction === 'down' ? faArrowDown : faArrowUp} />: null }</td> 
                <td><button className="btn btn-sm" name={user.username} value={i} onClick={props.onClick}><FontAwesomeIcon icon={faUser} /></button></td>
              </tr>
          )
          :null
      }
    </tbody>
  </table>;
