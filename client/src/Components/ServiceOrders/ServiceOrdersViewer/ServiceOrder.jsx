import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FcCancel }  from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import Confirmation  from '../../Alerts/Confirmation/Confirmation';
import Annoument     from '../../Alerts/Annoument/Annoument';
import EditFormOS from '../EditFormOS/EditFormOS';
import axios from 'axios';
import { tostada_S } from '../../../utils/Tostadas';
import moment from 'moment';
import { useLocalStorage } from '../../../js/useLocalStorage';


const {REACT_APP_API} = process.env;


export default function ServiceOrder( {c}) {

  const [show, setShow]     = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');

   
  let myData = {
    number        : c.number,
    document      : c.document,
    date          : moment(c.date).format('dddd DD/MMMM/YYYY'),
    serviceStatus : c.serviceStatus,
    numberTask    : c.numberTask,
    dateDone      : c.dateDone,
    serviceReq    : c.serviceReq,
  }


  const updateTaskRequired = async()=> {
    const dataToSend = {
      number: c.numberTask,
      orderService: '',
    }
    try {
      const response = await axios.put(`${REACT_APP_API}/task/status/`,dataToSend, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
        });
      if (response.status ===200) {
        return true;
      }
      
    } catch (error) {
      console.log(error.message)
    }
    return false;
  }

   async function handleClickCancel() { 
     try 
       {
        c.serviceStatus = "Canceled";
        c.dateCancel    = new Date();
        c.dateDone = null;
          //lo actualizamos en la base de datos
          const response = await axios.put(`${REACT_APP_API}/services/`,c, {
            headers: {
                "authorization": `Bearer ${userLogged.userToken}`,
            }
            }
          );
          if (response.status === 200) {
             if (response.data === 'Update-Successful') {
                if (updateTaskRequired(c.numberTask)) {
                  setShow(false);
                  tostada_S('Service Order Canceled!',"top-center",1000,'colored');
                  setTimeout( ()=> { navigate('/dashboard/serviceorders', { replace: true })},1000)              
                };
             }
          }
        } catch (error) {
           console.log(error.message);
          }
    } 
    

   const completeTask =async(nt)=> {
    const response = await axios.get(`${REACT_APP_API}/task/status/${nt}`, {
      headers: {
          "authorization": `Bearer ${userLogged.userToken}`,
      }
      });
    if (response.data.statusTask === 'Completed')  return true
    else  return false;
  } 

  const handleClose = () => {
    setShow(false);
  }

  const handleCancel =async()=> {
    if (!(await completeTask(myData.number))) {     
      if (c.serviceStatus==='Required') handleClickCancel();  
    }    
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
          <td className = {`text-center fs-6 ${c.serviceStatus === "Canceled" ? "text-decoration-line-through": '' }`}> {c.number}</td>
          <td className = {`text-center fs-6 ${c.serviceStatus === "Canceled" ? "text-decoration-line-through": '' }`}> {c.document}</td>
          <td className = {`text-center fs-6 ${c.serviceStatus === "Canceled" ? "text-decoration-line-through ": '' }` }> {moment(c.date).format('dddd DD/MMMM/YYYY')}</td>          
          <td className = "text-center fs-6" > {c.serviceStatus}
                                           {c.serviceStatus === "Done" ? '✅' : null} 
                                           {c.serviceStatus === "Required" ? '🔵' : null}
                                           {c.serviceStatus === "Canceled" ? '❌' : null}
          </td> 
         
          <td className = "text-center fs-6"  style = {{color: c.serviceStatus === "Canceled" ? 'red': 'black' }}> { c.dateDone && moment(c.dateDone).format('dddd DD/MMMM/YYYY')}</td>
          <td className = "text-center fs-6"> {c.numberTask}</td>
          <td className = "text-center fs-6"> 
          {c.serviceStatus !=='Canceled' 
            ? 
              <Button 
                  variant = "light" 
                  className = 'btn-sm'
                  style = {{backgroundColor:"transparent"}}
                  disabled = {c.serviceStatus==='Done' ? true: false}
                  onClick = {handleShow} 
              >
                <FcCancel/>
              </Button>
            : null
          }
          </td>
          
          <td  className = "text-center fs-6"> 
            <Button 
            className = 'btn-sm'
                  variant = "light" 
                  style = {{backgroundColor:"transparent"}}
                  onClick = { (e)=> handleShowEdit(e)}
            >
              <BiEditAlt/>
            </Button>
          </td>
      </tr>
      <Confirmation       titulo        = "Warning!"      
                          mensaje       = "Do you want Delete this Service Order?"   
                          textBtn       = "Delete"
                          show          = { show }    
                          handleClose   = { handleClose } 
                          handleDelete  = { handleCancel }
      />
      <EditFormOS  myTitle  = "Service Orders Done" 
                   myData   = {myData} 
                   lgShow   = {lgShow}   
                   handleLgClose  = { handleLgClose } 
                   handleLgUpdate = {handleLgUpdate}
      /> 

      <Annoument   titulo          = "Annoument"     
                    mensaje        = " Cancel susscesfull ✅ " 
                    smShow         = {smShow}  
                    handleSmClose  = { handleSmClose }
      /> 
    </>
  )
}