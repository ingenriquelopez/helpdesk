import React, { useState } from 'react'
import { useNavigate  }     from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { updateCR } from '../../../redux/classRooms/classRoomsReducer';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { tostada_W } from '../../../utils/Tostadas';

import axios from 'axios';
const {REACT_APP_API} = process.env;

export default function EditFormClassRoom( {myTitle,myData,lgShow, handleLgClose, handleLgUpdate}) {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  
  const [newGyg,    setNewGyg]    = useState(myData.gyg);
  const [newLevel,  setNewLevel]  = useState(myData.level);
  const [newCampus, setNewCampus] = useState(myData.campus);
  const [newFloor,  setNewFloor]  = useState(myData.floor);

  const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');
  
  
  async function handleUpdate() {
    const dataToChange = {
      classRoom : myData.classRoom,
      gyg       : newGyg,
      level     : newLevel,
      campus    : newCampus,
      floor     : newFloor,
    }
    
    try {
      const response = await axios.put(`${REACT_APP_API}/classRoom`,dataToChange, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
      });

      if (response) 
        {
          if (response.data.message==='El token NO es valido!') {
            navigate('/login' );    
            tostada_W(response.data.message,"top-center",1500,'dark');
            return false
         } 
 
         try {
           dispatch(updateCR(dataToChange));  
         } catch (error) {
           console.log(error.message);
           }
       
       handleLgUpdate();
        }
        
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
     
       <Form>
        <Row>
          <Col>
            <Form.Group className = "mb-3 w-25 mx-auto">
                <Row> <Form.Label className="text-center">ClassRoom</Form.Label>  </Row>
                <Form.Control 
                    type         = "text" 
                    name         = "name" 
                    value        = {myData.classRoom}
                    disabled
                    
                />
              </Form.Group>
          </Col>   
          <Col>
            <Form.Group className="mb-3 w-25 mx-auto">
                <Row> <Form.Label className="text-center">GYG</Form.Label></Row>
                <Form.Control 
                    type         = "text" 
                    name         = "gyg" 
                    value        = {newGyg}
                    onChange     = { ev=> setNewGyg(ev.target.value)} 
                />
            </Form.Group>
          </Col>        
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3 w-60 mx-auto" >
              <Row> <Form.Label className="text-center">Level</Form.Label></Row>
              <Form.Select value = { newLevel } onChange ={ (ev)=> setNewLevel(ev.target.value)}>
                                <option>PreSchool</option>
                                <option>Elementary</option>
                                <option>HighSchool</option>
                                <option>College</option>
                            </Form.Select>
              </Form.Group>
          </Col>
          <Col>
            <Form.Group className = "mb-3 w-60 mx-auto">
                <Row> <Form.Label className = "text-center">Campus</Form.Label> </Row>
                <Form.Select 
                  value = {newCampus} 
                  onChange ={ (ev)=> setNewCampus(ev.target.value)}
                >
                    <option>Francita</option>
                    <option>Poza Rica</option>
                </Form.Select>
            </Form.Group>
           </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3 w-60 mx-auto" >
                    <Row> <Form.Label className="mb-3 text-center">Floor</Form.Label></Row>
                    <Form.Select 
                        value = { newFloor }
                        onChange = { (ev)=> setNewFloor(ev.target.value)}
                    >
                          <option>Choose...</option>
                          <option>Parking lot</option>
                          <option>Floor 1</option>
                          <option>Floor 2</option>
                          <option>Floor 3</option>
                          <option>Floor 4</option>
                          <option>Floor 5</option>
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
      <Button variant="primary" onClick = {handleUpdate}>
        Update
      </Button>
    </Modal.Footer>
  </Modal>
  )
}