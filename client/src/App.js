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
import RequireAuth from  "./context/Auth/RequireAuth";
import NewsfeedAdmin from './pages/Newsfeed/NewsfeedAdmin';
import Unauthorized from './pages/Unauthorized';



const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

const App = () => {


  const  {auth} = useAuth();


console.log(auth)
    return (
      
         <Routes>
        <Route path="/" element={<Auth />}/>
        <Route path="sign-up" element={<Register />}/>
        <Route path="unauthorized" element={<Unauthorized />}/>
        
        <Route element={<PersistLogin/>}> 
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
        <Route path="newsfeed"  element={
          <Newsfeed />}/>
        <Route path="profile"  element={
         <Profile /> }/>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="newsfeedadmin"  element={
          <NewsfeedAdmin />}/>
          </Route>
          
      </Route>
      </Route>
         </Routes>
    )
    };
 

export default App;