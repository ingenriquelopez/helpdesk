import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Modal     from 'react-bootstrap/Modal'
import { tostada_S } from '../utils/Tostadas';
import { useLocalStorage } from '../js/useLocalStorage';

import axios from 'axios';
const {REACT_APP_API} = process.env;

export default function ManagePdfs( {myTitle,myData,show, handleClosePdfs, handleManagePdfs}) {
    const navigate = useNavigate();
  
  
    const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');
    const [goodFile, setgoodFile] = useState(false);
    const [fileToUpload, setfileToUpload] = useState('');

  
  const sendFile = async()=> {
       //creamos el registro que se enviara por body al endpoint de classRoom Router
        
       const dataOfNewState= {
          number        : myData.numberTask,
          orderService  : myData.number,
       }
       let formData = new FormData();
       formData.append('name',fileToUpload)
       console.log(fileToUpload);

       const responseToUpload = await axios.post(`${REACT_APP_API}/serviceUpload`,formData)
       if ( responseToUpload ) {
            console.log(responseToUpload)
       }
  }


  
  const validateFile = (ev)=> {  
    if (ev[0]) {
        let PDF_es = ev[0].name;
        let PDF_debeser = myData.document + "-" + myData.number + ".pdf";
        setfileToUpload(ev[0]);

        if (PDF_es === PDF_debeser) {
         setgoodFile(true);
         }   else setgoodFile(false) 
    } else {
        setgoodFile(false) 
    }
  }

  return (
    <Modal show = {show} onHide = {handleClosePdfs} centered>
      <Modal.Header closeButton>
         <Modal.Title>{ myTitle }</Modal.Title>
      </Modal.Header>
      <Modal.Body>
     
       <Form >
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
              <Row> <Form.Label className="text-center">PDF File:</Form.Label></Row>

              <Form.Control 
                    name       = "filePdf"
                    as         = "input"
                    type       = "file" 
                    accept     = "application/pdf"
                    onChange   = {(ev)=>validateFile(ev.target.files)}
                    className    = {goodFile ? "bg-success text-white": "bg-danger text-white" }
              />
              </Form.Group>
          </Col>
        </Row>
        
       </Form> 
      </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick = {handleClosePdfs}>
        Close
      </Button>
      <Button 
          variant  = "primary" 
          disabled = {!goodFile }
          onClick   = { ()=> sendFile() }
      >
        Send
      </Button>
    </Modal.Footer>
  </Modal>
  )
}