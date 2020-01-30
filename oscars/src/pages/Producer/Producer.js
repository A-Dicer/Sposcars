import React, { Component } from "react";
import API from "../../utils/API";
import Navbar from "../../components/Navbar";
import Noms from "../../components/Noms";
import Picks from "../../components/Picks";
import Profile from "../../components/Profile";
import noms from "../../assets/js/noms.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import "./Producer.css";

const io = require('socket.io-client')  
const socket = io() 

class Producer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oscars: noms,
            users: [],
            picks:[],
            opacity: 0,
            formOpacity: 1,
            sideOpacity: 1,
            pos: 25,
            time: {hour: "", min: "", sec: ""},
            form: false,
            edit: false
        }

        socket.on("inspector", (payload) => {this.updateCodeFromSockets(payload)})
    }

updateCodeFromSockets(payload) {this.setState({users: payload})}

componentDidMount() {this.getUsers()}

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
        let data = Object.assign([], this.state.picks);

        if(pos < 25){
            this.setState({sideOpacity: 0});
            setTimeout(()=>{this.setState({picks: data, form: false})}, 500)
            setTimeout(()=>{
                this.setState({sideOpacity: 1})
                socket.emit('updateLeaderboard', this.state.picks)   
            }, 510)
            
        } else {
            this.setState({sideOpacity: 0});
            let time = Object.assign({}, this.state.time)

            data[24] = (parseInt(time.hour)*3600) + (parseInt(time.min)*60) + parseInt(time.sec)
        
            setTimeout(function(){
            this.setState({picks: data})
            this.setState({form: false})
            API.updatePicks(this.state.user._id, data)
            }.bind(this), 500) 

            setTimeout(()=>{
                this.setState({sideOpacity: 1})
                socket.emit('updateLeaderboard', this.state.picks)
            }, 510)
        }
        socket.emit('updateOscarNom', false)
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
        socket.emit('updateOscarNom', {info: this.state.oscars[pos], pos: pos} )
    }

// ------------------------------------------- getUsers -----------------------------------------------------
//Get the users 
    getUsers = () => {
        
        API.getUsers()
            .then(res => {
                let siftPop = res.data.results.filter(user => user.username === "SiftPop")
                this.setState({users: res.data.results, picks: siftPop[0].oscar.picks, user: siftPop})
            }
        ).catch(err => console.log(err));
    };
    
// ------------------------------------------- onClick ------------------------------------------------------
// 
    // onClick = (id, pos) => {
    // console.log()
    //     console.log(id)
    // };
    
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
                                            <div className="inspect" key={`row${i}`} >
                                                <div className=" "> 
                                                    <FontAwesomeIcon icon={faEye} /> {`${user.username}   `} 
                                                   {user.guru ? <FontAwesomeIcon  className={`guru`}  icon={faUserAstronaut}/> : null}  {user.twitterId ? <FontAwesomeIcon className={`twitSpec`} icon={faTwitter}/> : null }
                                                </div>
                                                
                                                <hr/>
                                            </div>        
                                        )           
                                    } 
                                </div>
                            </div>
                        </div>  
                    </div>
                    
                            <div className="col-md-6 rightSide" style={{"opacity": this.state.sideOpacity}}>
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
                                cancle={true}
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
        )
    }
}

export default Producer;
 
 
 
 

