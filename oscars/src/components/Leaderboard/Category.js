import React from "react";
import "./Sposcars.css";
let fakeWidth = '0%';
export const Category = props => 
    <div className="row spoNoms">
        <div className="text-center card-header col-12">
            <h5 >{props.oscars.category}</h5>
        </div> 
        <div className='col-12'>
            {
            props.oscars.noms.map((nom, i) =>
                <div className='row'> 
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
