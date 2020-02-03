import React, { Component } from "react";
import API from "../../utils/API";
import Picks from "../../components/ProPicks";
import noms from "../../assets/js/noms.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAstronaut, faSearch, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons'
import "./Producer.css";
import {Category} from "../../components/Leaderboard/";

const io = require('socket.io-client')  
const socket = io() 
const time = toString(new Date())

class Producer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersData: [],
            oscars: noms,
            noms: {category: '', noms: [{movie: '', perc: 0}]},
            catOpacity: 1,
            users: [],
            picks:[],
            opacity: 0,
            formOpacity: 1,
            sideOpacity: 1,
            pos: 25,
            time: {hour: "", min: "", sec: ""},
            form: false,
            edit: false,
            search: '',
            visitors: 0
        }
        
        socket.on("leaderboardInfo", (payload) => {this.updateLeaderboardFromSockets(payload)})
        // socket.on("inspector", (payload) => {this.updateCodeFromSockets(payload)})
        socket.on("playerDisplay", (payload) => {this.playerUpdate(payload)})
        socket.on("visitors", (payload) => {this.visitorsUpdate(payload)})
        socket.on("oscarNom", (payload) => {this.nomUpdate(payload)})
        socket.on(time, (payload) => {this.startCheck(payload)})
    }

    // updateCodeFromSockets(payload) {this.setState({users: payload})}
    playerUpdate(payload){
        console.log(payload)
    }
    visitorsUpdate(payload){this.setState({visitors: payload}); console.log(`visitors: ${payload}`)}
    updateLeaderboardFromSockets(payload) {
        let finalInfo =  payload.leaderboard.filter((user)=> user.username !== "SiftPop")
        
        const searchData = finalInfo.filter((player, i) => 
        player.username.toLowerCase().substr(0, this.state.search.length) === this.state.search.toLowerCase().trim()
        )
        this.setState({
          users: searchData,
          usersData: finalInfo, 
          picks: payload.picks
        })
      }

    nomUpdate(payload) {
        if(payload.info){
            let tempInfo = JSON.parse(JSON.stringify(payload.info));
    
            tempInfo.noms.forEach((pick)=>pick.perc = 0)
            this.setState({noms: tempInfo})
            
            setTimeout(()=>{this.setState({catOpacity: 0})}, 100)
            let time = 500;
            tempInfo.noms.forEach((nom, i)=>{
                setTimeout(()=> {
                nom.perc = payload.info.noms[i].perc
                this.setState({noms: tempInfo})
                }, time)      
                time = time+100;
            }) 
    
        } else {
            this.setState({catOpacity: 1})
            setTimeout(()=>{this.setState({noms: {category: '', noms: [{movie: '', perc: 0}]}})}, 1000)
        }
    }

    startCheck(payload) {
        if(payload.users.length){
          this.setState({usersData: payload.users, users:payload.users, picks: payload.picks })
        }
    }

    componentDidMount() {
        this.getUsers(); 
        socket.emit('startCheck', time) // socket.io to check if started
    }

    componentWillUnmount() {socket.emit('disconnect')}
// -------------------------------------------- suffix ------------------------------------------------------
    suffix = (i) => {
        let j = i % 10, k = i % 100;
        if (j === 1 && k !== 11) return i + "st";
        if (j === 2 && k !== 12) return i + "nd";
        if (j === 3 && k !== 13) return i + "rd";
        return i + "th";
      }

// ------------------------------------------- onChange -----------------------------------------------------
    onChange = event => {
        const {name, value} = event.target;
        let data =  Object.assign([], this.state.picks);
        data[name] = value;
        this.setState({picks: data});
        setTimeout(()=> {this.onBtnChange(25)},200)
    }
// ------------------------------------------ searchInput ---------------------------------------------------
    searchInput = event => {
        const {value} = event.target;
        const searchData = this.state.usersData.filter((player, i) => 
        player.username.toLowerCase().substr(0, value.length) === value.toLowerCase().trim()
    )

    this.setState({search: value, users: searchData})
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
    onBtnChange = (pos) => {
        let data = Object.assign([], this.state.picks);

        if(pos < 25){ // when cancled
            this.setState({sideOpacity: 0});
            setTimeout(()=>{this.setState({picks: data, form: false})}, 100);
            setTimeout(()=>{this.setState({sideOpacity: 1, pos: ''})}, 110);
        } else {
            let time = Object.assign({}, this.state.time)

            this.setState({sideOpacity: 0});

            data[24] = (parseInt(time.hour)*3600) + (parseInt(time.min)*60) + parseInt(time.sec)
        
            setTimeout(function(){
            this.setState({picks: data, form: false})
            //  API.updatePicks(this.state.user._id, data)
            }.bind(this), 100) 

            setTimeout(()=>{
                this.setState({sideOpacity: 1, pos: ''})
                socket.emit('updateLeaderboard', this.state.picks)
            }, 110)
        }
        socket.emit('updateOscarNom', false)
    }
    
// ---------------------------------------- picksLocation --------------------------------------------------
    picksLocation = (data) => {
        const pos = (25 - data.filter(user => user.usernam).length)
        this.setState({pos: pos})
    }

// ---------------------------------------- playerChange ---------------------------------------------------
    playerChange = (data) => {
        console.log('lol')
        console.log(this.state.users[data])
    }

// ------------------------------------------- editPick ----------------------------------------------------
    editPick = (pos) => {
        this.setState({sideOpacity: 0});
        setTimeout(()=>{this.setState({pos: pos})}, 100)
        setTimeout(()=>{this.setState({form: true})}, 120)
        setTimeout(()=>{this.setState({edit: true})}, 100)
        setTimeout(()=>{this.setState({sideOpacity: 1})}, 150)
        socket.emit('updateOscarNom', {info: this.state.oscars[pos], pos: pos} )
    }

// ------------------------------------------- getUsers -----------------------------------------------------
//Get the users 
    getUsers = () => {
        console.log('getUsers')
        API.getUsers()
            .then(res => {
                let siftPop = res.data.results.filter(user => user.username === "SiftPop")
                this.setState({users: res.data.results, picks: siftPop[0].oscar.picks, user: siftPop, usersData: res.data.results})
            }
        ).catch(err => console.log(err));
    };
    
// ----------------------------------------------------------------------------------------------------------
// ------------------------------------------ Frontend Code -------------------------------------------------

    render() {
        return (
            <div className="container-fluid">
                <div className="row producer">
                    <div className="col-md-6 proProfile">
                        <div className="col-12">
                            <div className="row">
                                <div className="card-body">
                                    <div className="row">
                                        <div className='col-4'>
                                            <h5>
                                                Players
                                            </h5> 
                                        </div>
                                        <div className="col-8">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                        <FontAwesomeIcon icon={faSearch} />
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control form-control-sm" id="searchInput" value={this.state.search} onChange={this.searchInput} placeholder="Search" />
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div className="col-12 cont">
                                        {this.state.users.map((user, i) => 
                                            <div className="inspect" key={`row${i}`} onClick={function(){this.playerChange()}.bind(this)}>     
                                                {this.suffix(user.place)}: <FontAwesomeIcon icon={faUser} className="svg"/> {user.points}pts / {`${user.username}   `} 
                                                {user.guru ? <FontAwesomeIcon  className={`guru`}  icon={faUserAstronaut}/> : null} 
                                            </div>        
                                        )} 
                                    </div>
                                    <FontAwesomeIcon icon={faUsers} /> {this.state.users.length} / <FontAwesomeIcon icon={faEye} /> {this.state.visitors} 
                                </div>
                            </div>
                        </div>      
                    </div>
                    
                    <div className="col-md-6 proCat" style={{"opacity": 1}}>
                        <div className="col-12 border">
                            <Category oscars={this.state.noms} opacity={this.state.catOpacity} />      
                        </div>   
                        <div className="col-12">
                            <Picks 
                                user={this.state.user} 
                                picks={this.state.picks}
                                oscars={this.state.oscars}
                                edit={this.editPick}
                                location={this.state.pos}
                                onChange={this.onChange}
                                onBtnChange={this.onBtnChange}
                                onInputChange={this.onInputChange}
                                time={this.state.time}
                            />
                        </div>    
                    </div>                    
                </div>     
            </div>
        )
    }
}

export default Producer;
 
 
 
 

