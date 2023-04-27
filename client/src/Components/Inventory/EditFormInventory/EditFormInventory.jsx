import React, { useState, useEffect} from 'react'
import { useNavigate  }     from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { Container } from 'react-bootstrap';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W } from '../../../utils/Tostadas';

import axios from 'axios';
const {REACT_APP_API} = process.env;

export default function EditFormInventory( {myTitle,myData,lgShow, handleLgClose, handleLgUpdate}) {

  const dispatch = useDispatch();
  const navigate= useNavigate();
  
  const [newTrade      , setNewTrade]       = useState(myData.trade);
  const [newModel      , setNewModel]       = useState(myData.model);
  const [newColor      , setNewColor]       = useState(myData.color);
  const [newUserDevice , setNewUserDevice]  = useState(myData.userDevice);
  const [newDocRes     , setNewDocRes]      = useState(myData.docRes);
  const [newNote       , setNewNote]        = useState(myData.note);

  const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');
  
  
  async function handleUpdate(e) {
    e.preventDefault();
    const dataToChange = {
      internalCode  : myData.internalCode,
      serial        : myData.serial,
      trade         : newTrade,
      model         : newModel,
      color         : newColor,
      userDevice    : newUserDevice,
      docRes        : newDocRes,
      note          : newNote,
    }
    
    try {
      const response = await axios.put(`${REACT_APP_API}/inventory`,dataToChange, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
      }
      );

      if (response) {
        if (response.data.message==='El token NO es valido!') {
          navigate('/login' );    
          tostada_W(response.data.message,"top-center",1500,'dark');
          return
        }
      }
      handleLgUpdate();
    } catch(error) {
      console.log(error.message);
    }   
  }

  
  function handleNote(e) {
    setNewNote(e.target.value.toUpperCase());
  }

  const clearForm = () => {
    setNewTrade(myData.trade);
    setNewModel(myData.model);
    setNewColor(myData.color);
    setNewUserDevice(myData.userDevice);
    setNewDocRes(myData.docRes);
    setNewNote(myData.note);
      
    handleLgClose();
  }

  useEffect( ()=> {
    setNewTrade(myData.trade);
    setNewModel(myData.model);
    setNewColor(myData.color);
    setNewUserDevice(myData.userDevice);
    setNewDocRes(myData.docRes);
    setNewNote(myData.note);
  },[myData])
  
  return (
    <Modal show = {lgShow} onHide = {handleLgClose} centered>
      <Modal.Header closeButton>
         <Modal.Title>{ myTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container className = "container-fluid py-1">
       <Form>
            <Row className = "d-grid- d-md-flex justify-content-center mb-5 ">
                <button type="button" className="btn btn-dark">{myData.internalCode}</button>    
            </Row>
            <Row className = "d-grid- d-md-flex justify-content-between">
                <Col xxl = {4} md = {3} className = "text-center">
                    <Form.Group className="mb-3 mx-auto" >
                        <Form.Label >Trade</Form.Label>
                        <Form.Control
                            value = {newTrade} 
                            onChange = { (e)=> setNewTrade(e.target.value.toUpperCase()) }
                            className = "md-1"
                            />
                    </Form.Group>
                </Col>
        
                <Col xxl = {4} md ={2} className = "text-center">
                    <Form.Group className="mb-3 mx-auto">
                        <Form.Label>Model</Form.Label>
                        <Form.Control 
                            type         = "text" 
                            name         = "model" 
                            value        = {newModel}
                            onChange     = { (e)=> setNewModel(e.target.value.toUpperCase())} 
                        />
                    </Form.Group>
                </Col >    

                <Col md = {4} className = "text-center">
                    <Form.Group className   = "mb-3 mx-auto ">             
                        <Form.Label className = "text-center">Color</Form.Label>
                        <Form.Control 
                            type  = "text"                       
                            name  = "color"                      
                            value = {newColor}
                            onChange = { (e) =>   setNewColor(e.target.value.toUpperCase()) }       
                        />
                    </Form.Group> 
                </Col>
            </Row>

            <Row className = "justify-content-between">
                <Col md = {5} className = "text-center">
                    <Form.Group className="mb-3 mx-auto" >
                        <Form.Label>Device's User</Form.Label>
                        <Form.Control 
                            type     = "text" 
                            name     = "userDevice"
                            value    = {newUserDevice}
                            onChange = { (e) =>   setNewUserDevice(e.target.value.toUpperCase()) } 
                        />
                    </Form.Group>
                </Col>

                <Col md = {5} className = "text-center">
                    <Form.Group className="mb-3 mx-auto" >
                        <Form.Label>Document Resp.</Form.Label>
                        <Form.Control 
                            type     = "text" 
                            name     = "docRes"
                            value    = {newDocRes}
                            onChange = { (e) =>   setNewDocRes(e.target.value.toUpperCase()) } 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md className = "text-center">
                    <Form.Group className="mb-3 mx-auto" >
                        <Form.Label className="mb-3">Note</Form.Label>
                        <Form.Control 
                                as       = "textarea"  
                                name     = "note" 
                                value    = {newNote}
                                onChange = {(e) => handleNote(e)} 
                        />
                        </Form.Group>
                </Col>
            </Row>
       </Form> 
      </Container>
      </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick = {clearForm}>
        Close
      </Button>
      <Button variant="primary" onClick = {handleUpdate}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
  )
}