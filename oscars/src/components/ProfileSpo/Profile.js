import React from "react";
import "./Profile.css";
import noms from "../../assets/js/noms.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faChevronDown, faChevronUp, faListUl, faUserAstronaut, faAward, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'
import { faCircle , faTimesCircle, faCheckCircle} from '@fortawesome/free-regular-svg-icons'

const timeConvert = (time) => {
    let hours = Math.floor(time/3600);
    let minutes = Math.floor((time/60-(hours*60)));
    let seconds = (time%60);
    if (minutes < 10) minutes = "0" + minutes
    if (seconds < 10) seconds = "0" + seconds;
    return `${hours}:${minutes}:${seconds}`;
}

const suffix = (i) => {
    let j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  }

const Profile = props => 
    <div className="row profile" >
        <div className="col-12">
            <div className="text-center card-header">                    
            </div>            
            <div className="card-body text-center" style={{'opacity': props.opacity}}>
                <img src={props.user.img} alt="User Img" /> 
                <h4 className="card-title">  
                    { props.user.guru ? <FontAwesomeIcon icon={faUserAstronaut} />  : null } {props.user.username}
                </h4>

                { props.user.twitterId 
                ? <a href={`https://twitter.com/${props.user.screenName.replace('@', '')}`} target='new'> 
                    <FontAwesomeIcon icon={faTwitter} /> { props.user.screenName}
                  </a>
                : null
                }

                <hr />     
                <div className="col-12"> 
                    <h6> 
                        <FontAwesomeIcon icon={faAward} /> {props.user.place !== 0 ? suffix(props.user.place) : null} Place {props.user.direction ? <FontAwesomeIcon icon={props.user.direction === 'down' ? faArrowDown : faArrowUp} />: null }
                    </h6>
                    {props.user.points}pts | <FontAwesomeIcon icon={faCheckCircle} /> {
                        isNaN(Math.round((props.picks.filter((pick, i)=> pick===props.livePicks[i] && pick).length/props.livePicks.filter((pick)=> pick).length)*100))
                        ? 0 : Math.round((props.picks.filter((pick, i)=> pick===props.livePicks[i] && pick).length/props.livePicks.filter((pick)=> pick).length)*100)
                        }% | <FontAwesomeIcon icon={faListUl} /> Selections  <FontAwesomeIcon icon={props.picksHeight === 0 ? faChevronUp : faChevronDown} onClick={function(){props.picksBtn(0)}} />
                </div>
            </div>

            <div className="row picksSpo" id="picksSpo" style={{'height': props.picksHeight}}>
                <div className="col-12">
                    { props.picks.map((pick, i) =>
                        <div className="row category" key={`pick${i}`} style={i === 0 ?{'paddingTop':'10px'} : {'borderTop':'solid #dfd9c9 1px'}}>
                            <div className="">
                            { 
                                props.livePicks[i]  
                                ? props.livePicks[i] === pick 
                                    ? <FontAwesomeIcon icon={faCheckCircle} /> 
                                    : <FontAwesomeIcon icon={faTimesCircle} /> 
                                : <FontAwesomeIcon icon={faCircle} /> 
                            }
                            </div>
                            <div className="text-truncate"  > 
                                {noms[i].category}: 
                                <div className="text-truncate"> 
                                    {i===24 ? timeConvert(pick) :pick} 
                                </div> 
                            </div>   
                        </div>   
                    )}
                </div>
            </div>
        </div>
    </div>

export default Profile;