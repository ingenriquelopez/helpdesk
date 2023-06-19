import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { tostada_S } from '../../../utils/Tostadas';
import { useLocalStorage } from '../../../js/useLocalStorage';

import axios from 'axios';
const {REACT_APP_API} = process.env;

export default function EditFormOS( {myTitle,myData,lgShow, handleLgClose, handleLgUpdate}) {
    const navigate = useNavigate();
  
    const [newStatus,  setNewStatus]  = useState('');
    const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');
  
  const saveNewStatus = async()=> {
       //creamos el registro que se enviara por body al endpoint de classRoom Router
       const dataOfNewState= {
          number        : myData.numberTask,
          orderService  : myData.number,
       }
       try {
          const response = await axios.put(`${REACT_APP_API}/task/status`,dataOfNewState, {
            headers: {
                "authorization": `Bearer ${userLogged.userToken}`,
            }
            }
          );
          if (response) {
            tostada_S('Service DONE!',"top-center",1500,'light');
          }
          
          setTimeout( ()=> { navigate('/dashboard/', { replace: true })},1500)  
       } catch (error) {
          console.log(error.message);
       }
  }


  const handleUpdateStatus = async()=> {
    const dataToChange = {
      number      : myData.number,
      numberTask  : myData.numberTask,
      serviceReq  : myData.serviceReq,
      dateDone    : myData.dateDone,
      serviceStatus: myData.serviceStatus,
    }
    
    //validar primero si efectivamente hay un cambio en el estado
    if (newStatus && myData.serviceStatus !== newStatus) {
      //si cambio el estado procedemos a actualziar en el back
      dataToChange.serviceStatus = newStatus;
      
      if (newStatus === 'Canceled') dataToChange.dateCancel = new Date();
      if (newStatus === 'Done')     dataToChange.dateDone   = new Date();
      if (newStatus === 'Required') {
        dataToChange.dateDone   = null;
        dataToChange.dateCancel   = null;
      }
      
      try {
        const response = await axios.put(`${REACT_APP_API}/services`,dataToChange)  
        if (response) {
          try {
            await saveNewStatus();
          } catch (error) {
            console.log(error.message)
          }
                  
        }
      } catch (error) {
        console.log(error.message);
      }
      
      
    }
  }

  return (
    <Modal show = {lgShow} onHide = {handleLgClose} centered>
      <Modal.Header closeButton>
         <Modal.Title>{ myTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
       <Form>
        <Row>
          <Col>
            <Form.Group className = "mb-3 w-25 mx-auto">
                <Row> <Form.Label className="text-center">Order</Form.Label>  </Row>
                <Form.Control 
                    type         = "text" 
                    name         = "number" 
                    value        = { myData.number }
                    disabled
                    className    = "text-center bg-primary fs-5 text-white"
                />
              </Form.Group>
          </Col>   
          <Col>
            <Form.Group className="mb-3 w-25 mx-auto">
                <Row> <Form.Label className="text-center">#Task</Form.Label></Row>
                <Form.Control 
                    type         = "text" 
                    name         = "numberTask" 
                    value        = {myData.numberTask}
                    disabled
                    className    = "text-center"
                />
            </Form.Group>
          </Col>        
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3 w-60 mx-auto" >
              <Row> <Form.Label className="text-center">Current State</Form.Label></Row>
              <Form.Control 
                    type         = "text" 
                    name         = "serviceStatus" 
                    value        = {myData.serviceStatus}
                    disabled
                />
              </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className = "mb-3 w-60 mx-auto">
                <Row> <Form.Label className = "text-center">Required Service</Form.Label> </Row>
                <Form.Control as="textarea" rows={3} 
                      type         = "textarea" 
                      name         = "serviceReq" 
                      value        = {myData.serviceReq}
                      disabled
                />
              </Form.Group>
           </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3 w-60 mx-auto" >
                    <Row> <Form.Label className="mb-3 text-center">New Status</Form.Label></Row>
                    <Form.Select 
                        value = { newStatus }
                        onChange = { (ev)=> setNewStatus(ev.target.value)}
                    >
                          <option value = ''>Choose...</option>
                          <option value = 'Required'>Required</option>
                          <option value = 'Done'>Done</option>
                      </Form.Select>
                </Form.Group>
            </Col>
        </Row>
       </Form> 
      </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick = {handleLgClose}>
        Close
      </Button>
      <Button 
          variant  = "primary" 
          disabled = { newStatus === '' ? true: false }
          onClick   = { ()=> handleUpdateStatus() }
      >
        Update
      </Button>
    </Modal.Footer>
  </Modal>
  )
}