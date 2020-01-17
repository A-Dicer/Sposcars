import React from "react";
import "./Noms.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSave } from '@fortawesome/free-solid-svg-icons'

const Noms = props =>
  <div className="row noms">
    <div className="card">
      <div className="text-center card-header">
        <h5 style={{"opacity": props.opacity}}>{props.oscars.category}</h5>
      </div> 

      { props.oscars.noms.map((movie, a) =>
        <div className="form-check" style={{"opacity": props.opacity}} key={`pick${a}`}>
          {
            props.location > 23
            ? (
              <div className="row time">
                <div className="col-4">
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
                <div className="col-4">
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
                <div className="col-4">
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
              </div>
            )
            :(
              <div>
              <input 
                className="form-check-input" 
                type="radio" 
                name={props.location} 
                value={movie.movie} 
                onChange={props.onChange} 
                checked={props.picks ? props.picks === movie.movie ? true : false : false} 
              />
              <label className="form-check-label" htmlFor={props.location}>
                {movie.movie}
              </label>
              </div>
            )
          }
        </div>
      )}
      <div className="row">
        <div className="col-6">
          { 
            props.location < 1 || props.edit
            ? null
            : <button 
                className="btn-sm btn-primary" 
                id="prev"
                value={props.location-1} 
                onClick={props.onBtnChange}
              > <FontAwesomeIcon icon={faArrowLeft} /> Previous</button> 
          }  
        </div> 
        <div className="col-6 text-right">
          {
            props.location > 23 || props.edit
            ? <button 
                className="btn-sm btn-primary" 
                id="done" 
                value={25}
                onClick={props.onBtnChange}
                disabled={props.picks ?false :true}
              >  Finish <FontAwesomeIcon icon={faSave} /></button>
            : <button 
                className="btn-sm btn-primary" 
                id="next" 
                value={props.location+1}
                onClick={props.onBtnChange}
                disabled={props.picks ?false :true}
              >  Next <FontAwesomeIcon icon={faArrowRight} /></button>
          } 
        </div> 
      </div>
    </div>
  </div>
 
export default Noms;