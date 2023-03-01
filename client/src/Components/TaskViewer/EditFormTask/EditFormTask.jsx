import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { updateTask } from '../../../redux/tasks/tasksReducer';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { Container } from 'react-bootstrap';

import axios from 'axios';
const {REACT_APP_API} = process.env;

export default function EditFormTask( {myTitle,myData,lgShow, handleLgClose, handleLgUpdate}) {
  const { listCR:listOfClassRooms }  = useSelector ( (state) => state.classRooms);
  const dispatch = useDispatch();
  
  const [newClassRoom,setNewClassRoom] = useState(myData.classRoom);
  const [newGyg, setNewGyg]            = useState(myData.gyg);
  const [newLevel, setNewLevel]        = useState(myData.level);
  const [newTeacher, setNewTeacher]    = useState(myData.teacher);
  const [newDevice,setNewDevice]       = useState(myData.device);
  const [newProblem, setNewProblem]    = useState(myData.problem);
  

  async function handleUpdate() {
    const dataToChange = {
      id        : myData.id,
      number    : myData.number,
      classRoom : newClassRoom,
      gyg       : newGyg,
      teacher   : newTeacher,
      device    : newDevice,
      problem   : newProblem,
    }
    
    try {
     
      const response = await axios.put(`${REACT_APP_API}/task`,dataToChange);
      if (response) {
        try {
          dispatch(updateTask(dataToChange));  
        } catch (error) {
          console.log(error.message);
        }
      }
      handleLgUpdate();
    } catch(error) {
      console.log(error.message);
    }   
  }

  function handleClassRoom(e) {  
    let ncr = e.target.value;

    if (ncr!=='none' && ncr) {
        let listClassRooms = listOfClassRooms.find( (element)=> element.classRoom === ncr);
        setNewClassRoom(listClassRooms.classRoom);
        setNewGyg(listClassRooms.gyg);
        setNewLevel(listClassRooms.level);
    } else {
     setNewLevel('');
     setNewGyg('');
    }
  }
  return (
    <Modal show = {lgShow} onHide = {handleLgClose} centered>
      <Modal.Header closeButton>
         <Modal.Title>{ myTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container className = "container-fluid py-5">
       <Form>
        <Row className = "d-grid- d-md-flex justify-content-between">
        <Col md = {3} className = "text-center">
            <Form.Group className="mb-3 mx-auto" >
            <Form.Label >ClassRoom</Form.Label>
                <Form.Select 
                  options = {listOfClassRooms} 
                  value = {newClassRoom}
                  onChange = { (e)=> handleClassRoom(e) }
                  className = "md-1"
                >
                {listOfClassRooms.map( (elemento)=> ( <option key={elemento.classRoom} value = {elemento.classRoom}>{elemento.classRoom}</option>))}
                </Form.Select>
            
            </Form.Group>
          </Col>
        
          <Col md ={2} className = "text-center">
            <Form.Group className="mb-3 mx-auto">
              <Form.Label>GyG</Form.Label>
              <Form.Control 
                type         = "text" 
                name         = "gyg" 
                value        = {newGyg}
                disabled
                onChange     = { ev=> setNewGyg(ev.target.value)} 
              />
            </Form.Group>
          </Col >    
          <Col md = {4} className = "text-center">
            <Form.Group className   = "mb-3 mx-auto ">             
              <Form.Label className = "text-center">Level</Form.Label>
              <Form.Control 
                type  = "text"                       
                name  = "level"                      
                value = {newLevel}
                disabled
              />
            </Form.Group> 
          </Col>
        </Row>
        <Row className = "justify-content-between">
          <Col md = {5} className = "text-center">
            <Form.Group className="mb-3 mx-auto" >
              <Form.Label>Teacher</Form.Label>
              <Form.Control 
                  type = "text" 
                  name = "teacher"
                  value = {newTeacher}
                  onChange={ev =>   setNewTeacher(ev.target.value)} 
              />
            </Form.Group>
          </Col>
          <Col md = {5} className = "text-center">
            <Form.Group className = "mb-3 mx-auto">
              <Form.Label>Device</Form.Label>
              <Form.Select 
                  value        = {newDevice}
                  onChange ={ev => setNewDevice(ev.target.value)}>
                    <option>Choose...</option>
                    <option>Computer</option>
                    <option>Laptop</option>
                    <option>Printer</option>
                    <option>VideoProyector</option>
                    <option>Speakers</option>
                    <option>Camera</option>
                    <option>Other...</option>
              </Form.Select>
            </Form.Group>
           </Col>
        </Row>
        <Row>
          <Col md className = "text-center">
            <Form.Group className="mb-3 mx-auto" >
              <Form.Label className="mb-3">Problem</Form.Label>
              <Form.Control 
                    as           = "textarea"  
                    name         = "problem" 
                    value        = {newProblem}
                    onChange     = {ev => setNewProblem(ev.target.value)} 
              />
            </Form.Group>
          </Col>
        </Row>
       </Form> 
      </Container>
      </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick = {handleLgClose}>
        Close
      </Button>
      <Button variant="primary" onClick = {handleUpdate}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
  )
}