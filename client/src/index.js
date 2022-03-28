import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
import App from './App';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


ReactDom.render(

<React.StrictMode> 
    <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
    </BrowserRouter>
</React.StrictMode>, 
document.getElementById('root')

);

