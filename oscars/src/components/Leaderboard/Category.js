import React from "react";
import "./Sposcars.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebook, faYoutube, faSoundcloud  } from '@fortawesome/free-brands-svg-icons';


export const Category = props => 
    <div className="row spoNoms">
        <div className="screen row align-items-center" style={{'opacity': props.opacity}}>
            <h5 className="text-center col-12"> 
                <img src={require("../../assets/imgs/logo2.png")} alt="SiftPop Icon"/> 
                <div className="col-12 text-center">
                    <ul className="nav ">
                        <li className="">
                            <a className=" twit" href="https://twitter.com/siftpop" target="new"> <FontAwesomeIcon icon={faTwitter} /></a>
                        </li>
                        <li className="">
                            <a className="face" href="https://www.facebook.com/SiftPop/" target="new"> <FontAwesomeIcon icon={faFacebook} /></a>
                        </li>
                        <li className="">
                            <a className="tube" href="https://www.youtube.com/siftpop" target="new"> <FontAwesomeIcon icon={faYoutube} /></a>
                        </li>
                        <li className="">
                        <a className="cloud" href="https://soundcloud.com/yourmoviefriend" target="new"> <FontAwesomeIcon icon={faSoundcloud} /></a>
                        </li>
                    </ul>
                </div>
            </h5>
            
        </div>
        <div className="text-center card-header col-12">
            <h5 > <img src={require("../../assets/imgs/oscar.png")} alt="SiftPop Icon"/>{props.oscars.category}</h5>
        </div> 
        <div className='col-12'>
            {
            props.oscars.noms.map((nom, i) =>
                <div className='row' key={`nom${i}`}> 
                    <div className='col-6 text-truncate text-center'>
                     {nom.movie}
                    </div>
                    <div className='col-6 percContainer'>
                        <div className="percColor text-left" style={{'width': nom.perc}}>
                            <p>{nom.perc}</p>
                        </div>
                    </div>
                </div>
            )
            }
        </div>

    </div>;
