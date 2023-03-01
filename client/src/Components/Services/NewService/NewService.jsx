import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { Container } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { v4 as uuidv4 } from 'uuid';

import axios from 'axios';
import { useEffect } from 'react';
const {REACT_APP_API} = process.env;


export default function NewService( props ) {
  const dispatch = useDispatch();

  const [listDocuments   , setListDocuments]    = useState();
  const [docSelected     , setdocSelected]      = useState('');
  
  const [newDate         , setnewDate]          = useState('');
  const [newRequester    , setnewRequester]     = useState('');
  const [newPosition     , setnewPosition]      = useState('');
  const [newDepartment   , setnewDepartment]    = useState('');
  const [newService      , setnewService]       = useState('');
  const [newObservations , setnewObservations] = useState('');

  const [newTitle        , setnewTitle]        = useState('');
  const [newVobo         , setnewVobo]         = useState('');
  const [newResponsable  , setnewResponsable]  = useState('');
  const [newAccordance   , setnewAccordance]   = useState('');
  const [canSave         , setcanSave]         = useState(false);

  
  async function handleFormService() {
    let id_tmp = uuidv4();
    
    const serviceData = {
      id           : id_tmp,
      date         : newDate,
      document     : docSelected,
      title        : newTitle,
      requester    : newRequester,
      position     : newPosition,
      department   : newDepartment,
      serviceReq   : newService,
      observations : newObservations,
      vobo         : newVobo,
      responsable  : newResponsable,
      accordance   : newAccordance,

      serviceStatus: 'Required',
      numberTask   : props.numrequest,
      level        : props.level,
    }
    try {
      const response = await axios.post(`${REACT_APP_API}/services`,serviceData);
      if (response) {
        props.setnewOrderService(response.data.number);          
        props.onHide();
      }
    } catch(error) {
      console.log(error.message);
    }   
  }

  async function handleDocument(e) {
    try {
      let response = await axios.get(`${REACT_APP_API}/ConfigServiceOrder/${e}`);
      if (response) {
        setnewTitle(response.data.title);
        setnewRequester(response.data.requester);
        setnewVobo(response.data.vobo);
        setnewResponsable(response.data.responsable);
        setnewAccordance(response.data.accordance);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const check_canSave = ()=> {
    if (newPosition && newDepartment && newDate && newService) setcanSave(true) 
    else setcanSave(false)
  }

  function handleNewRequester(e) {  
    setnewRequester(e);
    check_canSave();
  }
  function handleNewPosition(e) {
    setnewPosition(e);
    check_canSave();
  }
  function handleNewDepartment(e) {
    setnewDepartment(e);
    check_canSave();
  }
  function handleNewService(e) {
    setnewService(e);
    check_canSave();
  }
  function handleNewObservations(e) {
    setnewObservations(e)
    check_canSave();
  }

/*------------------------------------------*/
const getListDocuments =async()=> {
  try {
      const response = await axios.get(`${REACT_APP_API}/configServiceOrder`);
      if (response.data.length > 0 ) {
          let listTmp = []
          for (let d in response.data) listTmp.push(response.data[d].document);
          setListDocuments(listTmp);
        
          setdocSelected(listTmp[0]);
          setnewTitle(response.data[0].title); 

          setnewRequester(response.data[0].requester);
          
          setnewVobo(response.data[0].vobo);
          setnewResponsable(response.data[0].responsable); 
          setnewAccordance(response.data[0].requester)
      }
      return response;
  } catch (error) {
      console.log(error.message);
  }
}
/*------------------------------------------*/


  useEffect( ()=> {
    getListDocuments();
  },[]);

  return (
    <Modal 
      {...props}
      size = "lg" 
      centered 
      aria-labelledby = "contained-modal-title-vcenter" scrollable 
    >
      <Modal.Header closeButton style = {{backgroundColor:'#CCF'}}>
        <Col xs = {12} xl = {8} lg = {7} md = {7} sm className = "text-left">  
          <Modal.Title style = {{fontSize:'14px'}}>
            SERVICE REQUEST
          </Modal.Title>
          <Col>
            <p> {newTitle}</p>
          </Col>
          
        </Col>
        <Col xs = {12} xl = {3} lg = {5} md = {5} sm className = "text-left">  
          <Form.Select 
              options = {listDocuments}  
              name = "document" 
              id   = "document"
              onChange = { (e)=> handleDocument(e.target.value) } 
              size = "sm"
          >
              {listDocuments && listDocuments.map( (element)=> ( <option key={element} value = {element}> {element}</option>))};
          </Form.Select>
          
         </Col>
      </Modal.Header>
      <Modal.Body>
        <Container>
        <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {6} lg = {6} md = {12} sm className = "text-center">       
            <Form.Label className = "text-center mt-1">Current Date</Form.Label>
              <DatePicker
                selected={Date.parse(newDate)}      
                onChange={(date) => setnewDate(date)}
                dateFormat="dd, MMMM , yyyy"
              />
          </Col>
          <Col xs = {12} xl = {6} lg = {6} md = {12} sm className = "text-center">        
            <Form.Label>Requester</Form.Label>
            <Form.Control 
              type         = "text" 
              name         = "requester" 
              value        = {newRequester}
              onChange     = { (ev)=> handleNewRequester(ev.target.value)} 
            />
          </Col >  
        </Row>
        <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {6} lg = {6} md = {6} sm className = "text-center">        
            <Form.Label>Position</Form.Label>
            <Form.Control 
              type         = "text" 
              name         = "position" 
              value = {newPosition}
              onChange     = { (ev)=> handleNewPosition(ev.target.value)} 
            />
          </Col >  
          <Col xs = {12} xl = {6} lg = {6} md = {6} sm className = "text-center">        
              <Form.Label>Department</Form.Label>
              <Form.Control 
                type         = "text" 
                name         = "department" 
                value = {newDepartment}
                onChange     = { (ev)=> handleNewDepartment(ev.target.value)} 
              />
          </Col >  
        </Row>
         <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {10} lg = {10} md = {12} sm className = "text-center">
            <Form.Label className="mb-3 text-center">Service</Form.Label>
            <Form.Control 
              as           = "textarea"  
              name         = "service" 
              defaultValue = {newService}
              onChange     = { (ev) => handleNewService(ev.target.value)} 
            />
          </Col>
        </Row> 
        <Row className = "d-md-flex justify-content-center py-1">
          <Col xs = {12} xl = {8} lg = {8} md = {12} sm className = "text-center">
            <Form.Label className="mb-3">Observations</Form.Label>
            <Form.Control 
              as           = "textarea"  
              name         = "observations" 
              defaultValue = {newObservations}
              onChange     = { (ev) => handleNewObservations(ev.target.value)} 
            />
          </Col>
        </Row> 
      </Container>
    </Modal.Body>
    <Modal.Footer>
      <Row className = "d-md-flex justify-content-center py-1">
        <Col>
          <Button variant="secondary" onClick = {props.onHide}>
            Close
          </Button>
        </Col>
        <Col>
          <Button variant="primary" 
                  disabled = {!canSave}
                  onClick = {handleFormService}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Modal.Footer>
  </Modal>
  )
}