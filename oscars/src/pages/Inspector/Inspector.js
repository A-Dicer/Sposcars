import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAstronaut, faList, faUsers } from '@fortawesome/free-solid-svg-icons'
import "./Inspector.css";

const io = require('socket.io-client')  
const socket = io() 

class Inspector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }

        socket.on("inspector", (payload) => {this.updateCodeFromSockets(payload)})
    }

updateCodeFromSockets(payload) {this.setState({users: payload})}

    
componentDidMount() {this.getUsers()}

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
                    <div className="col-12 insUser">
                        <h4>
                            <FontAwesomeIcon icon={faUsers} /> {this.state.users.filter(user => !user.guru).length} / <FontAwesomeIcon icon={faUserAstronaut} /> {this.state.users.filter(user => user.guru).length}
                        </h4>
                    </div>
                </div>
                { 
                    this.state.users.map((user, i) => 
                        <div className="row justify-content-md-center inspect" key={`row${i}`}>
                            <div className=" "> {`${i+1}: ${moment(user.oscar.date).format('M/D/YY')}`} - </div>
                            <div className=" ">{user.userName} - </div>
                            <div className=" " > 
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
                                />
                            </div>
                            
                            <hr/>
                        </div>
                    )
                }      
            </div>
        )
    }
}

export default Inspector;
 
 
 
 

