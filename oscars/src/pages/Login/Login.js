import React, { Component } from "react";
import API from "../../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUserPlus, faSignInAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import "./Login.css";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: [],
      opacity: 1,
      display: ['', 'none', 'none'],
      inputs: {username: '', password: '', passCheck: ''},
      btnDisable: {login: true, createUser: true},
      errors: { login: ['',''], createUser: ['','',''] }
    }
}

componentDidMount() { this.getUsers() } //get users 
// ------------------------------------------- getUsers ----------------------------------------------------
//Get the users picks

getUsers = () => {
  API.getUsers()
    .then(res => this.setState({users: res.data.results}))
    .catch(err => console.log(err));
};

// ----------------------------------------- inputChange ---------------------------------------------------
//
inputChange = (event) => {
  event.preventDefault()
  let{name, value} = event.target;

  let inputs =  Object.assign({}, this.state.inputs);
  let errors = Object.assign({}, this.state.errors);
  let disable = Object.assign({}, this.state.btnDisable);

  if(!this.state.display[1]){ 
    //updates state input values -------------
    inputs[name] = value.trim()
    this.setState({inputs: inputs})

    name === 'username' ? errors.login[0] = '' : errors.login[1] = ''
    this.setState({errors: errors})
    
    //disabled check ---------------
    if(inputs.username && inputs.password && !errors.createUser[0] && !errors.createUser[2] ) {

      disable.login = false
      this.setState({btnDisable: disable})

    } else {
      disable.login = true
      this.setState({btnDisable: disable})
    }
  }

  else if(!this.state.display[2]){ 
    //updates state input values -------------
    inputs[name] = value.trim()
    this.setState({inputs: inputs})
    
    //error checks -----------------
    if(this.state.users.filter((user, i)=> user.username.toLowerCase() === inputs.username.toLowerCase().trim()).length)errors.createUser[0] = 'User name is already being used! ';  
    else errors.createUser[0] = '';

    if(inputs.password.substring(0, inputs.passCheck.length).trim() !== inputs.passCheck.trim() && inputs.passCheck !== '')errors.createUser[2] = 'Passwords do not match!'
    else errors.createUser[2] = '';
    this.setState({errors: errors})
    
    //disabled check ---------------
    if(inputs.username && inputs.password && inputs.passCheck && inputs.password === inputs.passCheck
      && !errors.createUser[0] && !errors.createUser[2] ) {

      disable.createUser = false
      this.setState({btnDisable: disable})

    } else {
      disable.createUser = true
      this.setState({btnDisable: disable})
    }
  }
};

// -------------------------------------------- SignIn -----------------------------------------------------
//Action for signing people in when twitter button is pressed.
signIn = event => {
  event.preventDefault();
  let display =  Object.assign({}, this.state.display);
  let inputs =  Object.assign({}, this.state.inputs);
  let errors =  Object.assign({}, this.state.errors);

  let {name} = event.target;
      
  switch (name) {
    case "twit":
        window.location = "/api/auth/twitter/";
                                                              break
    case "user":
        this.setState({opacity: 0});
        display[0] = 'none'; display[1] = ''; display[2] = 'none';
        setTimeout(()=>{this.setState({display: display})}, 1100)
        setTimeout(()=>{this.setState({opacity: 1})}, 1300)
                                                              break
    case "login":
      if(!parseInt(this.state.users.filter((user, i)=> user.username === inputs.username.trim()).length) === 1){
        errors.login[0] = 'User Name is not found.';
        this.setState({errors: errors});
      } else {
      
      API.login(inputs)
      .then(res => {
        if(res.data._id)window.location = `/Main/${res.data._id}`;
        else {
          errors.login[1] = res.data.msg.message
          this.setState({errors: errors});
        }
      })
      .catch(err => console.log(err));
    }
                                                            break
    case "create":
        this.setState({opacity: 0});
        display[0] = 'none'; display[1] = 'none'; display[2] = '';
        setTimeout(()=>{this.setState({display: display})}, 1100)
        setTimeout(()=>{this.setState({opacity: 1})}, 1300)
                                                              break
    case "createUser":
        inputs.username = inputs.username.trim();
        inputs.password = inputs.password.trim()
        inputs.passCheck = inputs.passCheck.trim()
        
        API.login(inputs)
        .then(res => {
          if(res.data._id)window.location = `/Main/${res.data._id}`;
        })
        .catch(err => console.log(err));
                                  break                         
    default: break
  }

};


// ----------------------------------------- Frontend Code -------------------------------------------------
  render() {
    return (
      <div className="container-fluid logIn">
        <div className="row" id="outer">
          <div className="col-sm-12 align-self-center">
            <div className="row justify-content-center rounded" id="inner"> 
              <img src={require("../../assets/imgs/icon.png")} alt="SiftPop Icon"/>         
              <div className="col-12 text-center" style={{'opacity': this.state.opacity}}>
                
                {
                // ------------------------------------------------------------------- 
                //create account
                }

                <div className="" style={{'display': this.state.display[2]}}>

                  <div className="form-group">
                    <input 
                      type="text" 
                      className="form-control form-control-sm" 
                      name="username" 
                      value={this.state.inputs.username} 
                      onChange={this.inputChange} 
                      placeholder="User Name" 
                      style={{'border': this.state.errors.createUser[0] ? 'solid red 2px': null}}
                    />
                  </div>

                  <div className="form-group">
                    <input 
                      type="password" 
                      className="form-control form-control-sm" 
                      name="password" 
                      value={this.state.inputs.password} 
                      onChange={this.inputChange} 
                      placeholder="Password" 
                    />                  
                  </div>

                  <div className="form-group">
                    <input 
                      type="password" 
                      className="form-control form-control-sm" 
                      name="passCheck" 
                      value={this.state.inputs.passCheck} 
                      onChange={this.inputChange} 
                      placeholder="Repeat Password"
                      style={{'border': this.state.errors.createUser[2] ? 'solid red 2px': null}}
                    />
                  </div>
                  
                  <button 
                    type="button" 
                    name="createUser"
                    className="btn btn-secondary btn-sm twit" 
                    disabled={this.state.btnDisable.createUser}
                    onClick={this.signIn}
                  >   
                    <FontAwesomeIcon name="createUser" icon={faUserPlus} /> Create Account  
                  </button>
                  <small className="form-text">
                    {this.state.errors.createUser[0]}
                  </small>
                  <small className="form-text">
                    {this.state.errors.createUser[2]}
                  </small>  
                </div> 

                {
                // ------------------------------------------------------------------- 
                //user login
                }

                <div style={{'display': this.state.display[1]}}>
                  <div className="form-group row">
                    <input 
                      type="text" 
                      name="username"
                      className="form-control form-control-sm" 
                      placeholder="User Name" 
                      aria-describedby="" 
                      value={this.state.inputs.username} 
                      onChange={this.inputChange} 
                      style={{'border': this.state.errors.login[0] ? 'solid red 2px': null}}
                    />
                  </div>
                  <div className="form-group row">
                    <input 
                      name="password"
                      type="password" 
                      className="form-control form-control-sm" 
                      placeholder="Password" 
                      value={this.state.inputs.password} 
                      onChange={this.inputChange} 
                      style={{'border': this.state.errors.login[1] ? 'solid red 2px': null}}
                    />
                  </div>
                  
                  <button 
                    type="button" 
                    name="login"
                    className="btn btn-secondary btn-sm" 
                    onClick={this.signIn}
                    disabled={this.state.btnDisable.login}
                  >   
                    <FontAwesomeIcon icon={faSignInAlt} /> Login 
                  </button> 
                  <button 
                    type="button" 
                    name="create"
                    className="btn btn-secondary btn-sm" 
                    onClick={this.signIn}
                  >   
                    <FontAwesomeIcon icon={faUserPlus} /> Create Account  
                  </button> 

                  <small className="form-text">
                    {this.state.errors.login[0]}
                  </small>
                  <small className="form-text">
                    {this.state.errors.login[1]}
                  </small> 
                </div> 

                {
                // ------------------------------------------------------------------- 
                // twitter login
                } 
                <div style={{'display': this.state.display[0]}}>
                  <button 
                    type="button" 
                    name="user"
                    className="btn btn-secondary btn-sm" 
                    onClick={this.signIn}
                  >    
                    <FontAwesomeIcon icon={faUser} name="user" /> User Login
                  </button>
               
                  <button 
                    type="button" 
                    name="twit"
                    className="btn btn-secondary btn-sm" 
                    onClick={this.signIn}
                  >    
                    <FontAwesomeIcon icon={faTwitter} /> Login with Twitter    
                  </button>
                </div> 
              </div>
            </div>
          </div>
        </div>     
      </div>
    );
  }
}

export default Login;
