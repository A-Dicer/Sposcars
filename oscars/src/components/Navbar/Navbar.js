import React from "react";
import "./Navbar.css";
import API from "../../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faYoutube, faSoundcloud  } from '@fortawesome/free-brands-svg-icons';

const Navbar = () => (
    <nav className="navbar-fluid text-left">
        <div className="row">
            <div className="col-6">
                <img src={require("../../assets/imgs/logo2.png")} alt="SpOSCARS Logo"/>   
            </div>
            <div className="col-6">
                <ul className="nav">
                    <li className="">
                        <a className=""  onClick={function(){API.logout().then(res => window.location = "/").catch(err => console.log(err))}} href="/"> <FontAwesomeIcon icon={faSignOutAlt} /></a>
                    </li>
                    <li className="">
                        <a className=" twit" href="https://twitter.com/siftpop"> <FontAwesomeIcon icon={faTwitter} /></a>
                    </li>
                    <li className="">
                        <a className="face" href="https://www.facebook.com/SiftPop/"> <FontAwesomeIcon icon={faFacebook} /></a>
                    </li>
                    <li className="">
                        <a className="tube" href="https://www.youtube.com/siftpop"> <FontAwesomeIcon icon={faYoutube} /></a>
                    </li>
                    <li className="">
                    <a className="cloud" href="https://soundcloud.com/yourmoviefriend"> <FontAwesomeIcon icon={faSoundcloud} /></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;