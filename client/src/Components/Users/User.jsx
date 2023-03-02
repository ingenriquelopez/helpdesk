import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate  }     from 'react-router-dom';

import { FcCancel } from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import Confirmation from '../Alerts/Confirmation/Confirmation';
import Annoument from '../Alerts/Annoument/Annoument';
import { tostada_S } from '../../utils/Tostadas';
import EditFormUser from './EditFormUser/EditFormUser';
import axios from 'axios';
const {REACT_APP_API} = process.env;

export default function User( {u}) {
  const [show, setShow]     = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  
  let myData = {
    userName  : u.userName,
    email     : u.email,
    password  : u.password,
    typeUser  : u.typeUser,
    level     : u.level
  }

  async function handleClickDelete() { 
    //primero lo eliminamos de la base de datos
    try {
      const response = await axios.delete(`${REACT_APP_API}/user/${u.email}`);
      if (response.status === 200) {
        if (response.data === 'UserDeleted') {
          return true
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDelete = (e) => {
    e.preventDefault();
    handleClickDelete();
    tostada_S('User Deleted!',"top-center",2000,'dark');
    setTimeout( ()=> { window.location.replace('/dashboard/viewerusers')},2000)   
    
  }

  const handleClose = () => {
    setShow(false);
    window.location.replace('/dashboard/viewerusers');
  }

  const handleSmClose =() => {
    setSmShow(false);
  }
  const handleLgClose =()=> {
    setLgShow(false);
  }
  const handleLgUpdate = ()=> {
    setLgShow(false);
    window.location.replace('/dashboard/viewerusers');
   
  }

  const handleShow           = () => setShow(true);
  const handleShowEdit       = () => setLgShow(true);   
  
  return (    
    <>
    <tr>
        <td className = "text-center fs-6"> {u.userName}</td>
        <td className = "text-center"> {u.email}</td>
        <td className = "text-center"> {u.typeUser}</td>
        <td className = "text-center"> {u.level}</td>
        
        <td className = "text-center"> 
          <Button variant   = "light" 
                  className = 'btn-sm'
                  style     = {{backgroundColor:"transparent"}}
                  onClick   = {handleShow}
                  
          >
               <FcCancel/> 
          </Button>
        </td>
        
        <td className = "text-center">  
          <Button variant    = "light" 
                  className  = 'btn-sm'
                  style      = {{backgroundColor:"transparent"}}
                  onClick    = { (e)=> handleShowEdit(e)}
          >
            <BiEditAlt/>
          </Button>
        </td>
    </tr>
    <Confirmation titulo        = "Warning!"     
                  mensaje       = "Do you want Delete this User?"   
                  textBtn       = 'Delete'
                  show          = {show}    
                  handleDelete  =  { handleDelete } 
                  handleClose   = { handleClose } u= {u}
    />
    <Annoument    titulo        = "Annoument"    
                  mensaje       = "User deleted susscesfull ✅ "  
                  smShow        = {smShow}  
                  handleSmClose = { handleSmClose }
    />

    <EditFormUser myTitle        = "Edit User"    
                  myData         = {myData}                        
                  lgShow         = {lgShow}  
                  handleLgUpdate = {handleLgUpdate} 
                  handleLgClose  = { handleLgClose } 
    />
    </>
    
  )
}