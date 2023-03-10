import React, { useState, useEffect }  from 'react';
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
import { tostada_S, tostada_W } from '../../../utils/Tostadas';
import axios from 'axios';
import moment from 'moment';


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
    const [disabledAdd, setdisabledAdd]      = useState(true);
    
    
    function validateForm() {
        if (!txtclassRoom) {
            setTxtGyg('');
            setTxtLevel('');
          }
        if (txtclassRoom && txtgyg ) setdisabledAdd(false)
        else setdisabledAdd(true)
      }

    function handleClassRoom(e) {    
      setTxtClassRoom(e.target.value.toUpperCase())            
      validateForm();
      
    }

    function handlegyg(e) {
      setTxtGyg(e.target.value.toUpperCase());
      validateForm();
    }

    function handlelevel(e) {
      setTxtLevel(e.target.value);
      validateForm();
    }

    function handlecampus(e) {
      setTxtCampus(e.target.value);
      validateForm();
    }

    function handlefloor(e) {
      setTxtFloor(e.target.value);
      validateForm();
    }
    
    
    
    
    async function handleSubmitForm(e) {
        e.preventDefault();
        if (!disabledAdd) {
            if (txtlevel && txtlevel !== 'Choose...') {
                if (txtcampus && txtcampus !== 'Choose...') { 
                    if (txtfloor && txtfloor !== 'Choose...') {
                        const newClassRoom = {
                            classRoom  : txtclassRoom,
                            gyg        : txtgyg,
                            level      : txtlevel,
                            campus     : txtcampus,
                            floor      : txtfloor,
                        }
                        try 
                        {
                            const response = await axios.post(`${REACT_APP_API}/classRoom`,newClassRoom, {
                                header: {
                                    "Autorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJydWxlIjoiYWRtaW4iLCJuYW1lIjoiRW5yaXF1ZSBMb3BleiIsImFkbWluIjp0cnVlfQ.UdU8LgnOxglzP2wZZP6Zt0dRZWSXurBk91mWUGyH_As"
                                }
                            });
                            if (response) {
                                // aviso de la mision fue un exito
                                dispatch(addNewClassRoom(newClassRoom)); 
                                tostada_S('New ClassRoom DONE!',"top-center",1500,'light');
                            }
                            navigate('/dashboard/viewerclassrooms', { replace: true });    
                        } catch (error) {
                            console.log(error.message);
                        }
                    } else {
                        //falta seleccionar el floor
                        tostada_W('missing Floor!',"bottom-right",1500,'light');
                    }
                } else {
                    //falta seleccionar el campus
                    tostada_W('missing Campus!',"bottom-right",1500,'light');
                }
            } else {
                //falta seleccionar el level
                tostada_W('missing Level!',"bottom-right",1500,'light');
            }
        }
    }
    
    const handleCloseNewClassRoom =()=> {
        navigate('/dashboard/viewerclassrooms', { replace: true});
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
                                onChange = { (e)=> handleClassRoom(e) }
                                onKeyUp  = { validateForm }
                                >   

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
                                value     = { txtgyg }
                                onChange  =  { (e)=> handlegyg(e) }
                            /> 
                        </Form.Group> 
                        <Form.Group className ="col-2">
                                <Row> <Form.Label className="text-center">Level</Form.Label>  </Row>
                            <Form.Select 
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
                            <Button className = "customButton" variant = "danger" onClick={handleCloseNewClassRoom}>Cancel</Button>
                            <Button className = "customButton" 
                                    type      = "submit" 
                                    variant   = "success"
                                    disabled  = {disabledAdd}
                            >
                                Add
                            </Button>
                        </Col>
                        </Form.Group>            
                </Row>
                    
                

            </Form>
    </Container>

  )
};