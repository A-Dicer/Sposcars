import React, { Component } from "react";
// import API from "../../utils/API";
import "./Picks.css";
// import Icon from "../../components/Icon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal } from '@fortawesome/free-solid-svg-icons'
import logo from "../../assets/imgs/logo.png";
//this is the picks page.  we will be creating a form
//for placing picks for the oscars.  Will basically go through
//each pick with each option one by one.  Make a pick and click 
//next kind of thing. Should have a progress bar so people know 
//long it takes.  once they are done should display all picks
//with an option to edit it... (for each component etc).
//will start with them signing up with twitter or just putting a name

//the question is should the users be passworded etc?  so that during 
//the oscars they can sign in and see what place they are in etc. 
// also would allow them to chat during the event?  Chat could be 
//none user required. something to think about for down the road.
//that has nothing to do with what we are doing here. The reason
//for password signing in etc is so they can change their picks up 
//until the point of the cut off.  So if they change their minds they
//can come back to the site and change their pick.  

//1: create sign up/log in 
//2: create form
//3: relax


//check to see if signed in? 
//if not show a must be signed in to make picks
//with a picks option


// 2 components maybe? 
// one that holds the picks form 
// one that holds the completed picks form

//would need to know where the user is at in the form process.
//if finished show the finished component.


class Picks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oscars: [{category: "Best Picture", options: [1,2,3,4]}],
      user: {},
      picks:{},
    }
}

  componentWillMount() { 
    
    const test = {Cars: 10, Boats: 2}
    // window.history.pushState(test, "page 2")
    console.log(window.history)
    // API.logout().catch(err => console.log(err))
  }

// ---------------------------------------- handleFormSubmit -----------------------------------------------
//Action for signing people in when button is pressed.

  handleFormSubmit = event => {
    event.preventDefault();
    // window.location = "http://localhost:3001/api/auth/twitch/callback";
  };

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container">
        <div className="row" id="outer">
          <div className="col-sm-12 align-self-center">
          
            <div className="row justify-content-center rounded" id="inner">         
              <img src={logo} className="" alt="SPOSCARS Logo"/>
              <div className="col-12 text-center">
                <h3>{this.state.oscars[0].category}</h3>
                <FontAwesomeIcon icon={faMedal} />
                <div className="text-left " style={{'width': 'max-content', 'margin': '0 auto'}}>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                  <label className="form-check-label" for="exampleRadios1">
                    Default radio
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                  <label className="form-check-label" for="exampleRadios2">
                    Second default radio
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" disabled />
                  <label className="form-check-label" for="exampleRadios3">
                    Disabled radio
                  </label>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>     
      </div>
    );
  }
}

export default Picks;
