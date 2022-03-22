import React from "react";
import "./Newsfeed.css"
import AuthContext from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
/**

 * 
 * @author Scott Mains
 */

const Newsfeed = () => {

  const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
      // if used in more components, this should be in context 
      // axios to /logout endpoint 
      setAuth({});
      navigate('/login');
  }


  return (
   
    <div className= "newsfeed section__padding">
    <h1> NEWS FEED </h1>
    <p> News feed will go here</p>
    <button onClick={logout}>Sign Out</button>
   
  </div>
  )
}


 
export default Newsfeed;