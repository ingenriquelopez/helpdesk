import React, { useState, useEffect} from 'react'
import { useNavigate  }     from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { updateTask } from '../../../redux/tasks/tasksReducer';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { Container } from 'react-bootstrap';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W } from '../../../utils/Tostadas';

import axios from 'axios';
import moment        from 'moment';
import DatePicker               from "react-datepicker";

const {REACT_APP_API} = process.env;

const LEVELS = ['PreSchool','Elementary','HighSchool','College', 'Global'];


export default function EditFormTraining( {myTitle,myData,lgShow, handleLgClose, handleLgUpdateTraining}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [newTraining,setNewTraining]            = useState(myData.training);
  const [newSpeaker, setNewSpeaker]             = useState(myData.speaker);
  const [newLevel, setNewLevel]                 = useState(myData.level);
  const [newDateTraining, setNewDateTraining]   = useState(myData.dateTraining);
  const [newMode, setNewMode]                   = useState(myData.mode);

  const [userLogged    , setUserLogged]          = useLocalStorage('userLogged','');
  const [isOpenDR         , setIsOpenDR]         = useState(false);
  const [txtdateTraining  , setTxtDateTraining]  = useState('');
  
  
  
  async function handleUpdate() {
    const dataToChange = {
      id           : myData.id,
      training     : newTraining,
      speaker      : newSpeaker,
      level        : newLevel,
      dateTraining : newDateTraining, 
      mode         : newMode,
    }
    try {
       const response = await axios.put(`${REACT_APP_API}/trainings`,dataToChange, {
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
      handleLgUpdateTraining();
    } catch(error) {
      console.log(error.message);
    }   
  }

  function handleTraining(e) {  
     let nt = e.target.value;
     setNewTraining(nt);
  }

  function handleSpeaker(e) {  
    let nt = e.target.value;
    setNewSpeaker(nt);
 }

 function handleLevel(e) {  
    let nt = e.target.value;
    setNewLevel(nt);
 }


 const handleClickDateTraining    = (e) => {
    e.preventDefault();
    setIsOpenDR(!isOpenDR);
  }
  const handleChangeDateTraining   = (e) => {
    setIsOpenDR(!isOpenDR);
    setTxtDateTraining(e);
    setNewDateTraining(e);
  };

 function handleMode(e) {  
    let nt = e.target.value;
    setNewMode(nt);
 }


  const clearForm = () => {
    setNewTraining(myData.training);
    setNewSpeaker(myData.speaker);
    setNewLevel(myData.level);
    setNewDateTraining(myData.training);
    setNewMode(myData.mode);
    
    handleLgClose();
  }

  useEffect( ()=> {
    setNewTraining(myData.training);
    setNewSpeaker(myData.speaker);
    setNewLevel(myData.level);
    setNewMode(myData.mode);

    setNewDateTraining(myData.dateTraining); 
    
  },[myData])
  
  return (
    <Modal show = {lgShow} onHide = {handleLgClose} centered>

      <Modal.Header closeButton>
         <Modal.Title>{ myTitle }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Container className = "container-fluid py-3">
            <Form>

                <Row className = "d-grid- d-md-flex justify-content-center">
                  
                      <Col md = {12} className = "text-center">
                        <Form.Group className="mb-3 mx-auto" >
                            <Form.Label >TRAINING</Form.Label>
                            * <Form.Control 
                                type         = "text" 
                                name         = "training" 
                                defaultValue        = {newTraining} 
                                onChange     = { ev=> handleTraining(ev)}  
                            /> 
                        </Form.Group>
                    </Col>  
                </Row>

                <Row className = "d-grid- d-md-flex justify-content-between">

                      <Col md ={12} className = "text-center">
                        <Form.Group className="mb-3 mx-auto">
                            <Form.Label>SPEAKER</Form.Label>
                              <Form.Control 
                                type         = "text" 
                                name         = "speaker" 
                                defaultValue = {newSpeaker} 
                                onChange     = { ev=> handleSpeaker(ev) }  
                            /> 
                        </Form.Group>
                    </Col >     

                     <Col md = {6} className = "text-center">
                        <Form.Group className   = "mb-3 mx-auto ">             
                        <Form.Label className = "text-center">LEVEL</Form.Label>
                        <Form.Select defaultValue="Choose Level..." onChange ={ (e)=> handleLevel(e)}>
                                        <option>Choose...</option>
                                        <option>{LEVELS[0]}</option>
                                        <option>{LEVELS[1]}</option>
                                        <option>{LEVELS[2]}</option>
                                        <option>{LEVELS[3]}</option>
                                        <option>{LEVELS[4]}</option>
                        </Form.Select>
                        </Form.Group> 
                    </Col>

                    <Col md = {6} className = "text-center">
                        <Form.Group className="mb-3 mx-auto" >
                            <Form.Label>MODE</Form.Label>
                            <Form.Select 
                                    as ="select" 
                                    id = "mode" 
                                    defaultValue="Choose device..." 
                                    onChange ={ (e)=> handleMode(e)}
                            >
                                <option>Choose...</option>
                                <option>FaceToFace</option>
                                <option>OnLine</option>
                            </Form.Select>
                        </Form.Group>
                    </Col> 

                </Row>
                <Row>
                    
                    <Col md = {12} className = "text-center">
                      <Form.Label className = "mb-3">DATE TRAINING</Form.Label>
                    </Col>
                    
                    <Col md = {12} className = "text-center">
                        <button className = {txtdateTraining ? "btn-info" : "btn-light"}
                                            onClick = { (e) => handleClickDateTraining(e) } 
                        > 
                           {txtdateTraining ? moment(txtdateTraining).format("dddd DD/MMMM/YYYY"): 'Date...?' }
                        </button> 
                        {isOpenDR && (<DatePicker selected={txtdateTraining} onChange={ (date) => handleChangeDateTraining(date)} inline />  )}  
                    
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