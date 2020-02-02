import React from "react";
import "./ProPicks.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCog, faCheck, faCube } from '@fortawesome/free-solid-svg-icons'

const timeConvert = (time) =>{
    let hours = Math.floor(time/3600);
    let minutes = Math.floor((time/60-(hours*60)));
    let seconds = (time%60);

    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds;

    return `${hours}:${minutes}:${seconds}`;
}

const ProPicks = props =>
    <div className="row proPicks">
        <div className="col-12">
            <div className="card-body">
            <h4> Oscar Category Select</h4>
            <hr />
                {
                    props.picks.map((pick, i) =>
                        <div className="card-text" key={`pick${i}`} style={{'fontSize': i===props.pos ?'20px':null, 'color': i===props.pos ? '#bd2130':null }} onClick={function(){props.edit(i)}}> 
                            <FontAwesomeIcon icon={faCube}  style={{'color': i===props.pos ?"#000":null, 'fontSize': '13px'}} /> {props.oscars[i].category} {props.picks[i] ? <FontAwesomeIcon icon={faCheck} style={{'color': "green"}} />:null}
                        </div>       
                    )
                }
            </div>
        </div>
    </div>
 
export default ProPicks;