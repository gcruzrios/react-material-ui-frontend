//import React from 'react'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField} from '@material-ui/core';
import {Edit, Delete} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));
  
 

export default function Usuarios() {

    const styles= useStyles();
    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
  
    const [usuarioSeleccionado, setUsuarioSeleccionado]=useState({
      nombre: '',
      apellidos:'',
      identificacion: '',
      puesto: '',
      tcontrato:'',
      jefe:localStorage.getItem('idUsuario')

    })
  

    useEffect(() => {

      peticionGet();
     
  }, [])

  //   const usuario={
  //     nombre,
  //     apellidos,
  //     identificacion,
  //     puesto,
  //     tcontrato:contratoSelect,
  //     jefe:localStorage.getItem('idUsuario')

  //  }


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

      await axios.get('/empleado/listar-empleados-jefe/'+idUsuario,{headers:{token:token}})
      .then(response=>{
        setData(response.data);
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
       await axios.put('/empleado/actualizar/'+usuarioSeleccionado._id, usuarioSeleccionado,{headers:{token:token}})
      .then(response=>{
        var dataNueva=data;
        dataNueva.map(usuario=>{
          if(usuarioSeleccionado._id===usuario._id){
            usuario.identificacion=usuarioSeleccionado.identificacion;
            usuario.nombre=usuarioSeleccionado.nombre;
            usuario.papellido=usuarioSeleccionado.papellido;
            usuario.sapellido=usuarioSeleccionado.sapellido;
            usuario.sexo=usuarioSeleccionado.sexo;
            usuario.puesto =usuarioSeleccionado.puesto;
            usuario.tcontrato=usuarioSeleccionado.tcontrato;
            usuario.jefe=usuarioSeleccionado.jefe;
            
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
    }
  
    const peticionDelete=async()=>{
       const token = localStorage.getItem('token');
       console.log(usuarioSeleccionado);
       await axios.delete('/empleado/eliminar/'+usuarioSeleccionado._id,{headers:{token:token}})
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
  
    useEffect(async()=>{
      await peticionGet();
    },[])
  
    const bodyInsertar=(
      <div className={styles.modal}>
        <h3>Agregar Nuevo Usuario</h3>
        <TextField name="identificacion" className={styles.inputMaterial} label="Identificación" onChange={handleChange}/>
        <br />
        
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange}/>
        <br />
        <TextField name="papellido" className={styles.inputMaterial} label="Primer Apellido" onChange={handleChange}/>
        <br />
        <TextField name="sapellido" className={styles.inputMaterial} label="Segundo Apellido" onChange={handleChange}/>
        <br />
        <TextField name="sexo" className={styles.inputMaterial} label="Sexo" onChange={handleChange}/>
        <br />
        <TextField name="puesto" className={styles.inputMaterial} label="Puesto" onChange={handleChange}/>
        <br />
        <TextField name="tcontrato" className={styles.inputMaterial} label="Tipo de contrato" onChange={handleChange}/>
        <br /><br />
        <div align="right">
          <Button color="primary" onClick={()=>peticionPost()}>Insertar</Button>
          <Button onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </div>
    )
  
    const bodyEditar=(
      <div className={styles.modal}>
        <h3>Editar Usuario</h3>
        
        <TextField name="identificacion" className={styles.inputMaterial} label="Identificación" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.identificacion}/>
        <br />
        <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre}/>
        <br />
        <TextField name="papellido" className={styles.inputMaterial} label="Primer Apellido" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.papellido}/>
        <br />
        <TextField name="sapellido" className={styles.inputMaterial} label="Segundo Apellido" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.sapellido}/>
        <br />
        <TextField name="sexo" className={styles.inputMaterial} label="Sexo" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.sexo}/>
        <br />
        <TextField name="puesto" className={styles.inputMaterial} label="Puesto" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.puesto}/>
        <br />
        <TextField name="tcontrato" className={styles.inputMaterial} label="Tipo de contrato" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.tcontrato}/>
  
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
    <div>

    <br />
    <Button onClick={()=>abrirCerrarModalInsertar()}>Insertar</Button>
      <br /><br />
     <TableContainer>
       <Table>
         <TableHead>
           <TableRow>
             
             <TableCell>Identificación</TableCell>
             <TableCell>Nombre</TableCell>
             <TableCell>Primer Apellido</TableCell>
             <TableCell>Segundo Apellido</TableCell>
             <TableCell>Sexo</TableCell>
             <TableCell>Puesto</TableCell>
             <TableCell>Tipo de contrato</TableCell>
             <TableCell>Acciones</TableCell>
           </TableRow>
         </TableHead>

         <TableBody>
           {data.map(usuario=>(
             <TableRow key={usuario.id}>
               <TableCell>{usuario.identificacion}</TableCell>
               <TableCell>{usuario.nombre}</TableCell>
               <TableCell>{usuario.papellido}</TableCell>
               <TableCell>{usuario.sapellido}</TableCell>
               <TableCell>{usuario.sexo}</TableCell>
               <TableCell>{usuario.puesto}</TableCell>
               <TableCell>{usuario.tcontrato}</TableCell>
               <TableCell>
                 <Edit className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Editar')}/>
                 &nbsp;&nbsp;&nbsp;
                 <Delete  className={styles.iconos} onClick={()=>seleccionarUsuario(usuario, 'Eliminar')}/>
                 </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
     
     <Modal
     open={modalInsertar}
     onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
     </Modal>

     <Modal
     open={modalEditar}
     onClose={abrirCerrarModalEditar}>
        {bodyEditar}
     </Modal>

     <Modal
     open={modalEliminar}
     onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
     </Modal>
    </div>
  
  )

}
