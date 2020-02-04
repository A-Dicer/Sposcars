import React from "react";
import "./Sposcars.css";

export const Category = props => 
    <div className="row spoNoms">
        <div className="screen row align-items-center" style={{'opacity': props.opacity}}>
            <h5 className="text-center col-12"> 
                <img src={require("../../assets/imgs/logo2.png")} alt="SiftPop Icon"/> 
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
