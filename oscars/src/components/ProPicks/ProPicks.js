import React from "react";
import "./ProPicks.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCube, faTimesCircle, faSave } from '@fortawesome/free-solid-svg-icons'

const ProPicks = props =>
    <div className="row proPicks">
        <div className="col-12">
            <div className="card-body">
            <h4> Oscar Category Select</h4>
            <hr />
                {
                    props.picks.map((pick, i) =>
                        <div className="card-text text-truncate" key={`pick${i}`} > 
                           <div className={`${i===props.location ? "catSelected" : ""} testDiv`} onClick={function(){if(i!==props.location) props.edit(i)}}> 
                                <FontAwesomeIcon 
                                    icon={ i===props.location ?faTimesCircle:faCube}  
                                    style={{'color': pick ?"green" :null, 'fontSize': '13px'}} 
                                    onClick={i===props.location ? function(){props.onBtnChange(0)}:null}
                                    
                                /> {props.oscars[i].category}
                            </div>
                            {
                                i < 24 
                                ?
                                <div className="formSelections" style={{'height': i===props.location ? props.oscars[i].noms.length*17.5 :null}}>
                                { 
                                    props.oscars[i].noms.map((selections, a)=>
                                        <div className="form-check" style={{"opacity": props.opacity}} key={`pick${a}`}>
                                            <input 
                                            className="form-check-input" 
                                            type="radio" 
                                            name={props.location} 
                                            value={selections.movie} 
                                            onChange={props.onChange} 
                                            checked={ pick ? pick === selections.movie ? true : false : false} 
                                            />
                                            <label className="form-check-label text-truncate" htmlFor={props.location}>
                                            {selections.movie}
                                            </label>
                                        </div>  
                                    )
                                }
                                </div>
                                :
                                <div className="formSelections" style={{'height': i===props.location ? '50px' :null}}>
                                <div className="row time">
                                <div className="col-3">
                                <input 
                                    className="form-control form-control-sm" 
                                    type="text" 
                                    placeholder="Hours"
                                    name="hour"
                                    onChange={props.onInputChange} 
                                    value={props.time.hour}
                                    maxLength="2"
                                ></input>
                                </div>
                                <div className="col-3">
                                <input 
                                    className="form-control form-control-sm" 
                                    type="text" 
                                    placeholder="Minutes"
                                    name="min"
                                    onChange={props.onInputChange} 
                                    value={props.time.min}
                                    maxLength="2"
                                ></input>
                                </div>
                                <div className="col-3">
                                <input 
                                    className="form-control form-control-sm" 
                                    type="text" 
                                    placeholder="Seconds"
                                    name="sec"
                                    onChange={props.onInputChange}
                                    value={props.time.sec} 
                                    maxLength="2"
                                ></input>
                                </div>
                                <div className="col-3">
                                <button 
                                    className="btn-sm btn-secondary" 
                                    id="done" 
                                    value={25}
                                    onClick={props.onBtnChange}
                                    disabled={props.picks ?false :true}
                                >  Finish <FontAwesomeIcon icon={faSave} /></button>
                                </div>
                            </div>
                            </div>
                            }
                         
                        </div>      
                    )
                }
            </div>
        </div>
    </div>
 
export default ProPicks;