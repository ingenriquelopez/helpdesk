import React, { useState }  from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { useNavigate }     from 'react-router-dom';
import { addNewClassRoom  } from '../../../redux/classRooms/classRoomsReducer';
import { createListClassRooms } from '../../../redux/classRooms/classRoomsReducer';

import  './NewClassRoom.css';

import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import axios from 'axios';
import moment from 'moment';
import { useEffect } from 'react';
const {REACT_APP_API} = process.env;


moment.locale('us');


export default function NewClassRoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { listCT:listOfClassRooms }  = useSelector ( (state) => state.classRooms);
        
    const [txtclassRoom   , setTxtClassRoom] = useState('');
    const [txtgyg         , setTxtGyg]       = useState('');
    const [txtlevel       , setTxtLevel]     = useState('');
    const [txtcampus      , setTxtCampus]    = useState('');
    const [txtfloor       , setTxtFloor]     = useState('');
   
    
    const  add_New_ClassRoom = async(what)=> {
        try 
          {
            const response = await axios.post(`${REACT_APP_API}/classRoom`,what);
            return response;
            } catch (error) {
                console.log(error.message);
            }
          }
    
    async function sendFormClassRoom() {
        const classRoom_tmp = {
            classRoom  : txtclassRoom,
            gyg        : txtgyg,
            level      : txtlevel,
            campus     : txtcampus,
            floor      : txtfloor,
        }
        
        try { 
           if (add_New_ClassRoom(classRoom_tmp) ) { 
            dispatch(addNewClassRoom(classRoom_tmp));
          }

          //navigate('/dashboard/viewerclassrooms',{ replace:true});  

          window.location.replace('/dashboard/viewerclassrooms');
        } catch (error) {
          console.log(error);
        }  
      }
      
      function handleClassRoom(e) {       
        setTxtClassRoom(e.target.value)            
      }

      function handlegyg(e) {
        setTxtGyg(e.target.value);
      }

      function handlelevel(e) {
        setTxtLevel(e.target.value);
      }

      function handlecampus(e) {
        setTxtCampus(e.target.value);
      }

      function handlefloor(e) {
        setTxtFloor(e.target.value);
      }

    function handleSubmitForm(e) {
        e.preventDefault();
        sendFormClassRoom();
    }

    const handleExit= ()=> {
        navigate('/dashboard/viewerclassrooms')
    }
useEffect(() => {
    dispatch(createListClassRooms());
},[])


  return (
    <Container className = "container-fluid py-2">      
         <Row  className = "text-center">
            <h5> ADD NEW CLASSROOM</h5>
        </Row>
        <Row className = "mb-4">
            <div id = "imagenCR"> </div>
        </Row>
            <Form onSubmit={(e) => handleSubmitForm(e)}>
                <Row className = "mx-auto">
                    <Col>
                        <Form.Group className="mb-3 mx-auto">
                            <Row> <Form.Label className="text-center">ClassRoom</Form.Label>  </Row>
                            <Form.Control options = {listOfClassRooms} 
                                type     = 'text'
                                name     = 'classroom'
                                value    = {txtclassRoom}
                                className = "col-2 mx-auto"                          
                                onChange = { (e)=> handleClassRoom(e) }>   
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <div className  = "row d-grid ">
				    <div className = "col d-md-flex justify-content-md-center gap-3">
                        <Form.Group className = "col-2">
                        <Row> <Form.Label className="text-center">GYG</Form.Label>  </Row>
                            <Form.Control
                                type      = "text" 
                                name      = "gyg" 
                                value     = {txtgyg}
                                onChange  =  {(e)=> handlegyg(e)}
                            /> 
                        </Form.Group> 
                        <Form.Group className ="col-2">
                                <Row> <Form.Label className="text-center">Level</Form.Label>  </Row>
                            <Form.Select 
                                defaultValue="Choose Level..." 
                                onChange ={ (e)=> handlelevel(e)}
                            >
                                <option>Choose...</option>
                                <option>PreSchool</option>
                                <option>Elementary</option>
                                <option>HighSchool</option>
                                <option>College</option>
                                <option>Global</option>
                            </Form.Select>
                        </Form.Group> 
				</div>
			</div>
                <Row className = "d-grid gap-2 mx-0">
                    <Col>
                    <Form.Group className="mb-3">
                            <Row> <Form.Label className="text-center">Campus</Form.Label> </Row>
                            <Form.Select 
                                defaultValue="Choose Campus..." 
                                onChange ={ (e)=> handlecampus(e)}
                                className = "w-25 mx-auto"

                            >
                                <option>Choose...</option>
                                <option>Francita</option>
                                <option>Poza Rica</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-2 mt-0 mx-auto">
                            <Row> <Form.Label className="text-center">Floor</Form.Label> </Row>
                            <Form.Select 
                                defaultValue = "Choose Floor..." 
                                onChange ={ (e)=> handlefloor(e)}
                                className = "w-25 mx-auto"
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
                
               
                <Row className = "d-grid">
                    <Form.Group className = "mt-3 mx-auto">
                        <Col className = "col d-md-flex justify-content-center gap-3" >
                            <Button className = "customButton" variant = "danger" onClick={handleExit}>Cancel</Button>
                            <Button className = "customButton" type ="submit" variant = "success">Add</Button>
                        </Col>
                        </Form.Group>            
                </Row>
                    
                

            </Form>
    </Container>

  )
};