import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import {Leaderboard} from "../../components/Leaderboard/";
// import Category from "../../components/Caetgory";


class Sposcars extends Component {
  state = {
    players: {}
  };

  componentDidMount() { this.loadUsers() }

  loadUsers = () => {
    API.getUsers()
      .then(res => {
        this.setState({players: res.data.results})
        console.log(res.data.results)
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="container-fluid" style={{"opacity": this.state.opacity}}>
        <Navbar info={this.state.user} />
        <div className="row border">
          <div className="col-sm-8 border">
            {/* leaderboard side */}
            <div className="row">
              <div className="col-12">
                <Leaderboard  data={this.state.players}/>
                 {/* <Category  */}
             
              </div>
            </div>
          </div>
          <div className="col-sm-4 border">
            {/* user side */}
            <div className="row">
              <div className="col-12">
                {/* user profile <Profile /> */}
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
