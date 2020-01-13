import React from "react";
import "./Navbar.css";

const Navbar = ({info}) => (
    <div id='navbar'className="row justify-content-center">
        <img src={require("../../assets/imgs/logo.png")} alt="SpOSCARS Logo"/> 
    </div>
);

export default Navbar;