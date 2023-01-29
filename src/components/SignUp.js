//import * as React from 'react';
import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import axios from 'axios';
import Swal from 'sweetalert2';

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

const theme = createTheme();





export default function SignUp() {

    const [identificacion, setIdentificacion] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rcontrasena, setRcontrasena] = useState('');
    
    const [nombre, setNombre] = useState('');
    const [papellido, setPapellido] = useState('');
    const [sapellido, setSapellido] = useState('');

  
    const handleLogin= async(e) =>{
        e.preventDefault();

        const usuario = {identificacion, nombre, papellido, sapellido, correo, contrasena}

        console.log(usuario);

        const respuesta= await axios.post(`/jefe/crear`, usuario);
        console.log(respuesta);
        const mensaje = respuesta.data.mensaje;

        if(mensaje !=='Bienvenido'){
            
            
            Swal.fire({
               
                icon: 'error',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            })

        }else{
            
            const token = respuesta.data.token;
            const nombre = respuesta.data.nombre;
            const idUsuario = respuesta.data.id;
             
            Swal.fire({
                 icon: 'success',
                 title: mensaje,
                 showConfirmButton: false,
                 timer: 1500
            })
            localStorage.setItem('token', token);
            localStorage.setItem('nombre', nombre);
            localStorage.setItem('idUsuario', idUsuario);
            
            window.location.href='/dashboard'
        }


  }





  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Identificacion"
                  name="identificacion"
                  required
                  fullWidth
                  id="identificacion"
                  label="Identificación"
                  autoFocus
                  onChange={(e)=>setIdentificacion(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Nombre Completo"
                  name="nombreCompleto"
                  required
                  fullWidth
                  id="nombreCompleto"
                  label="Nombre"
                  autoFocus
                  onChange={(e)=>setNombre(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="papellido"
                  label="Primer Apellido"
                  name="papellido"
                  autoComplete="Apellido"
                  onChange={(e)=>setPapellido(e.target.value)}
                />
              </Grid> 
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="sapellido"
                  label="Segundo Apellido"
                  name="sapellido"
                  autoComplete="Apellido"
                  onChange={(e)=>setSapellido(e.target.value)}
                />
              </Grid> 
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="correo"
                  label="Correo electrónico"
                  name="correo"
                  autoComplete="email"
                  onChange={(e)=>setCorreo(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contrasena"
                  label="Contraseña"
                  type="password"
                  id="contrasena"
                  autoComplete="new-password"
                  onChange={(e)=>setContrasena(e.target.value)}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contrasena"
                  label="Repetir Contraseña"
                  type="password"
                  id="rcontrasena"
                  autoComplete="new-password"
                  onChange={(e)=>setRcontrasena(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Quiero recibir más información por email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Ya tiene cuenta? Ingrese aquí
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
