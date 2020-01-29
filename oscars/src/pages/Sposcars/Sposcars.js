import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import Profile from "../../components/ProfileSpo";
// import noms from "../../assets/js/noms.js";
import {Leaderboard, Category} from "../../components/Leaderboard/";

console.log(window.innerHeight)
class Sposcars extends Component {
  state = {
    noms: {
      category: "ACTOR IN A LEADING ROLE",
      noms: [
        {movie: "Antonio Banderas, Pain and Glory"},
        {movie: "Leonardo DiCaprio, Once upon a Time...in Hollywood"},
        {movie: "Adam Driver, Marriage Story"},
        {movie: "Joaquin Phoenix, Joker"},
        {movie: "Jonathan Pryce, The Two Popes"}
      ]
    },
    guru: false,
    livePicks: [
      'Adam Driver, Marriage Story',
      'Brad Pitt, Once upon a Time...in Hollywood',,
      false,
      false,
      false,
      false,
      '1917',
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      'Little Women',
      false,
      false
      ],
    players: {},
    user:  {
      "guru": true,
      "_id": "5e2847fd92e881001716cc8e",
      "twitterId": "885224216005685251",
      "username": "Andrew Dicer",
      "__v": 0,
      "oscar": "5e2847fd92e881001716cc8f",
      "screenName": "@AndrewDicer",
      "img": "https://pbs.twimg.com/profile_images/1216164245185814528/nXx3fP4B.jpg",
      "points": 34,
      "place": 23,
      "movement": 2,
      "direction": "Up",  
    },
    picks: [
      "Adam Driver, Marriage Story",
      "Tom Hanks, A Beautiful Day in the Neighborhood",
      "Scarlett Johansson, Marriage Story",
      "Margot Robbie, Bombshell",
      "Klaus",
      "The Lighthouse",
      "Little Women",
      "Once upon a Time...in Hollywood",
      "The Edge of Democracy",
      "St. Louis Superman",
      "Jojo Rabbit",
      "Parasite",
      "Joker",
      "Star Wars: The Rise of Skywalker",
      "(I'm Gonna) Love Me Again, Rocketman",
      "Once upon a Time...in Hollywood",
      "The Irishman",
      "Kitbull",
      "Brotherhood",
      "Ford v Ferrari",
      "Ad Astra",
      "The Lion King",
      "Jojo Rabbit",
      "Knives Out",
      12212
      ],
    picksHeight: '2px',
  };

  componentDidMount() { 
    this.loadUsers(); 
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', this.updateDimensions); 
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  onClick = event => {
    event.preventDefault()
    let {value, name} = event.target;

    let data =  Object.assign({}, this.state.players[value])
    if(data.twitterId){
      API.getTwitter(this.state.players[value].twitterId)
        .then(res => {
          data.screenName = `@${res.data.results.screenName}`;
          data.img = res.data.results.img
          this.setState({user: data})
        })
        .catch(err => console.log(err))
    } else {
      data.img = "https://abs.twimg.com/sticky/default_profile_images/default_profile.png"
      this.setState({user: data})
    }

    API.getPicks(this.state.players[value]._id)
      .then(res => {this.setState({picks: res.data.results.picks})})
      .catch(err => console.log(err))
    
  }

  loadUsers = () => {
    API.getUsers()
      .then(res => {
        this.setState({players: res.data.results})
        console.log(res.data.results)
      })
      .catch(err => console.log(err));
  };

  picksBtn = () => {
    console.log('click')
    let height;
    this.state.picksHeight === '2px' ? height = '1030px' : height = '2px'
    this.setState({picksHeight: height})
  }

  render() {
    return (
      <div className="container-fluid" style={{"opacity": this.state.opacity}}>
        <Navbar info={this.state.user} />
        <div className="row">
          
          <div className="col-sm-8 left">
            <div className="row leaderboard">
              <div className="col-12" style={{'height': this.state.height-50}}>
                <Leaderboard guru={this.state.guru} data={this.state.players} user={this.state.user} onClick={this.onClick}/>              
              </div>
            </div>
          </div>

          <div className="col-sm-4 right">
            <div className="row">
              <div className="col-12 border" style={{'height': '200px'}}>
                <Category oscars={this.state.noms}/>
              </div>
              <div className="col-12">
                <Profile 
                  user={this.state.user} 
                  picks={this.state.picks}
                  livePicks={this.state.livePicks} 
                  picksBtn={this.picksBtn}
                  picksHeight={this.state.picksHeight}
                />
                {/* clicked user profile <Profile /> */}
                {/* polls?*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sposcars;
