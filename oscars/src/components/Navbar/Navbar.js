import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const Navbar = ({info}) => (
    <nav className="navbar-fluid text-left">
        <div className="row">
            <img src={require("../../assets/imgs/logo2.png")} alt="SpOSCARS Logo"/>   
        </div>
    </nav>
);

export default Navbar;