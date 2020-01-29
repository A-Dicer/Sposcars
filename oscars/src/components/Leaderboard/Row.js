import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faUserAstronaut, faUser} from '@fortawesome/free-solid-svg-icons';

export const Row = props =>

  <tbody>
     { props.data.length 
        ? props.data.map((user, i)=>
            <tr key={`user${i}`} className={user.username === props.user.username ? 'table-success' : null}>
              <th scope="row text-right">{i+1}: </th>
              <td> {user.guru ?<FontAwesomeIcon icon={faUserAstronaut} /> :null} {user.username} </td>
              <td>84pts</td>
              <td><FontAwesomeIcon icon={faArrowUp} />  19</td>
              <td><button className="btn btn-sm" name={user.username} value={i} onClick={props.onClick}><FontAwesomeIcon icon={faUser} /></button></td>
            </tr>
            //  <button id={i} type="button" className=" userBtn " key={`user${i}`}>
            //     <div className="row ">
            //       <div className="">
            //         {i+1}:
            //       </div>
            //       <div className="text-truncate">
            //         {user.username} {user.guru ?<FontAwesomeIcon icon={faUserAstronaut} /> :null}
            //       </div>
            //       <div className="">
            //         84pts
            //       </div>
                  
            //     </div>
            //   </button>       
        )
        :null
     }
  </tbody>;

{/* <div className="inspect" key={`user${i}`}> <FontAwesomeIcon icon={faArrowUp} />  19 | {i+1}: {user.username} {user.guru ?<FontAwesomeIcon icon={faUserAstronaut} /> :null}</div>  */}