import React, { useState } from 'react'
import { useNavigate }     from 'react-router-dom';
import { useDispatch }     from 'react-redux';
import { deleteTask }      from '../../../redux/tasks/tasksReducer';
import { useLocalStorage } from '../../../js/useLocalStorage';

import Button        from 'react-bootstrap/Button';
import { FcCancel }  from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import Confirmation  from '../../Alerts/Confirmation/Confirmation';
import Annoument     from '../../Alerts/Annoument/Annoument';
import EditFormTask  from '../EditFormTask/EditFormTask';
import moment        from 'moment';
import axios         from 'axios';

const {REACT_APP_API} = process.env;


export default function Task( {t}) {
  const [show, setShow]     = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let myData = {
    id        : t.id,
    number    : t.number,
    dateTask  : t.dateTask,    
    classRoom : t.classRoom,
    level     : t.level,
    gyg       : t.gyg,
    teacher   : t.teacher,
    device    : t.device,
    problem   : t.problem
  }

  async function handleClickDelete() { 
    //primero lo eliminamos de la base de datos
    
    try {
      const response = await axios.delete(`${REACT_APP_API}/task/${t.id}`);
      if (response.status === 200) {
        if (response.data === 'RequestDeleted') {
          //lo quitaremos del store
          dispatch(deleteTask(t.id));
          
          setShow(false);
          navigate('/home', { replace: true });
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
  const handleShowEdit       = () => {
    setLgShow(true);   
  };
  
    
  const handleResolve =()=> {
    navigate(`/homeresolve/${t.number}`);
  }

  return (    
    <>
    <tr>
        <td className = "text-center fs-6"> {moment(t.dateTask).format('ddd DD/MMM/YYYY')}</td>
        <td className = "text-center fs-6"> {moment(t.dateTask).format('LT')}</td>
        <td className = "text-center fs-6"> {t.classRoom}</td>
        <td className = "text-center fs-6"> {t.gyg}</td>
        <td className = "text-center fs-6"> {t.problem}</td>
        <td className = "text-center"> <Button className = 'btn-sm'
                     onClick = {handleResolve}
                     disabled = {userLogged.typeUser==='User' ? true: false}
                     variant = {t.statusTask ==='Completed' 
                     
                     ? 'success' 
                     : t.statusTask ==='Required' ? 'primary' 
                        : t.statusTask ==='Rejected' ? 'danger': 'warning' }
             > 
              {t.statusTask}  
            </Button>  
        </td>

        <td className = "text-center"> 
          <Button 
                className = 'btn-sm'
                disabled  = {userLogged.typeUser==='User' ? true: false}
                style     = {{backgroundColor:"transparent"}}
                variant   = "light" 
                onClick   = {handleShow}
          >
               <FcCancel/> 
          </Button>
        </td>
        
        <td> 
          <Button 
              className = "btn-sm"
              style = {{backgroundColor:"transparent"}}
              variant = "light" 
              onClick = { (e)=> handleShowEdit(e)}
          >
            <BiEditAlt/>
          </Button>
        </td>

    </tr>
    <Confirmation  
        titulo       = "Warning!"     
        mensaje      = "Do you want Delete this Request?"   
        textBtn      = "Delete"
        show         = { show }    
        handleClose  = { handleClose } 
        handleDelete = { handleDelete }
    />
    <Annoument     titulo     = "Annoument"    mensaje = "Request deleted susscesfull ✅ " smShow = {smShow}  handleSmClose   = { handleSmClose }/> 
    <EditFormTask  myTitle    = "Edit Request" myData  = {myData}    lgShow = {lgShow}             handleLgClose       = { handleLgClose }     handleLgUpdate = {handleLgUpdate}/>
    </>
    
  )
}