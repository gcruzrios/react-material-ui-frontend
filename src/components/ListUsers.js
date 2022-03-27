//import * as React from 'react';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}


const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  maxWidth: '100%',
  m: 1,
  bgcolor: 'background.paper',
 
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  inputMaterial:{
    paddingTop: '5px',
    width: '100%'
  }
};

export default function ListUsers(){
  const [data, setData]=useState([]);
  const [modalInsertar, setModalInsertar]=useState(false);
  const [modalEditar, setModalEditar]=useState(false);
  const [modalEliminar, setModalEliminar]=useState(false);
  
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



  useEffect(() => {

    peticionGet();
   
  }, [])


  const handleChange=e=>{
    const {name, value}=e.target;
    setUsuarioSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSeleccionado);
  }

  const peticionGet=async()=>{
    const idUsuario = localStorage.getItem('idUsuario');
    const token = localStorage.getItem('token');
  
    await axios.get('/jefe/listar',{headers:{token:token}})
    .then(response=>{
      setData(response.data.respuesta);
    })
  }
  
  const peticionPost=async()=>{
    console.log(usuarioSeleccionado);
    const token = localStorage.getItem('token');
    await axios.post('empleado/crear/', usuarioSeleccionado, {headers:{token:token}})
    .then(response=>{
      
      setData(data.concat(response.data))
      abrirCerrarModalInsertar()
      peticionGet();
    })
  }

  const peticionPut=async()=>{
     const token = localStorage.getItem('token');
     await axios.put('/jefe/actualizar/'+usuarioSeleccionado._id, usuarioSeleccionado,{headers:{token:token}})
    .then(response=>{
      var dataNueva=data;
      dataNueva.map(usuario=>{
        if(usuarioSeleccionado._id===usuario._id){
          usuario.identificacion=usuarioSeleccionado.identificacion;
          usuario.nombre=usuarioSeleccionado.nombre;
          usuario.papellido=usuarioSeleccionado.papellido;
          usuario.sapellido=usuarioSeleccionado.sapellido;
          usuario.correo=usuarioSeleccionado.correo;
            
        }
      })
      setData(dataNueva);
      abrirCerrarModalEditar();
    })
  }

  const peticionDelete=async()=>{
     const token = localStorage.getItem('token');
     console.log(usuarioSeleccionado);
     await axios.delete('/jefe/eliminar/'+usuarioSeleccionado._id,{headers:{token:token}})
    .then(response=>{
      setData(data.filter(usuario=>usuario.id!==usuarioSeleccionado._id));
      abrirCerrarModalEliminar();
      peticionGet();
    })
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const seleccionarUsuario=(usuario, caso)=>{
    setUsuarioSeleccionado(usuario);
    (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
  }

  
  const bodyInsertar=(
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>
      <TextField name="identificacion" variant="standard"  size="small" fullWidth label="Identificación" onChange={handleChange}/>
      <br />
      <TextField name="nombre" variant="standard"  size="small" fullWidth  label="Nombre" onChange={handleChange}/>
      <br />
      <TextField name="papellido" variant="standard"  size="small" fullWidth  label="Primer Apellido" onChange={handleChange}/>
      <br />
      <TextField name="sapellido" variant="standard"  size="small" fullWidth  label="Segundo Apellido" onChange={handleChange}/>
      <br />
      <TextField name="correo" variant="standard"  size="small" fullWidth  label="Correo" onChange={handleChange}/>
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
        <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField name="identificacion"  variant="standard"  size="small" fullWidth  label="Identificación" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.identificacion}/>
      <br />
      <TextField name="nombre"   variant="standard"  size="small" fullWidth  label="Nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre}/>
      <br />
      <TextField name="papellido"   variant="standard"  size="small" fullWidth  label="Apellido 1" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.papellido}/>
      <br />
      <TextField name="sapellido"   variant="standard"  size="small" fullWidth  label="Apellido 2" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.sapellido}/>
      <br />
      <TextField name="correo"   variant="standard"  size="small" fullWidth  label="Correo" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.correo}/>
      
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar el usuario <b>{usuarioSeleccionado && usuarioSeleccionado.nombre}</b> ? </p>
      <div align="right">
        <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  )


  return (
    <React.Fragment>
      <Title>Usuarios de Acceso al Sistema</Title>
      <Stack direction="column" spacing={2} alignItems="flex-end">

        {/* <Button
          variant="contained"
          startIcon={<PersonAddAltIcon />}
          sx={{ mt: 1, ml: 1 }}  
          color="primary"
          onClick={()=>abrirCerrarModalInsertar()}
          >
          Agregar Usuario
        </Button>  */}
      </Stack>
      <br/>
    <Table>
        <TableHead>
          <TableRow>
            <TableCell>Identificacion</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido 1</TableCell>
            <TableCell>Apellido 2</TableCell>
            
            <TableCell>Correo</TableCell>
            <TableCell>Acciones</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(usuario=>(
            <TableRow key={usuario._id}>
              <TableCell>{usuario.identificacion}</TableCell>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.papellido}</TableCell>
              <TableCell>{usuario.sapellido}</TableCell>
              <TableCell>{usuario.correo}</TableCell>
              <TableCell>
               
                  <IconButton 
                      aria-label="delete" 
                      variant="contained" 
                      onClick={()=>seleccionarUsuario(usuario, 'Editar')}
                      color="primary" 
                      size="large">
                      <EditIcon/>
                  </IconButton>

                  <IconButton 
                      aria-label="delete" 
                      variant="contained" 
                      color="error" 
                      onClick={()=>seleccionarUsuario(usuario, 'Eliminar')}
                      size="large">
                      <DeleteIcon/>
                  </IconButton>
                 
                              
                
              </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>



     <Modal
      open={modalInsertar}
      onClose={abrirCerrarModalInsertar}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
     >
       <Box sx={styles}>
           {bodyInsertar}
        </Box>
     </Modal>

     <Modal
      open={modalEditar}
      onClose={abrirCerrarModalEditar}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
     >
        
        <Box sx={styles}>
          {bodyEditar}  
          
        </Box>
     </Modal>





     <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          
          {bodyEliminar}
        </Box>
     </Modal>
     
     {/* <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal> */}
    

    </React.Fragment>
  );
}
