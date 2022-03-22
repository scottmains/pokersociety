import React from 'react';
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import './app.css'
import {
    BrowserRouter as Router,
    Routes,
    Route,
  } from "react-router-dom";
import Newsfeed from './pages/Newsfeed/Newsfeed';
import RequireAuth from './components/Auth/RequireAuth';

const ROLES = {
  'User': 1,
  'Admin': 2
}


const App = () => {

    return (

       
         <Routes>
           <Route path='login' index element={<Login />}/>
           <Route path='sign-up' index element={<SignUp/>}/>
           <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Newsfeed />} />
          </Route>
         </Routes>
      
    )
    };
 

export default App;