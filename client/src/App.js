import React from 'react';
import Login from './components/Login/Login'
import Auth from './components/Auth/Auth'

import {
    BrowserRouter as Router,
    Routes,
    Route,
   
    
  } from "react-router-dom";

const App = () => {

    return (

        <Router>
         <Routes>
           <Route path='/' index element={<Auth />}/>
           <Route path='/auth' index element={<Auth />}/>
         </Routes>
        </Router>
    )

    };
 

export default App;