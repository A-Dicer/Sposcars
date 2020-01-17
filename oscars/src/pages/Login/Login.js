import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import "./Login.css";

class Login extends Component {

// -------------------------------------------- Signin -----------------------------------------------------
//Action for signing people in when button is pressed.
signInTwit = event => {
  event.preventDefault();
  window.location = "/api/auth/twitter/";
};

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container-fluid logIn">
        <div className="row" id="outer">
          <div className="col-sm-12 align-self-center">
            <div className="row justify-content-center rounded" id="inner">         
              <div className="col-12 text-center">
                <img src={require("../../assets/imgs/icon.png")} alt="SiftPop Icon"/> 
                <br />
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm twit" 
                  onClick={this.signInTwit}
                >    
                   <FontAwesomeIcon icon={faTwitter} /> Login with Twitter    
                </button> 
              </div>
            </div>
          </div>
        </div>     
      </div>
    );
  }
}

export default Login;
