import React from "react";
import "./Signin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

const Signin = (props) => (
    <div id='signIn' className="row">
        
        <div className="col-12"> 
            {/* <img src={require("../../assets/imgs/icon.png")} alt="SiftPop Icon"/>  */}
            <button type="button" 
                className="btn btn-secondary btn-sm twit" 
                onClick={props.twit}
            >
            <FontAwesomeIcon icon={faTwitter} /> Sign In With Twitter
            </button>
        </div>
        {console.log(props)}
    </div>
);

export default Signin;