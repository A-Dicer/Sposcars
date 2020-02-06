import React, { Component } from "react";
import "./CategoryPage.css";

let socket;

class CategoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oscars: {noms: []},
      opacity: 1 
    }
  }

  componentDidMount() {
    const io = require('socket.io-client')  
    socket = io() 
    socket.on("oscarNom", (payload) => {this.updateNoms(payload)})
  }

  componentWillUnmount() {socket.emit('disconnect')}

// ------------------------------------------ updateNoms ---------------------------------------------------
  updateNoms(payload) {
    if(payload.info){
      let tempInfo = JSON.parse(JSON.stringify(payload.info));

      tempInfo.noms.forEach((pick)=>pick.perc = 0)
      this.setState({oscars: tempInfo})
      
      setTimeout(()=>{this.setState({opacity: 0})}, 1000)
        let time = 1500;
        tempInfo.noms.forEach((nom, i)=>{
          setTimeout(()=> {
            nom.perc = payload.info.noms[i].perc
            this.setState({oscars: tempInfo})
          }, time)      
          time = time+100;
        }) 
    } else {
      this.setState({opacity: 1}); 
      setTimeout(()=>{this.setState({oscars: {noms:[]}})},1000)
    }   
  }

// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div style={{'padding': '1vw'}}>
        <div className="container-fluid">   
          <div className="row justify-content-center" id="Category" style={{'height':this.state.oscars.noms.length ? this.state.oscars.noms.length < 7 ?'58vw' :'90vw' : '0'}}>
            <div className="screen row align-items-center" style={{'opacity': this.state.opacity}}>
              
                <img src={require("../../assets/imgs/logo2.png")} alt="SiftPop Icon"/> 
              
            </div>
            <div className="text-center card-header col-12">
              <h5 > 
                <img src={require("../../assets/imgs/oscar.png")} alt="SiftPop Icon"/>{this.state.oscars.category}
              </h5>
            </div> 
            <div className='col-12'>
            {
              this.state.oscars.noms.map((nom, i) =>
                <div className='row' key={`nom${i}`}> 
                  <div className='col-12 percContainer text-center'>
                    <p>{nom.movie} ({nom.perc})</p>
                      <div className="percColor" style={{'width': nom.perc}}>
                      </div>
                  </div>
                </div>
            )}
            </div>
          </div>        
        </div>
      </div>
    );
  }
}

export default CategoryPage;
