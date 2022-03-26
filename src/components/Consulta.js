import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


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

 

function Consulta() {

    const [consulta, setConsulta]=useState([]);


    const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
        identificacion: '',
        nombre: '',
        papellido:'',
        sapellido:'',
        sexo:'',
        puesto: '',
        tcontrato:'',
        jefe:localStorage.getItem('idUsuario')
    
      })



    const handleSubmit = async (event) => {
        event.preventDefault();

        const idUsuario = localStorage.getItem('idUsuario');
        const token = localStorage.getItem('token');
        //const cedula: data.get('cedula')

        

        const data = new FormData(event.currentTarget);
        const cedula = data.get('cedula');

        await axios.get('/registro/buscar/'+cedula,{headers:{token:token}})
        .then(response=>{
          setConsulta(response.data);
          console.log(response.data);
          setUsuarioSeleccionado(response.data[0]);

        //   document.getElementById("nombre").value = usuarioSeleccionado.nombre;
        //   document.getElementById("papellido").value = usuarioSeleccionado.papellido;
        //   document.getElementById("sapellido").value = usuarioSeleccionado.sapellido;
          
        })

        console.log(usuarioSeleccionado);
      };

       useEffect(() => {

        handleSubmit();
       
       }, [])
      
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
            Consulta Cedula
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="cedula"
              label="Numero de cedula"
              name="cedula"
              autoComplete="cedula"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Consultar
            </Button>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="nombre"
              autoFocus
              value={usuarioSeleccionado.NOMBRE}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="papellido"
              label="Primer Apellido"
              name="papellido"
              autoComplete="Primer apellido"
              value={usuarioSeleccionado.PAPELLIDO}
              autoFocus
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="sapellido"
              label="Segundo Apellido"
              name="sapellido"
              autoComplete="Segundo Apellido"
              value={usuarioSeleccionado.SAPELLIDO}
              autoFocus
            />
            
          
            <Grid container>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}

export default Consulta