import React from "react";
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Profile = props => 
    <div className="row profile">
        <div className="card">
            <div className="text-center card-header"> 
                <img src={props.user.img} alt="User Img" />
            </div>
            
            <div className="card-body text-center">
                <h4 className="card-title">{props.user.username}</h4>
                
                    { props.user.twitterId ? 
                        <a href={`https://twitter.com/${props.user.screenName}`} target='new'> 
                            <FontAwesomeIcon icon={faTwitter} />  { props.user.screenName}
                        </a>
                    :null
                    }
            </div>
        </div>
    </div>

export default Profile;