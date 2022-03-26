import React from "react";
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  Link,
  Navigate,
} from "react-router-dom";

import SignInSide from './components/SignInSide';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

import './App.css';
import Users from "./components/Users";
import Usuarios from "./components/Usuarios";



const estaAutenticado =()=>{
  const token = localStorage.getItem('token');
  if(token){
   return <Navigate to="/" replace />;
 }else{
   return false;
 }
}

// const ProtectedRoute = (children) => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     
//   }
//   return children;
// };



function App() {
  return (
    <Router>
      <div>
       
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path='/' exact element={<SignInSide/>} />


          <Route exact path='/dashboard' element={

                estaAutenticado()? <Dashboard/> : <Navigate to='/' />
                  
              
          } />
         
          <Route exact path='/users' element={<Users/>} />
          <Route exact path='/login' element={<SignIn/>} />
          <Route exact path='/register' element={<SignUp/>} />
          <Route exact path='/usuarios' element={<Usuarios/>} />
           
          <Route path='*' element={<NotFound/>} />
          
           
        </Routes>
      </div>
    </Router>
  );
}






export default App;
