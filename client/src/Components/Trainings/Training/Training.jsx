import React, { useState } from 'react'
import { useNavigate  }     from 'react-router-dom';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W, tostada_S } from '../../../utils/Tostadas';
import Confirmation  from '../../Alerts/Confirmation/Confirmation';
import Annoument     from '../../Alerts/Annoument/Annoument';
/* import EditFormUser  from './EditFormUser/EditFormUser'; */


import Button        from 'react-bootstrap/Button';
import { FcCancel }  from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import axios         from 'axios';

const {REACT_APP_API} = process.env;

function Training( {u}) {
    const [show, setShow]     = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
  
    const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');
    const navigate= useNavigate();

    let myData = {
        id           : u.id,
        training     : u.training,
        speaker      : u.speaker,
        level        : u.level,
        dateTraining : u.dateTraining,
        mode         : u.mode
      }

      async function handleClickDelete() { 
        //primero lo eliminamos de la base de datos
        try {
          const response = await axios.delete(`${REACT_APP_API}/training/${u.id}`,{
            headers: {
                "authorization": `Bearer ${userLogged.userToken}`,
            }
          });
    
          if (response) {
            if (response.data.message==='El token NO es valido!') {
               navigate('/login' );    
               tostada_W(response.data.message,"top-center",1500,'dark');
               return false
            } else {
                // aviso de la mision fue un exito
                if (response.data === 'TrainingDeleted')  return true
              } 
          }
        } catch (error) {
            console.log(error.message);
          }
      }
    
      const handleDelete = (e) => {
        e.preventDefault();
        handleClickDelete();
        tostada_S('Training Deleted!',"top-center",2000,'dark');
        setTimeout( ()=> { window.location.replace('/trainings/viewertrainings')},2000)   
      }
    
      const handleClose = () => {
        setShow(false);
        window.location.replace('/trainings/viewertrainings');
      }
    
      const handleSmClose =() => {
        setSmShow(false);
      }
      const handleLgClose =()=> {
        setLgShow(false);
      }

      const handleShow           = () => setShow(true);
      const handleShowEdit       = () => setLgShow(true);  

  return (
    <>
    <tr>
        <td className = "text-center fs-6"> {u.id}</td>
        <td className = "text-center"> {u.training}</td>
        <td className = "text-center"> {u.speaker}</td>
        <td className = "text-center"> {u.level}</td>
        <td className = "text-center"> {u.dateTraining}</td>
        <td className = "text-center"> {u.mode}</td>
        
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
                  mensaje       = "Do you want Delete this Training?"   
                  textBtn       = 'Delete'
                  show          = {show}    
                  handleDelete  =  { handleDelete } 
                  handleClose   = { handleClose } u= {u}
    />
    <Annoument    titulo        = "Annoument"    
                  mensaje       = "Training deleted susscesfull ✅ "  
                  smShow        = {smShow}  
                  handleSmClose = { handleSmClose }
    />

    {/* <EditFormUser myTitle        = "Edit Training"    
                  myData         = {myData}                        
                  lgShow         = {lgShow}  
                  handleLgUpdate = {handleLgUpdate} 
                  handleLgClose  = { handleLgClose } 
    /> */}
    </>
  )
}

export default Training