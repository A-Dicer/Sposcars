import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import Profile from "../../components/Profile";
import Leaderboard from "../../components/Leaderboard";
// import Category from "../../components/Caetgory";


class Sposcars extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    synopsis: "",
    currentUser: ""
  };

  componentDidMount() {
    // this.loadBooks();
  }

  loadBooks = () => {
    console.log("books")
    API.getBooks()
      .then(res => {
        console.log("then go")
        if(res.data.statusCode == 401){
          console.log("401")
          this.props.history.push("/login");
        }
        else {
          console.log("user stuff:", res.data.session.passport.user);
          this.setState({currentUser: res.data.session.passport.user, books: res.data.results, title: "", author: "", synopsis: "" })
        }
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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
                <Leaderboard />
                 {/* <Category  */}
                darkness
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
