import React, { Component } from "react";
import API from "../../utils/API";
import "./Main.css";
import Navbar from "../../components/Navbar";
import Noms from "../../components/Noms";
import Picks from "../../components/Picks";
import Profile from "../../components/Profile";
import noms from "../../assets/js/noms.js"

// 1/15/20 -------------------------------------------------------------------------------

//I have a lot left to do. 
//There is a weird issue where it looses track of what number it is 
//on for some reason.  Not sure what is causing this yet. I will have
//to continue to look into it. 

//Next thing is to finish the last question for the game. The how long
//will the oscars last question. it is a different type of question.
//i will have to just make something for it. √

//secondly i will do the profile section.  It is just an image with the name 
//under it.  Shouldn't really take that long.  It will be in a seperate 
//component.  √

//then I have decided that when you come in you will see your profile on the
//left and your 'picks sheet' on your right.  if you haven't finished your picks
//it will tell you that and prompt you to do so taking you to the one by one
//picking (noms component)section.  Once you have completed it it will change from
//complete your oscar picks to "your oscar picks".  next to each pick will be an 
//edit button allowing you to edit that specific pick if you change your mind.  
//this option remains until the day of the oscars.  √

//last I need to make up a page for tracking people who have signed up for aaron.
//it will show there name. if they have completed their picks and if they are a 
//guru.  there will be an option for him to make someone a guru or take a guru away.

//for now I think that is it.  If I think of anything different I will add it.

//oh yeah. navbar links and signout √

//1/12/20 --------------------------------------------------------------------------------

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

//1: create sign up/login √
//2: create form √
//3: relax x


//check to see if signed in? √
//if not show a must be signed in to make picks √
//with a picks option


// 2 components maybe?  √
// one that holds the picks form √
// one that holds the completed picks form √

//would need to know where the user is at in the form process.
//if finished show the finished component.


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oscars: noms,
      user: {
        "_id": "5e2114af9f001673dc2f7794",
        "twitterId": "885224216005685251",
        "userName": "Andrew Dicer",
        "__v": 0,
        "oscar": [
        "Adam Driver, Marriage Story",
        "Tom Hanks, A Beautiful Day in the Neighborhood",
        "Scarlett Johansson, Marriage Story",
        "Laura Dern, Marriage Story",
        "Klaus",
        "The Lighthouse",
        "Little Women",
        "Once upon a Time...in Hollywood",
        "For Sama",
        "St. Louis Superman",
        "The Irishman",
        "Corpus Christi",
        "Joker",
        "Star Wars: The Rise of Skywalker",
        "(I'm Gonna) Love Me Again, Rocketman",
        "Once upon a Time...in Hollywood",
        "1917",
        "Kitbull",
        "Brotherhood",
        "Star Wars: The Rise of Skywalker",
        "Ad Astra",
        "Avengers: Endgame",
        "The Irishman",
        "Knives Out",
        11445
        ],
        "screenName": "@AndrewDicer",
        "img": "https://pbs.twimg.com/profile_images/1216164245185814528/nXx3fP4B.jpg",
        "background": "https://pbs.twimg.com/profile_banners/885224216005685251/1529645861"
        },
      picks:[
        "Adam Driver, Marriage Story",
        "Tom Hanks, A Beautiful Day in the Neighborhood",
        "Scarlett Johansson, Marriage Story",
        "Laura Dern, Marriage Story",
        "Klaus",
        "The Lighthouse",
        "Little Women",
        "Once upon a Time...in Hollywood",
        "For Sama",
        "St. Louis Superman",
        "The Irishman",
        "Corpus Christi",
        "Joker",
        "Star Wars: The Rise of Skywalker",
        "(I'm Gonna) Love Me Again, Rocketman",
        "Once upon a Time...in Hollywood",
        "1917",
        "Kitbull",
        "Brotherhood",
        "Star Wars: The Rise of Skywalker",
        "Ad Astra",
        "Avengers: Endgame",
        "The Irishman",
        "Knives Out",
        11445
        ],
      opacity: 0,
      formOpacity: 1,
      sideOpacity: 1,
      pos: 24,
      time: {hour: "", min: "", sec: ""},
      form: false,
      edit: false
    }
}

componentDidMount() {
  //check for backbutton use 
  performance.navigation.type === 2
   ? window.location.reload(true) //reload page
   : this.getPicks(this.props.match.params.id) //get user picks
}

// ------------------------------------------- getPicks ---------------------------------------------------
//Get the users picks
getPicks = (id) => {
  API.getPicks(id)
      .then(res => {
        // this.picksLocation(res.data.results.picks)
        
        //check to make sure user is signed in
        // if(res.data.pass && Object.entries(res.data.pass).length != 0){
            
            //place info into state object
            let data =  Object.assign({}, this.state)
            // data.user = res.data.pass.user
            // data.picks = res.data.results.picks
            data.opacity = 1
            // data.form = this.state.pos > 24 ? false : true
              
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
// ----------------------------------------- onInputChange -------------------------------------------------
  onInputChange = event =>{
    event.preventDefault()
  
    let {name, value} = event.target;
    value = value.replace(/[^0-9, :, .]/g, '');
    
    if(name === "hour" && parseInt(value) > 23) value = 23;
    else if(parseInt(value) > 59) value = 59

    let data  =  Object.assign({}, this.state.time);
    let data2 =  Object.assign([], this.state.picks);
    
    data[name] = value
    this.setState({time: data})
    console.log(data)
    if(data.hour && data.min && data.sec){
      data2[24] = parseInt(data.hour) + parseInt(data.min) + parseInt(data.sec);
      this.setState({picks: data2});
    } else { 
      data2[24] = false
      this.setState({picks: data2})
    }
  }

// ------------------------------------------ onBtnChange --------------------------------------------------
  onBtnChange = event => {
    event.preventDefault();
    const {id, value} = event.target;
    const pos = parseInt(value);

    if(pos < 25){
      this.setState({formOpacity: 0});
    
      setTimeout(function(){
        if(id === `next`){  
          this.setState({pos: pos}) 
          // API.updatePicks(this.state.user._id, this.state.picks)
        }
        else this.setState({pos: pos})
      }.bind(this), 500)

      setTimeout(()=>{this.setState({formOpacity: 1})}, 500)
    } else {
      this.setState({sideOpacity: 0});
      let data = Object.assign([], this.state.picks);
      let time = Object.assign({}, this.state.time)

      data[24] = (parseInt(time.hour)*3600) + (parseInt(time.min)*60) + parseInt(time.sec)
   
      setTimeout(function(){
        this.setState({picks: data})
        this.setState({form: false})
        // API.updatePicks(this.state.user._id, data)
      }.bind(this), 500) 

      setTimeout(()=>{this.setState({sideOpacity: 1})}, 510)
    }
  }
    
// ---------------------------------------- picksLocation --------------------------------------------------
  picksLocation = (data) => {
   const pos = (25 - data.filter(pick => !pick).length)
   this.setState({pos: pos})
  }

// ------------------------------------------- editPick ----------------------------------------------------
  editPick = (pos) => {
    this.setState({sideOpacity: 0});
    setTimeout(()=>{this.setState({pos: pos})}, 500)
    setTimeout(()=>{this.setState({form: true})}, 520)
    setTimeout(()=>{this.setState({edit: true})}, 500)
    setTimeout(()=>{this.setState({sideOpacity: 1})}, 550)
   }

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container-fluid" style={{"opacity": this.state.opacity}}>
        <Navbar info={this.state.user} />
        <div className="row justify-content-center" id="main">
          <div className="col-md-4">          
            <Profile user={this.state.user}/>          
          </div>
          <div className="col-md-8 rightSide" style={{"opacity": this.state.sideOpacity}}>
            {
              this.state.form 
              ? 
                <Noms 
                  oscars={this.state.oscars[this.state.pos]} 
                  location={this.state.pos}
                  picks={this.state.picks[this.state.pos]}
                  onChange={this.onChange}
                  onBtnChange={this.onBtnChange} 
                  onInputChange={this.onInputChange}
                  opacity={this.state.formOpacity}
                  time={this.state.time}
                  edit={this.state.edit}
                />
              : <Picks 
                  user={this.state.user} 
                  picks={this.state.picks}
                  oscars={this.state.oscars}
                  edit={this.editPick}
                />
            }
          </div>    
        </div>     
      </div>
    );
  }
}

export default Main;
