import React from "react";
import "./ProProfile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faTimesCircle, faUserAstronaut, faAward, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

const suffix = (i) => {
    let j = i % 10, k = i % 100;
    if (j === 1 && k !== 11) return i + "st";
    if (j === 2 && k !== 12) return i + "nd";
    if (j === 3 && k !== 13) return i + "rd";
    return i + "th";
  }

const Profile = props => 
    <div className="row profileOver" style={{'opacity': props.opacity}}>
        <FontAwesomeIcon icon={faTimesCircle} className="cancle" onClick={props.onClick}/>
        <div className="col-3">
            <img src={props.user.img} alt="User Img" /> 
        </div>
        <div className="col-9">
                
                <div className="card-body text-center" style={{'opacity': props.opacity}}>  
                    <h4 className="card-title">  
                        { props.user.guru ? <FontAwesomeIcon icon={faUserAstronaut} />  : null } {props.user.username}
                    </h4>

                    { props.user.twitterId ? 
                        <a href={`https://twitter.com/${props.user.screenName.replace('@', '')}`} target='new'> 
                            <FontAwesomeIcon icon={faTwitter} /> { props.user.screenName}
                        </a>
                    : null
                    }

                    <hr />
                    
                    <div className="col-12"> 
                        <h6> 
                            <FontAwesomeIcon icon={faAward} /> {props.user.place !== 0 ? suffix(props.user.place) : null} Place {props.user.direction ? <FontAwesomeIcon icon={props.user.direction === 'down' ? faArrowDown : faArrowUp} />: null } - {props.user.points}pts
                        </h6>
                    </div>
                </div>
            
        </div>

    </div>

export default Profile;