import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faUserAstronaut, faUser, faUsers, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import "./Sposcars.css";

export const Leaderboard = props => 
  <table className="table  table-sm">
    <thead className="thead-dark">
      <tr>
        <th scope="col"><FontAwesomeIcon icon={faUsers} className={props.guru ? '' : 'selectedGuru'}/> / <FontAwesomeIcon icon={faUserAstronaut} className={props.guru ? 'selectedGuru' : ''}/></th>
        <th scope="col">Name</th>
        <th scope="col">Points</th>
        <th scope="col"></th>
        <th scope="col">View</th>
      </tr>
    </thead>
    <tbody>
      { props.data.length 
          ? props.data.map((user, i)=>
              <tr key={`user${i}`} className={user.username === props.user.username ? 'selected' : null}>
                <th scope="row text-right">{user.place}: </th>
                <td> {user.guru ?<FontAwesomeIcon icon={faUserAstronaut} /> :null} {user.username} </td>
                <td>{user.points}</td>
                <td><FontAwesomeIcon icon={props.user.directioin === 'Down' ? faArrowDown : faArrowUp} /> {user.movement} </td>
                <td><button className="btn btn-sm" name={user.username} value={i} onClick={props.onClick}><FontAwesomeIcon icon={faUser} /></button></td>
              </tr>
          )
          :null
      }
    </tbody>
  </table>;
