import React from "react";
import "./Picks.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faClipboardList } from '@fortawesome/free-solid-svg-icons'

const timeConvert = (time) =>{
    let hours = Math.floor(time/3600);
    let minutes = Math.floor((time/60-(hours*60)));
    let seconds = (time%60);

    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds;

    return `${hours}:${minutes}:${seconds}`;
}

const Picks = props =>
    <div className="row picks">
        <div className="card">
            <div className="card-header"> 
                <h4> <FontAwesomeIcon icon={faClipboardList}  /> Your Oscar Selections </h4>
            </div>
            
            <div className="card-body">
                {
                    props.picks.map((pick, i) =>
                        <div className="card-text" key={`pick${i}`}> 
                            {props.oscars[i].category}: 
                            <div> {i===24 ? timeConvert(pick) :pick} <FontAwesomeIcon 
                                icon={faEdit} 
                                onClick={function(){props.edit(i)}}
                                />
                            </div> 
                            <hr /> 
                        </div>       
                    )
                }
            </div>
        </div>
    </div>
 
export default Picks;