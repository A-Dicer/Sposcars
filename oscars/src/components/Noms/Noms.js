import React from "react";
import "./Noms.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Noms = props =>
  <div className="row">
    <div className="card">
      <div className="text-center card-header">
        <h5 style={{"opacity": props.opacity}}>{props.oscars.category}</h5>
      </div> 

      {props.oscars.noms.map((movie, a) =>
        <div className="form-check" style={{"opacity": props.opacity}} key={`pick${a}`}>
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
      )}

      <div className="row">
        <div className="col-6">
          {
            props.location < 1
            ? null
            :<button 
              className="btn-sm btn-primary" 
              id="prev" 
              onClick={props.onBtnChange}
            > <FontAwesomeIcon icon={faArrowLeft} /> Previous</button> 
          }  
        </div> 
        <div className="col-6 text-right">
          {
            props.location > 23
            ? null
            :<button 
              className="btn-sm btn-primary" 
              id="next" 
              onClick={props.onBtnChange}
              disabled={props.picks ?false :true}
            > Next <FontAwesomeIcon icon={faArrowRight} />  </button>
          } 
        </div> 
      </div>
    </div>
  </div>
 
export default Noms;