import React from "react";
import "./Sposcars.css";

export const Category = props => 
    <div className="row noms">
        {console.log(props)}
        <div className="card">
            <div className="text-center card-header">
                <h5 >{props.oscars.category}</h5>
            </div> 
            {
                props.oscars.noms.map((nom, i) =>
                   <div key={nom+i}> {nom.movie} (53%)</div>
                )
            }
        </div>
  </div>;
