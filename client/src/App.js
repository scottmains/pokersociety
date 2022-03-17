import React from 'react';
import Auth from './components/Auth/Auth'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import './app.css'


import {
    BrowserRouter as Router,
    Routes,
    Route,
   
    
  } from "react-router-dom";

const App = () => {

    return (

        <Router>
         <Routes>
           <Route path='/' index element={<Login />}/>
           <Route path='sign-up' index element={<SignUp/>}/>
         </Routes>
        </Router>
    )

    };
 

export default App;