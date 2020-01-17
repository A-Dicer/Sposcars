import React from "react";
import "./Profile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

// --------------------------------------------- logOut ----------------------------------------------------
//redirects to logout page....
// const logOut = () => {window.location = "/logout"};

const Profile = props => 
    <div className="row profile">
        <div className="card">
            <div className="text-center card-header"> 
                <img src={props.user.img} alt="User Img" />
            </div>
            
            <div className="card-body text-center">
                <h4 className="card-title">{props.user.userName}</h4>
                <h6 className="card-title">{props.user.screenName}</h6>
            </div>
        </div>
    </div>

export default Profile;