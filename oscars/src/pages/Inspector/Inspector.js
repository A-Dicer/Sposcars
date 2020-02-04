import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import "./Inspector.css";

let socket; 

class Inspector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

updateCodeFromSockets(payload) {this.setState({users: payload})}

    
componentDidMount() {
    const io = require('socket.io-client')  
    socket = io() 
    socket.on("inspector", (payload) => {this.updateCodeFromSockets(payload)})
    this.getUsers()
}

// ------------------------------------------- getUsers -----------------------------------------------------
//Get the users 
getUsers = () => {
    
    API.getUsers()
        .then(res => {this.setState({users: res.data.results})}
    ).catch(err => console.log(err));
  };
    
// ------------------------------------------- onClick ------------------------------------------------------
// 
onClick = (id, pos) => {
   console.log()
    console.log(id)
  };
    
// ------------------------------------------ Frontend Code ------------------------------------------------

    render() {
        return (
            <div className="container-fluid">
                <Navbar />
                <div className="row">
                    <div className="col-6">
                        <div className="row profile">
                            <div className="card">
                                <div className="card-header inspect-head text-center"> 
                                    <h5>
                                      Players: <FontAwesomeIcon icon={faUsers} /> {this.state.users.filter(user => !user.guru).length} / <FontAwesomeIcon icon={faTwitter} className='twitSpec'/> {this.state.users.filter(user => !user.guru && user.twitterId).length} 
                                    </h5>
                                </div>
                                <div className="card-body">
                                    { 
                                        this.state.users.map((user, i) => 
                                            !user.guru
                                            ?
                                            <div className="inspect" key={`row${i}`} >
                                                <div className=" "> {`${user.username}   `} 
                                                <FontAwesomeIcon 
                                                    className={`guru`}
                                                    icon={faUserAstronaut} 
                                                    style={{ color: this.state.users[i].guru ? '#98c98c': '#c98c8c'}} 
                                                    onClick={function(){
                                                        API.updateUser(user._id, {guru: !user.guru})
                                                        console.log(!user.guru)
                                                        let data = Object.assign([], this.state.users);
                                                        data[i].guru = !user.guru;
                                                        this.setState({users: data})
                                                        
                                                    }.bind(this)}
                                                />   { user.twitterId ? <FontAwesomeIcon className={`twitSpec`} icon={faTwitter} /> : null }
                                                </div>
                                                
                                                <hr/>
                                            </div>
                                            :null
                                        )           
                                    } 
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div className="col-6">
                        <div className="row profile">
                            <div className="card">
                                <div className="card-header inspect-head text-center"> 
                                    <h5>
                                      Gurus: <FontAwesomeIcon icon={faUserAstronaut} /> {this.state.users.filter(user => user.guru).length} / <FontAwesomeIcon icon={faTwitter} className='twitSpec'/> {this.state.users.filter(user => user.guru && user.twitterId).length} 
                                    </h5>
                                </div>
                                <div className="card-body">
                                    { 
                                        this.state.users.map((user, i) => 
                                            user.guru
                                            ?
                                            <div className="inspect" key={`row${i}`} >
                                                <div className=" "> {`${user.username}   `} 
                                                <FontAwesomeIcon 
                                                    className={`guru`}
                                                    icon={faUserAstronaut} 
                                                    style={{ color: this.state.users[i].guru ? '#98c98c': '#c98c8c'}} 
                                                    onClick={function(){
                                                        API.updateUser(user._id, {guru: !user.guru})
                                                        console.log(!user.guru)
                                                        let data = Object.assign([], this.state.users);
                                                        data[i].guru = !user.guru;
                                                        this.setState({users: data})
                                                        
                                                    }.bind(this)}
                                                /> { user.twitterId ? <FontAwesomeIcon className={`twitSpec`} icon={faTwitter} /> : null }
                                                </div>
                                                
                                                <hr/>
                                            </div>
                                            :null
                                        )           
                                    } 
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>     
            </div>
        )
    }
}

export default Inspector;
 
 
 
 

