import React, { Component } from "react";
import API from "../../utils/API";
import "./Main.css";
import Navbar from "../../components/Navbar";
import Noms from "../../components/Noms";
// import Noms from "../../components/Noms";
import noms from "../../assets/js/noms.js"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMedal, faThList } from '@fortawesome/free-solid-svg-icons'


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


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oscars: noms,
      user: {},
      picks:[],
      opacity: 0,
      pos: 0,
      formOpacity: 1
    }
}

componentDidMount() {
  //check for backbutton use 
  performance.navigation.type == 2
   ? window.location.reload(true) //reload page
   : this.getPicks(this.props.match.params.id) //get user picks
}

// ------------------------------------------- getPicks ---------------------------------------------------
//Get the users picks
getPicks = (id) => {
  API.getPicks(id)
      .then(res => {
        this.picksLocation(res.data.results.picks)
        
        //check to make sure user is signed in
        // if(res.data.pass && Object.entries(res.data.pass).length != 0){
            
            //place info into state object
            let data =  Object.assign({}, this.state)
            // data.user = res.data.pass.user
            data.picks = res.data.results.picks
            data.opacity = 1
              
            this.setState(data) // set the state data  
        // } 
        // else window.location = "/"; // redirect to login page
      }
  ).catch(err => console.log(err));
};

// ------------------------------------------- onChange ----------------------------------------------------
  onChange = event => {
    const {name, value} = event.target;

    let data =  Object.assign([], this.state.picks);
    data[name] = value;
    this.setState({picks: data});
  }

// ------------------------------------------ onBtnChange --------------------------------------------------
  onBtnChange = event => {
    event.preventDefault();
    const pos = this.state.pos;
    const {id} = event.target;
    this.setState({formOpacity: 0})
    setTimeout(function(){
      if(id === `next`){  
        this.setState({pos: pos+1}) 
        API.updatePicks(this.state.user._id, this.state.picks)
          .then(res =>{console.log(res.data.results)})
      }
        else this.setState({pos: pos-1})
    }.bind(this), 500)

    setTimeout(()=>{this.setState({formOpacity: 1})}, 500)
  }
    
// ---------------------------------------- picksLocation --------------------------------------------------
  picksLocation = (data) => {
   const pos = (25 - data.filter(pick => !pick).length)
   this.setState({pos: pos})
  }

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container-fluid" style={{"opacity": this.state.opacity}}>
        <Navbar info={this.state.user} />
        <div className="row " id="main">
          <div className="col-md-4">
             
          </div>
          <div className="col-md-8">
           <Noms 
            oscars={this.state.oscars[this.state.pos]} 
            location={this.state.pos}
            picks={this.state.picks[this.state.pos]}
            onChange={this.onChange}
            onBtnChange={this.onBtnChange} 
            opacity={this.state.formOpacity}
          />
          </div>    
        </div>     
      </div>
    );
  }
}

export default Main;
