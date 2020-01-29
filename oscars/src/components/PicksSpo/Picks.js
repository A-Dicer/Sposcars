import React from "react";
import "./Picks.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle , faTimesCircle, faCheckCircle} from '@fortawesome/free-regular-svg-icons'

const timeConvert = (time) =>{
    let hours = Math.floor(time/3600);
    let minutes = Math.floor((time/60-(hours*60)));
    let seconds = (time%60);

    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds;

    return `${hours}:${minutes}:${seconds}`;
}

const Picks = props =>
    <div className="row picksSpo">
            <div className="col-12">   
                {
                    props.picks.map((pick, i) =>
                        <div className="row category" key={`pick${i}`}>
                            {console.log(pick)}
                            <div className="">
                                { 
                                    props.livePicks[i]  
                                    ? props.livePicks[i] === pick 
                                        ? <FontAwesomeIcon icon={faCheckCircle} /> 
                                        : <FontAwesomeIcon icon={faTimesCircle} /> 
                                    : <FontAwesomeIcon icon={faCircle} /> 
                                }
                            </div>
                            <div className="card-text"  > 
                                {props.oscars[i].category}: 
                                <div> 
                                    {i===24 ? timeConvert(pick) :pick} 
                                </div> 
                            </div>   
                        </div>   
                    )
                }
            </div>
        
    </div>
 
export default Picks;