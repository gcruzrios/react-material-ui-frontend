import React from 'react'
//import React, { useEffect } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom'
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

function Logout(props) {
  return (

      
      <Link color="inherit"    href="/"  {...props}>
         Salir
      </Link>
    );
}

function Welcome(props) {
  return (
     
    <Typography
    component="p"
    variant="p"
    color="inherit"
    noWrap
    sx={{ flexDirection: 'row-reverse' }}
    >
    {localStorage.getItem('nombre')} | {' '} 

    </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//const drawerWidth = 240;
  
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );


    


export default function AppTopBar(props) {


  const [open, setOpen] = React.useState(true);

  const TituloBar = () => {
  const location = useLocation();
  //console.log(location.pathname)
    if (location.pathname ==='/users'){
      return "Usuarios";
    }
    if (location.pathname ==='/requests'){
      return "Pedidos";
    }
    if (location.pathname ==='/clients'){
      return "Clientes";
    }
    
    if (location.pathname ==='/reports'){
      return "Reportes";
    }
    
    if (location.pathname ==='/integrations'){
      return "Integraciones";
    }
    
    if (location.pathname ==='/maps'){
      return "Mapas";
    }
    if (location.pathname ==='/clients/add-client'){
      return "Agregar Cliente";
    }
   
  } 
   
  const toggleDrawer = () => {
    setOpen(!open);
    //console.log("en TopBar:",open);
  };


  const logout = ()=>{
    localStorage.clear();
    window.location.href='/'
  }

  //open={props.open}
  return (
 
    <>
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: '24px', // keep right padding when drawer closed
        }}
      >
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        component="h1"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1 }}
      >
        { TituloBar() }
      </Typography>
      <IconButton color="inherit">
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    
      <Welcome />



      <Logout sx={{ flexDirection: 'row-reverse' }} onClick={()=>logout()} />
    </Toolbar>
  </AppBar>
  <Drawer variant="permanent" open={open}>
    <Toolbar
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
      }}
    >
      <IconButton onClick={toggleDrawer}>
        <ChevronLeftIcon />
      </IconButton>
    </Toolbar>
    <Divider />
    <List component="nav">
      {mainListItems}
      <Divider sx={{ my: 1 }} />
      {secondaryListItems}
    </List>
  </Drawer>
  </>
  )
}
