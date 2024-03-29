import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";
//import React, { useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import {
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import AppTopBar from './AppTopBar';
import Usuarios from './Usuarios';
import ListClients from './ListClients';
import AddClient from './AddClient';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.geoinn.net/">
        GEOINN TI
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function Getparams(){

  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
}
  


function preventDefault(event) {
    event.preventDefault();
  }
  
  
  
  const mdTheme = createTheme();

 
 
 function FormsClient(){

  const location = useLocation();

  if (location.pathname ===''){
    return "<ListClients/>";
  }
  if (location.pathname ==='/clients/add-client'){
    return "<AddClient/>";
  }


 }


function ClientsContent() {

  const [open, setOpen] = React.useState(true);
  
  const toggleDrawer = () => {
    setOpen(!open);
    console.log("en Users:",open);
    if (open){

    }
  };


//   const logout = ()=>{
//     localStorage.clear();
//     window.location.href='/'
//   }

  

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppTopBar open={open} ></AppTopBar>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
          >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    
                  }}
                > 
                
                     <ListClients />  
                </Paper> 
              </Grid>
            
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
  
}

//export default Users

export default function Client() {
    return <ClientsContent />;
}