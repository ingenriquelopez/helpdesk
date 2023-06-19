import React, { useState, useEffect} from 'react'
import { useNavigate  }     from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal               from 'react-bootstrap/Modal'
import { Container }       from 'react-bootstrap';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W }       from '../../../utils/Tostadas';

import axios       from 'axios';
import moment      from 'moment';
import DatePicker  from "react-datepicker";

const {REACT_APP_API} = process.env;

/* const LEVELS = ['PreSchool','Elementary','HighSchool','College', 'Global']; */


export default function EditFormEmployee( {myTitle,myData,lgShow, handleLgClose, handleLgUpdateEmployee}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [newName,   setNewName]             = useState(myData.name);
    const [newGenere, setNewGenere]           = useState(myData.genere);
    const [newEmail,  setNewEmail]            = useState(myData.email);
    const [newLevel,  setNewLevel]            = useState(myData.level);
    const [newDepartment, setNewDepartment]   = useState(myData.department);
  
    const [userLogged       , setUserLogged]  = useLocalStorage('userLogged','');
    const [isOpenDR         , setIsOpenDR]    = useState(false);
    const [disabledUpdate, setDisabledUpdate] = useState(true);
    
    
    const validaFormUpdate = ()=> {
      if (newName && newEmail) {
        setDisabledUpdate(false);
      } else setDisabledUpdate(true);
      
    }

    async function handleUpdate() {
      const dataToChange = {
        numEmployee : myData.numEmployee,
        name        : newName,
        genere      : newGenere,
        email       : newEmail,
        level       : newLevel, 
        department  : newDepartment,
      }
      try {
         const response = await axios.put(`${REACT_APP_API}/employees`,dataToChange, {
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
        handleLgUpdateEmployee();
      } catch(error) {
        console.log(error.message);
      }   
    }
  
    function handleName(e) {  
       let name = e.target.value;
       setNewName(name);
       validaFormUpdate();
    }
  
    function handleGenere(e) {  
      let ngen = e.target.value;
      setNewGenere(ngen);
      validaFormUpdate();
   }
  
   function handleEmail(e) {  
      let nemail = e.target.value;
      setNewEmail(nemail);
      validaFormUpdate();
   }
  
   function handleLevel(e) {  
    let nlevel = e.target.value;
    setNewLevel(nlevel);
 }
 function handleDepartment(e) {  
  let ndepartment = e.target.value;
  setNewDepartment(ndepartment);
  validaFormUpdate();
}

    
  const clearForm = () => {
    setNewName(myData.name);
    setNewGenere(myData.genere);
    setNewEmail(myData.email);
    setNewLevel(myData.level);
    setNewDepartment(myData.department);
    
    handleLgClose();
  }
  
    useEffect( ()=> {
      setNewName(myData.name);
      setNewGenere(myData.genere);
      setNewEmail(myData.email);
      setNewLevel(myData.level);
      setNewDepartment(myData.department);
      
    },[myData])
    
    useEffect( ()=> {
      validaFormUpdate();
    }, [newName, newEmail]);
    
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
                          <Form.Group className = "mb-3 mx-auto" >
                              <Form.Label >Name</Form.Label>
                                <Form.Control 
                                  type         = "text" 
                                  name         = "name" 
                                  defaultValue = {newName} 
                                  onChange     = { ev=> handleName(ev)}  
                                /> 
                          </Form.Group>
                      </Col>  
                  </Row>
  
                  <Row className = "d-grid- d-md-flex justify-content-between">
  
                        <Col md ={12} className = "text-center">
                          <Form.Group className="mb-3 mx-auto">
                              <Form.Label>EMAIL</Form.Label>
                                <Form.Control 
                                  type         = "text" 
                                  name         = "email" 
                                  defaultValue = {newEmail} 
                                  onChange     = { ev=> handleEmail(ev) }  
                              /> 
                          </Form.Group>
                      </Col >     
  
                       <Col md = {6} className = "text-center">
                          <Form.Group className   = "mb-3 mx-auto ">             
                          <Form.Label className = "text-center">GENERE</Form.Label>
                          <Form.Select defaultValue="Choose Genere..." onChange ={ (e)=> handleGenere(e)}>
                                          <option>Choose...</option>
                                          <option>Female</option>
                                          <option>Male</option>
                                          
                          </Form.Select>
                          </Form.Group> 
                      </Col>
  
                      <Col md = {6} className = "text-center">
                          <Form.Group className="mb-3 mx-auto" >
                              <Form.Label>LEVEL</Form.Label>
                              <Form.Select 
                                      as ="select" 
                                      id = "mode" 
                                      defaultValue="Choose Level..." 
                                      onChange ={ (e)=> handleLevel(e)}
                              >
                                <option>Choose...</option>
                                <option value = "PreSchool">PreSchool</option>
                                <option value = "Elementary">Elementary</option>
                                <option value = "HighSchool">HighSchool</option>
                                <option value = "College">College</option>
                              </Form.Select>
                          </Form.Group>
                      </Col> 
  
                  </Row>
                  <Row>
                      
                      <Col md = {12} className = "text-center">
                        <Form.Label className = "mb-3">DEPARTMENT</Form.Label>
                      </Col>
                      
                      <Col md = {12} className = "text-center">
                        <Form.Control as = "select" onChange ={ (e)=> handleDepartment(e)} >
                          <option>Choose...</option>
                          <option value = "Administrative">Administrative</option>
                          <option value = "Academic">Academic</option>
                          <option value = "Direction">Direction</option>
                          <option value = "Support Assistance">Support Assistance</option>
                          <option value = "Sports">Sports</option>
                          <option value = "General Services">General Services</option>
                      </Form.Control>  
                      </Col>
                  </Row>
              </Form> 
          </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick = {clearForm}>
          Close
        </Button>
        <Button variant="primary" onClick = {handleUpdate} disabled = {disabledUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
    )
  }