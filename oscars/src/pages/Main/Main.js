import React, { Component } from "react";
import API from "../../utils/API";
import "./Main.css";
import Navbar from "../../components/Navbar";
import Noms from "../../components/Noms";
import Picks from "../../components/Picks";
import Profile from "../../components/Profile";
import noms from "../../assets/js/noms.js"

const io = require('socket.io-client')  
const socket = io() 

socket.emit('updateInspector')

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oscars: noms,
      user: {},
      picks:[],
      opacity: 0,
      formOpacity: 1,
      sideOpacity: 1,
      pos: 25,
      time: {hour: "", min: "", sec: ""},
      form: false,
      edit: false
    }
}

componentDidMount() {
  //check for back button 
  performance.navigation.type === 2
   ? window.location.reload(true) //reload page
   : this.getPicks(this.props.match.params.id) //get user picks
}

timeConvert = (time) =>{
  
  let data =  Object.assign({}, this.state.time)

  data.hour = Math.floor(time/3600);
  data.min = Math.floor((time/60-(data.hour*60)));
  data.sec = (time%60);

  this.setState({time: data})
}


// ------------------------------------------- getPicks ---------------------------------------------------
//Get the users picks
getPicks = (id) => {
  API.getPicks(id)
      .then(res => {
        this.picksLocation(res.data.results.picks)
        if(res.data.results.picks[24])this.timeConvert(res.data.results.picks[24])
        
        //check to make sure user is signed in
        if(res.data.pass && Object.entries(res.data.pass).length !== 0){
            
            //place info into state object
            let data =  Object.assign({}, this.state)
            data.user = res.data.pass.user
            data.picks = res.data.results.picks
            data.opacity = 1
            data.form = this.state.pos > 24 ? false : true
             
            this.setState(data) // set the state data  
        } 
        else window.location = "/"; // redirect to login page
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

    if(isNaN(pos))this.picksLocation(this.state.picks)
    else {
      if(pos < 25){
        this.setState({formOpacity: 0});
        
        setTimeout(function(){
          if(id === `next`){  
            this.setState({pos: pos}) 
            API.updatePicks(this.state.user._id, this.state.picks)
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
          API.updatePicks(this.state.user._id, data)
        }.bind(this), 500) 

        setTimeout(()=>{this.setState({sideOpacity: 1})}, 510)
      }
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
