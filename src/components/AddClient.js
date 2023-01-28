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
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const theme = createTheme();


function AddClient() {

    const [data, setData]=useState([]);
    const [consulta, setConsulta]=useState([]);

    const [provincias, setProvincias] = useState([]);
    const [cantones, setCantones] = useState([]);
    const [distritos, setDistritos] = useState([]);
    const [barrios, setBarrios] = useState([]);

    //const [selectedOption, setSelectedOption] = useState(options[0].value);

    const [provinciaSeleccionada, setProvinciaSeleccionada] = useState('');
    const [cantonSeleccionado, setCantonSeleccionado] = useState('');
    const [distritoSeleccionado, setDistritoSeleccionado] = useState('');
    const [barrioSeleccionado, setBarrioSeleccionado] = useState('');

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

      const listarProvincias = async () =>{
        
        await axios.get('/codigo/listarProvincia/')
        .then(response=>{
          //setConsulta(response.data);
          console.log(response.data);
          setData(response.data.respuesta);
          setProvincias(response.data.respuesta);
        })
      }

      const listarCantones = async (CodProv) =>{
        console.log(CodProv);
        await axios.get('/codigo/listarCanton/'+CodProv)
        .then(response=>{
          
          console.log(response.data);
          setCantones(response.data.respuesta);
        })
      }

      const listarDistritos = async (CodProv, CodCanton) =>{
        console.log(CodProv);
        console.log(CodCanton);
        await axios.get('/codigo/listarDistrito/'+CodProv+'/'+CodCanton)
        .then(response=>{
          //setConsulta(response.data);
          console.log(response.data);
          setDistritos(response.data.respuesta);
        })
      }

      const listarBarrios = async (CodProv,CodCanton,CodDistrito) =>{
        
        await axios.get('/codigo/listarBarrio/'+CodProv+'/'+CodCanton+'/'+CodDistrito)
        .then(response=>{
          //setConsulta(response.data);
          console.log(response.data);
          setBarrios(response.data.respuesta);
        })
      }

    const handleProvinciaChange = async (e) => {
      console.log(e.target.value)
      //await setProvinciaSeleccionada(e.currentTarget.value)
      setProvinciaSeleccionada(e.target.value)
      await listarCantones(e.target.value);
      //console.log(cantones);
    }
    
    const handleCantonChange = async (e) => {
      console.log(provinciaSeleccionada);
      console.log(e.target.value)
     
      setCantonSeleccionado(e.target.value)
      await listarDistritos(provinciaSeleccionada,e.target.value);

    }

    const handleDistritoChange = async (e) => {
      
      console.log(provinciaSeleccionada);
      console.log(cantonSeleccionado);
      console.log(e.target.value)
      setDistritoSeleccionado(e.target.value)
      await listarBarrios(provinciaSeleccionada,cantonSeleccionado, e.target.value);
      
      
    } 
    
    const handleBarrioChange = async (e) => {
      
      console.log(provinciaSeleccionada);
      console.log(cantonSeleccionado);
      console.log(distritoSeleccionado);
      setBarrioSeleccionado(e.target.value);
      //await listarBarrios(provinciaSeleccionada,cantonSeleccionado, e.target.value);
      
      
    } 
    
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
        listarProvincias();
       }, [])
      
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={3} md={3}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"   sx={{ mt: 2 }} >Tipo ID</InputLabel>
                    <Select
                    sx={{ mt: 2 }}
                    margin="normal"
                    required
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value='F'
                    label="Tipo ID"
                    //onChange={handleChange}
                    >
                    <MenuItem value='F'>Fisico</MenuItem>
                    <MenuItem value='J'>Juridico</MenuItem>
                    <MenuItem value='P'>Pasaporte</MenuItem>
                    <MenuItem value='D'>Dimex</MenuItem>
                    
                    </Select>
                  </FormControl>
               
                                        
              </Grid> 
              <Grid item xs={12} sm={5} md={5}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="cedula"
                  label="Número de cédula con ceros sin guiones"
                  name="cedula"
                  autoComplete="cedula"
                  autoFocus
                />
              </Grid> 
              <Grid item xs={12} sm={4} md={4}>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Consultar
              </Button>
            </Grid>
            <Grid item xs={12} sm={12}>
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
            </Grid>

            <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="papellido"
                  label="Primer Apellido"
                  name="papellido"
                  
                  value={usuarioSeleccionado.PAPELLIDO}
                  autoComplete="Apellido"
                  autoFocus
                />
            </Grid> 
            <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="sapellido"
                  label="Segundo Apellido"
                  name="sapellido"
                  value={usuarioSeleccionado.SAPELLIDO}
                  autoComplete="Apellido"
                  autoFocus
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="correo"
                  label="Correo electrónico"
                  name="correo"
                                   
                  autoComplete="Correo"
                  autoFocus
                />
            </Grid> 
            <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="telefono"
                  label="Teléfono"
                  name="telefono"
                 
                  autoComplete="Telefono"
                  autoFocus
                />
            </Grid>
            <Grid item xs={12} sm={3} md={3}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"   sx={{ mt: 2 }} >Provincia</InputLabel>
                    <Select
                    sx={{ mt: 2 }}
                    margin="normal"
                    required
                    fullWidth
                    labelId="provincias-label"
                    id="provinciasSelect"
                    //value={age}
                    value={provinciaSeleccionada}
                    label="Provincia"
                   
                    onChange={e => handleProvinciaChange(e)}
                    //onChange={e => setProvinciaSeleccionada(e.target.value)}
                    >
                    <MenuItem value='Escoja'>Escoja Provincia</MenuItem>
                      {data.map(provincia=>(

                      //<li key={provincia}>{provincia}</li>

                      <MenuItem value={provincia}>{provincia}</MenuItem>
                      
                      //<MenuItem>{provincia}</MenuItem>
                        
                      ))}
                    </Select>
                    {/* <p>{document.getElementById("provincias-select").value}</p>  */}
                  </FormControl>
               
                                        
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"   sx={{ mt: 2 }} >Cantón</InputLabel>
                    <Select
                    sx={{ mt: 2 }}
                    margin="normal"
                    required
                    fullWidth
                    labelId="cantones-label"
                    id="cantonesSelect"
                    //value={age}
                    label="Cantón"
                    //onChange={handleChange}
                    onChange={e => handleCantonChange(e)}
                    >
                     <MenuItem value='Escoja'>Escoja el Cantón</MenuItem>
                      {cantones.map(canton=>(

                     
                      <MenuItem value={canton}>{canton}</MenuItem>
                      
                      //<MenuItem>{provincia}</MenuItem>
                        
                      ))}
                    </Select>
                    
                
                  </FormControl>
               
                                        
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"   sx={{ mt: 2 }} >Distrito</InputLabel>
                    <Select
                    sx={{ mt: 2 }}
                    margin="normal"
                    required
                    fullWidth
                    labelId="distritos-label"
                    id="distritosSelect"
                    //value={age}
                    label="Distrito"
                    onChange={e => handleDistritoChange(e)}
                    >
                    <MenuItem value='Escoja'>Escoja el Distrito</MenuItem>
                      
                      {distritos.map(distrito=>( 

                      <MenuItem value={distrito}>{distrito}</MenuItem>
                      
                        
                      ))}
                    
                    </Select>
                  </FormControl>
               
                                        
              </Grid>
              <Grid item xs={12} sm={3} md={3}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"   sx={{ mt: 2 }} >Barrio</InputLabel>
                    <Select
                    sx={{ mt: 2 }}
                    margin="normal"
                    required
                    fullWidth
                    labelId="barrios-label"
                    id="barriosSelect"
                    //value={age}
                    label="Barrio"
                    //onChange={handleChange}
                    onChange={e => handleBarrioChange(e)}
                    >
                    <MenuItem value='Escoja'>Escoja el Barrio</MenuItem>
                      
                      {barrios.map(barrio=>( 

                      <MenuItem value={barrio}>{barrio}</MenuItem>
                      
                        
                      ))}
                    
                    </Select>
                  </FormControl>
               
                                        
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                  
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="direccion"
                    label="Dirección"
                    name="direccion"
                  
                    autoComplete="direccion"
                    autoFocus
                  />
               
                                        
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                  
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label"   sx={{ mt: 2 }} >Tipo de Cliente</InputLabel>
                    <Select
                    sx={{ mt: 2 }}
                    margin="normal"
                    required
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value='N'
                    label="Tipo Cliente"
                    //onChange={handleChange}
                    >
                    <MenuItem value='N'>Nacional</MenuItem>
                    <MenuItem value='I'>Internacional</MenuItem>
              
                    
                    </Select>
                  </FormControl>
               
                                        
              </Grid>

          </Grid>
          <Stack direction="column" spacing={2} alignItems="flex-end">

            <Button
              type="submit"
              //fullWidth
              autoWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar Cliente
            </Button>
           </Stack> 
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  )
}

export default AddClient