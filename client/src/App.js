import React from 'react';
import Auth from './components/Auth/Auth';
import Register from './components/Register/Register';
import Newsfeed from './pages/Newsfeed/Newsfeed';
import Profile from './pages/Profile/Profile';
import './app.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import {LoginContext} from "./context/LoginContext"
import {useState, useContext } from 'react';


const App = () => {

  const [name, setName] = useState("");

    return (

         <Routes>
          <Route path='/' index element={<Auth/>}/> 
           <Route path='sign-up' index element={<Register/>}/>
           <Route path="newsfeed" element={<Newsfeed />} />
           <Route path="profile" element={<LoginContext.Provider value={{name, setName}}><Profile /></LoginContext.Provider>} /> 
         </Routes>
    )
    };
 

export default App;