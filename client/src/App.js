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
    Navigate
  } from "react-router-dom";

import useAuth from "./context/Auth/useAuth";
import PersistLogin from './components/Auth/persistLogin';

const App = () => {


  const  {auth } = useAuth();


console.log(auth)
    return (
      
         <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="sign-up" element={<Register />}/>
        <Route element={<PersistLogin/>}> 
       
        <Route path="newsfeed"  element={
          auth?.accessToken? <Newsfeed /> : <Navigate to="/" />
        }/>
        <Route path="profile"  element={
          auth?.accessToken? <Profile /> : <Navigate to="/" />
        }/></Route>
         </Routes>
    )
    };
 

export default App;