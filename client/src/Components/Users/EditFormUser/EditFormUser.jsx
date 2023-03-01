import React, { useState } from 'react'
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'

import axios from 'axios';
import { updateTask } from '../../../redux/tasks/tasksReducer';
const {REACT_APP_API} = process.env;

export default function EditFormUser( {myTitle,myData,lgShow, handleLgClose, handleLgUpdate}) {
  
  const [newUserName,setNewUserName]   = useState(myData.userName);
  const [newPassword, setNewPassword]  = useState(myData.password);
  const [newTypeUser,setNewTypeUser]   = useState(myData.typeUser);
  const [newLevel, setNewLevel]        = useState(myData.level);

  async function handleUpdateUser(e) {
    e.preventDefault();
    const dataToChange = {
      userName  : newUserName,
      email     : myData.email,
      password  : newPassword,
      typeUser  : newTypeUser,
      level     : newLevel
    }
    try {
        const response = await axios.put(`${REACT_APP_API}/user`,dataToChange);
        if (response) {
          updateTask(dataToChange)
        }
        handleLgUpdate();
    } catch(error) {
        console.log(error.message);
    }   
  }


  return (
    <Modal show = {lgShow} onHide = {handleLgClose} centered>
      <Modal.Header closeButton>
         <Modal.Title>{ myTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
       <Form className=" mx-auto" onSubmit={(e) => handleUpdateUser(e)}>
            <Form.Group className = "mb-3 mx-auto" >
                <Row >
                    <Col className="text-center">
                        <Form.Label>UserName</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control type = "username" 
                                      placeholder = "Enter UserName" 
                                      value = {newUserName}
                                      onChange = {(ev) => setNewUserName(ev.target.value) }
                        />
                    </Col>
                </Row>
            </Form.Group>
         
          <Form.Group controlId="formPassword">
                <Row className = "mt-4">
                    <Col className="text-center">
                        <Form.Label>Password</Form.Label>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Control type="password" 
                                      placeholder="Password" 
                                      value = {newPassword}
                                      onChange = { (ev) => setNewPassword(ev.target.value) }
                        />
                    </Col>
                </Row>
           </Form.Group>
         
            <Form.Group>
                <Row className = "mt-4">
                    <Col className="text-center">
                      <Form.Label>Type User</Form.Label>
                    </Col>
                </Row>
                <Form.Select aria-label="Guest" value = {newTypeUser} onChange ={ev => setNewTypeUser(ev.target.value)}>
                    <option value="User">User</option>
                    <option value="User">superUser</option>
                    <option value="Admin">Admin</option>
                    <option value="superAdmin">superAdmin</option>
                </Form.Select>
             </Form.Group>

             <Form.Group>
                <Row className = "mt-4">
                    <Col className="text-center">
                      <Form.Label>Level</Form.Label>
                    </Col>
                </Row>
                <Form.Select aria-label="Level" value = {newLevel} onChange ={ev => setNewLevel(ev.target.value)}>
                    <option value = "PreSchool">PreSchool</option>
                    <option value = "Elementary">Elementary</option>
                    <option value = "HighSchool">HighSchool</option>
                    <option value = "College">College</option>
                    <option value = "Global">Global</option>
                    <option value = "Absolute">Absolute</option>
                </Form.Select>
             </Form.Group>
          
         
       </Form> 
      </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick = {handleLgClose}>
        Close
      </Button>
      <Button variant="primary" onClick = {handleUpdateUser}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
  )
}