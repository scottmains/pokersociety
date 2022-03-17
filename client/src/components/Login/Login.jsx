import React from "react";
import './Login.css';
import Auth from '../Auth/Auth'
import Newsfeed from '../../pages/Newsfeed/Newsfeed'
import { NavLink} from "react-router-dom";
import pokerlogo  from '../../assets/pokerlogo.svg'

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            authenticated: false, 
            studentid: "", 
            password: "",
            token:null
        }
    }

    componentDidMount() {
        if(localStorage.getItem('auth-token')) {
            this.setState(
                {authenticated:true,
                 token: localStorage.getItem('auth-token')
                });
        }
    }
    
   render() {


    let page = (
      <div className="login section__margin">
      <div className="login-box">
         <div className="poker-image">
        <img src={pokerlogo} alt="poker cards"/>
        </div>
        <h1>Northumbria Poker Society</h1>
       
          <Auth  />
          <div className="create-account">
            <NavLink to ="/sign-up"> 
          <p> Create Account </p> 
           </NavLink>
       </div>
      </div>
      </div>
     
    )

    if (this.state.authenticated) {
      page = (
          <Newsfeed />
      )
    }


  return (

    <div>
    {page}
    </div>
  )
   }
  }

export default Login;