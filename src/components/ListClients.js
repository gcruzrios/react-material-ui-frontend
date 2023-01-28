import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom'
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
import { WindowSharp } from '@mui/icons-material';
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


function ListClients() {

    const [data, setData]=useState([]);
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    

    const [clienteSeleccionado, setClienteSeleccionado]=useState({
    
        identificacion: 0,
        identificacionTipo: '',
        nombreComercial:'',
        nombre: '',
        papellido: '',
        sapellido: '',
        sexo: 0,
        correo:'',
        telefono:'',
        provincia: '',
        canton:'',
        distrito: '',
        barrio:'',
        direccion:'',
        tcontrato: '',
        jefe:localStorage.getItem('idcliente')
    })


    useEffect(() => {

        peticionGet();
    
    }, [])
    
    const handleChange=e=>{
    const {name, value}=e.target;
    setClienteSeleccionado(prevState=>({
        ...prevState,
        [name]: value
    }))
    console.log(clienteSeleccionado);
    }

    const AddClientForm = () =>{

       window.location.href = '/clients/add-client';
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
    
    
    const peticionGet=async()=>{
        const idcliente = localStorage.getItem('idcliente');
        const token = localStorage.getItem('token');
        
        //await axios.get('/cliente/listar-jefe/'+idcliente,{headers:{token:token}})
        await axios.get('/cliente/listar/',{headers:{token:token}})
        .then(response=>{
            setData(response.data);
        })
    }

    const peticionDelete=async()=>{
        const token = localStorage.getItem('token');
        console.log(clienteSeleccionado);
        await axios.delete('/cliente/eliminar/'+clienteSeleccionado._id,{headers:{token:token}})
       .then(response=>{
         setData(data.filter(cliente=>cliente.id!==clienteSeleccionado._id));
         abrirCerrarModalEliminar();
         peticionGet();
       })
     }
   
    const seleccionarCliente=(cliente, caso)=>{
        setClienteSeleccionado(cliente);
        (caso==='Editar')?abrirCerrarModalEditar():abrirCerrarModalEliminar()
    }

    const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar el cliente <b>{clienteSeleccionado && clienteSeleccionado.nombre}</b> ? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()} >Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )
    


  return (<React.Fragment>
    <Title>Lista de Clientes</Title>
    <Stack direction="column" spacing={2} alignItems="flex-end">

      <Button
        variant="contained"
        startIcon={<PersonAddAltIcon />}
        sx={{ mt: 1, ml: 1 }}  
        color="primary"
        onClick={()=>AddClientForm()}
        >
        Agregar cliente
      </Button>  
{/* 
        <Button 
        variant="contained"
        startIcon={<PersonAddAltIcon />}
        sx={{ mt: 1, ml: 1 }}  
        color="primary"
        component={Link} 
        to="/clients/add-client">
        Agregar cliente
        </Button> */}
        
    </Stack>
    <br/>
  <Table>
      <TableHead>
        <TableRow>
          <TableCell>Identificación</TableCell>
          <TableCell>Nombre</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>Apellido</TableCell>
          <TableCell>Sexo</TableCell>
          <TableCell>Tipo de contrato</TableCell>
          <TableCell align="right">Beneficio</TableCell>
          <TableCell>Acciones</TableCell>
          
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(cliente=>(
          <TableRow key={cliente._id}>
            <TableCell>{cliente.identificacion}</TableCell>
            <TableCell>{cliente.nombre}</TableCell>
            <TableCell>{cliente.papellido}</TableCell>
            <TableCell>{cliente.sapellido}</TableCell>
            <TableCell>{cliente.sexo===1?'Masculino':'Femenino'}</TableCell>
            <TableCell>{cliente.tcontrato}</TableCell>
            <TableCell align="right">500000.00</TableCell>
            <TableCell>
             
            <IconButton 
                aria-label="delete" 
                variant="contained" 
                onClick={()=>seleccionarCliente(cliente, 'Editar')}
                color="primary" 
                size="large">
                <EditIcon/>
            </IconButton>

            <IconButton 
                aria-label="delete" 
                variant="contained" 
                color="error" 
                onClick={()=>seleccionarCliente(cliente, 'Eliminar')}
                size="large">
                <DeleteIcon/>
            </IconButton>
               
               &nbsp; 
                          
              
            </TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>



    <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
      Ver más clientes
    </Link>






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
   
 
  

  </React.Fragment>
    
  )
}

export default ListClients