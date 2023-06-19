import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom';
import { Container, Accordion, Form, Button, Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useLocalStorage } from '../../js/useLocalStorage';

const {REACT_APP_API} = process.env;


function Settings() {
    const [docSelected, setdocSelected]        = useState('');

    const [newDocument    , setnewDocument]    = useState('');
    const [newTitle       , setnewTitle]       = useState('');
    const [newRequester   , setnewRequester]   = useState('');
    const [newVobo        , setnewVobo]        = useState('');
    const [newResponsable , setnewResponsable] = useState('');

    const [listDocuments, setListDocuments] = useState();

    const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');

    const navigate = useNavigate();
//-------------------------------------------------------------------------
    const handleToast= (message)=> {
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }); 
        setTimeout( ()=> {navigate('/dashboard')},2000)
    }
//-----------------------------------------------------------------------

    const getListDocuments =async()=> {
        try {
            const response = await axios.get(`${REACT_APP_API}/configServiceOrder`, {
                headers: {
                    "authorization": `Bearer ${userLogged.userToken}`,
                }
                }
            );
            if (response.data.length > 0) {
                let listTmp = []
                for (let d in response.data) listTmp.push(response.data[d].document);
                setListDocuments(listTmp);
                setnewDocument(listTmp[0]);
                setdocSelected(listTmp[0]);
                setnewTitle(response.data[0].title);
                setnewRequester(response.data[0].requester);
                setnewVobo(response.data[0].vobo);
                setnewResponsable(response.data[0].responsable);
            }
            return response;
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDocument =async(e)=> {
        setnewDocument(e);
        setdocSelected(e);
        if (e) {
            try {
                const response = await axios.get(`${REACT_APP_API}/configServiceOrder/${e}`, {
                    headers: {
                        "authorization": `Bearer ${userLogged.userToken}`,
                    }
                    }
                );
                if (response) {
                    setnewTitle(response.data.title);
                    setnewRequester(response.data.requester);
                    setnewVobo(response.data.vobo);
                    setnewResponsable(response.data.responsable);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        
    }

    const handleNewDocument = (e)=> {
        setnewDocument(e);
    }
    function handleNewTitle(e) {  
        setnewTitle(e);
       
      }
    function handleNewRequester(e) {  
        setnewRequester(e);
      }
    function handleNewVobo(e) {  
        setnewVobo(e);
      }

    function handleNewResponsable(e) {  
        setnewResponsable(e);
      }
      function handleExit(e) {
        navigate('/dashboard');
      }
      /* ------------------------------------------*/

async function deleteDocument() {
    try {
        const response = await axios.delete(`${REACT_APP_API}/configServiceOrder/${docSelected}`);
        if (response) handleToast('DELETE operation successful!');
    } catch (error) {
        console.log(error.message);
    }
}
const handleDeleteDocument =() => {
    deleteDocument();
}


async function saveDocument() {
    const newObjDoc = {
        document    : newDocument,
        title       : newTitle,
        requester   : newRequester,
        vobo        : newVobo,
        responsable : newResponsable,
    } 

    if (docSelected !== newDocument) {
        //if enter by this snippet because listDocuments is empty
        try {
            const response = await axios.post(`${REACT_APP_API}/configServiceOrder`,newObjDoc);
            //hay que poner un aviso k todo esta bien
            handleToast('SAVE operation successful!');
            
        } catch (error) {
            console.log(error.message);
        }
        } else {
        try {
            newObjDoc.docToFind = docSelected;
            const response = await axios.put(`${REACT_APP_API}/configServiceOrder`,newObjDoc);
            if (response)  handleToast('UPDATE operation successful!');
            //hay que poner un aviso k todo esta bien
            return response;
            
        } catch (error) {
            console.log(error.message);
        }
    }
}

      const handleFormConfigDocuments =(e)=> {
        e.preventDefault();
        saveDocument();
      }

        useEffect( ()=> {
        getListDocuments();
      },[]);  

  return (
    <>
    <Container className = "container-fluid py-5">
        <h3>Settings</h3>
        <hr/>
        <Accordion>
        
            <Accordion.Item eventKey="0">
                <Accordion.Header>Documents Config</Accordion.Header>
                <Accordion.Body>
                    <Form onSubmit = { (e)=> handleFormConfigDocuments(e)}>
                    <Row className = "d-md-flex">
                        {/* Caja de lado izquierdo */}
                        <Col xs = {12} xl ={5} lg = {5} md = {5}>
                            <Row className = "d-md-flex justify-content-left mb-4">
                                <Col xs = {12} sm = {12} xl = {3} lg = {12} md = {3} className = "mx-0 px-0">  
                                    <Form.Label>Select Doc</Form.Label>
                                </Col>
                                <Col xs = {12} sm = {12} xl = {4} lg = {12} md = {4} className = "text-center mx-0 px-0"> 
                                    <Form.Select options = {listDocuments}  onChange = { (e)=> handleDocument(e.target.value) } size = "sm">
                                        {listDocuments && listDocuments.map( (element)=> ( <option key={element} value = {element}> {element}</option>))};
                                     </Form.Select>
                                </Col>
                            </Row>

                            <Row className = "d-md-flex">
                                <Col xs = {12} sm = {12} xl = {3} lg = {12} md = {3} className = "mx-0 px-0">  
                                    <Form.Label>Document</Form.Label>
                                </Col>
                                <Col xs = {12} sm = {12} xl = {4} lg = {12} md = {4} className = "text-center mx-0 px-0 mb-4">  
                                    <Form.Control
                                        type = "text"
                                        name = "document"
                                        size = "sm"
                                        value = {newDocument}
                                        onChange = { (ev)=> handleNewDocument(ev.target.value)}
                                    >
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row className = "d-md-flex">
                                <Col xs = {12} sm = {12} xl = {3} lg = {12} md = {3} className = "mx-0 px-0">  
                                    <Form.Label> Vobo</Form.Label>
                                </Col>
                                <Col xs = {12} sm = {12} xl = {9} lg = {12} md = {9} className = "text-center mx-0 px-0">  
                                    <Form.Control
                                        type         = "text" 
                                        name         = "vobo" 
                                        size = "sm"
                                        value        = {newVobo}
                                        onChange     = { (ev)=> handleNewVobo(ev.target.value)}
                                    >
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Col>

                        {/* Caja de lado derecho */}
                        <Col xs = {12} xl ={5} lg = {5} md = {5}>
                            <Row className = "d-md-flex justify-content-left mb-4">
                                <Col xs = {12} sm = {12} xl = {3} lg = {12} md = {3} className = "mx-1 px-1">  
                                    <Form.Label className ="text-center">Title</Form.Label>
                                </Col>
                                <Col xs = {12} sm = {12} xl = {7} lg = {12} md = {7} className = "text-center mx-0 px-0 mb-4">  
                                    <Form.Control
                                        type         = "text" 
                                        name         = "titulo" 
                                        size = "sm"
                                        value        = {newTitle}
                                        onChange     = { (ev)=> handleNewTitle(ev.target.value)}
                                    >
                                    </Form.Control>
                                </Col>

                                <Col xs = {12} sm = {12} xl = {3} lg = {3} md = {3} className = "mx-1 px-1">  
                                    <Form.Label> Requester</Form.Label>
                                </Col>
                                <Col xs = {12} sm = {12} xl = {7} lg = {7} md = {7} className = "text-center mx-0 px-0">  
                                    <Form.Control
                                        type         = "text" 
                                        name         = "requester" 
                                        size = "sm"
                                        value        = {newRequester}
                                        onChange     = { (ev)=> handleNewRequester(ev.target.value)}
                                    >
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row className = "d-md-flex">
                                <Col xs = {12} sm = {12} xl = {3} lg = {3} md = {3} className = "mx-1 px-1">  
                                    <Form.Label> Responsable</Form.Label>
                                </Col>
                                <Col xs = {12} sm = {12} xl = {7} lg = {7} md = {7} className = "text-center mx-0 px-0">  
                                    <Form.Control
                                        type         = "text" 
                                        name         = "responsable" 
                                        size = "sm"
                                        value        = {newResponsable}
                                        onChange     = { (ev)=> handleNewResponsable(ev.target.value)}
                                    >
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs = {12} xl ={1} lg = {1} md = {1} >
                            <Button className = "customButton mb-1" type ="submit" variant = "success">Save</Button>                
                            <Button className = "customButton mb-1" variant = "danger" 
                                    onClick = { ()=> handleDeleteDocument() }
                            >
                                Delete
                            </Button>
                            <Button className = "customButton mb-1" variant = "secondary"
                                    onClick = { (e)=> handleExit(e) }
                            >
                                Exit
                            </Button>                
                        </Col>
                    </Row>
                    </Form>
                    
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Accordion Item #2</Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        
    </Container>
    </>
    
  )
}

export default Settings