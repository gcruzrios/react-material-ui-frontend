import React from "react";
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link
} from "react-router-dom";

import SignInSide from './components/SignInSide';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import Dashboard from './components/Dashboard';


import './App.css';

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          
          
          <Route path='/' exact element={<SignInSide/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/login' element={<SignIn/>} />
          <Route path='/register' element={<SignUp/>} />
          
        </Routes>
      </div>
    </Router>
  );
}






export default App;
