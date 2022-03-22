import React from "react";
import './Login.css';
import Auth from '../../components/Auth/Auth'
import { NavLink} from "react-router-dom";
import pokerlogo  from '../../assets/pokerlogo.svg'

const Login = () => {
  return (
  
      <div className="login section__margin">
      <div className="login-box">
         <div className="poker-image">
        <img src={pokerlogo} alt="poker cards"/>
        </div>
        <h1>Northumbria Poker Society</h1>
       
        <Auth />
          <div className="create-account">
            <NavLink to ="/sign-up"> 
          <p> Create Account </p> 
           </NavLink>
       </div>
      </div>
      </div>
  )
}

export default Login