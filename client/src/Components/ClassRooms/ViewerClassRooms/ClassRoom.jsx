import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteClassRoom } from '../../../redux/classRooms/classRoomsReducer';
import Button from 'react-bootstrap/Button';
import { tostada_W } from '../../../utils/Tostadas';

import { FcCancel } from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import Confirmation from '../../Alerts/Confirmation/Confirmation';
import Annoument    from '../../Alerts/Annoument/Annoument';
import EditFormClassRoom from '../EditClassRoom/EditClassRoom';
import { useLocalStorage } from '../../../js/useLocalStorage';
import axios from 'axios';
const {REACT_APP_API} = process.env;

export default function ClassRoom( {c}) {
  const [show, setShow]     = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let myData = {
    classRoom : c.classRoom,
    gyg       : c.gyg,
    level     : c.level,
    campus    : c.campus,
    floor     : c.floor,
  }

  async function handleClickDelete() { 
    //primero lo eliminamos de la base de datos
    
    try {
      const response = await axios.delete(`${REACT_APP_API}/classRoom/${c.classRoom}`, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
      });

      if (response.data.message==='El token NO es valido!') {
        navigate('/login' );    
        tostada_W(response.data.message,"top-center",1500,'dark');
        return false
    } 

      if (response.status === 200) {
        if (response.data === 'ClassRoomDeleted') {
          //lo quitaremos del store
          dispatch(deleteClassRoom(c.classRoom));
          
          setShow(false);
          navigate('/dashboard/viewerClassRooms', { replace: true });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClose = () => {
    setShow(false);
  }
  const handleDelete = ()=> {
    handleClickDelete();
    setShow(false)
    
  }

  const handleSmClose =() => {
    setSmShow(false);
  }
  const handleLgClose =()=> {
    setLgShow(false);
  }
  const handleLgUpdate = ()=> {
    setLgShow(false);
  }

  const handleShow           = () => setShow(true);
  const handleShowEdit       = () => setLgShow(true);   
  
  return (    
    <>
    <tr>
        <td className = "text-center"> {c.classRoom}</td>
        <td className = "text-center"> {c.gyg}</td>
        <td className = "text-center"> {c.level}</td>
        <td className = "text-center"> {c.campus}</td>
        <td className = "text-center"> {c.floor}</td>
        <td> 
          <Button 
              variant    = "light" 
              className  = 'btn-sm'
              style      = {{backgroundColor:"transparent"}}
              onClick    = {handleShow}
          >
               <FcCancel/> 
          </Button>
        </td>
        
        <td> 
          <Button variant    = "light" 
                  className  = 'btn-sm'
                  style      = {{backgroundColor:"transparent"}}
                  onClick    = { (e)=> handleShowEdit(e)}
          >
            <BiEditAlt/>
          </Button>
        </td>
    </tr>
    <Confirmation  titulo       = "Warning!"      
                   mensaje      = "Do you want Delete this ClassRoom?"   
                   textBtn      = "Delete"
                   show         = {show}    
                   handleClose  = { handleClose } 
                   handleDelete = { handleDelete }
    />
    <Annoument          titulo   = "Annoument"     mensaje = "ClassRoom deleted susscesfull ✅ " smShow = {smShow}  handleSmClose   = { handleSmClose }/> 
    <EditFormClassRoom  myTitle  = "Edit ClassRoom" myData  = {myData}                          lgShow = {lgShow}   handleLgClose  = { handleLgClose } handleLgUpdate = {handleLgUpdate}/> 
    </>
  )
}
