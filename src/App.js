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
import Consulta from "./components/Consulta";

import FormClient from "./components/FormClient";
import FormSelect from "./components/FormSelect";




import Request from "./components/Requests";
import Client from "./components/Clients";
import Reportes from "./components/Reports";
import Integraciones from "./components/Integrations";
import Mapas from "./components/Maps";
import Ejemplo from "./components/Ejemplo";

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
          <Route exact path='/requests' element={<Request/>} />
          <Route exact path='/clients' element={<Client/>} />
          <Route exact path='/reports' element={<Reportes/>} />
          <Route exact path='/integrations' element={<Integraciones/>} />
          <Route exact path='/maps' element={<Mapas/>} />


          <Route exact path='/login' element={<SignIn/>} />
          <Route exact path='/register' element={<SignUp/>} />

          <Route exact path='/clients/add-client' element={<FormClient/>} />
          <Route exact path='/clients/edit-client' element={<FormClient/>} />
          <Route exact path='/usuarios' element={<Usuarios/>} />
          <Route exact path='/consulta' element={<Consulta/>} />
          <Route exact path='/ejemplo' element={<Ejemplo/>} />
          <Route exact path='/form-select' element={<FormSelect/>} />
          
           
          <Route path='*' element={<NotFound/>} />
          
           
        </Routes>
      </div>
    </Router>
  );
}






export default App;
