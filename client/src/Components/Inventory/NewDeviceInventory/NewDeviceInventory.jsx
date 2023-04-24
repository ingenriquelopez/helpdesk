import React, { useState } from 'react'
import { motion } from 'framer-motion/dist/framer-motion';
import { useNavigate  }     from 'react-router-dom';
import { useLocalStorage } from '../../../js/useLocalStorage';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import "./NewDeviceInventory.css";
import axios from 'axios';
import { tostada_S, tostada_W } from '../../../utils/Tostadas';
const {REACT_APP_API} = process.env;


function NewDeviceInventory() {
    const navigate= useNavigate();
    
    const [txtUserName , setTxtUserName]   = useState('');
    const [txtNewEmail , setTxtNewEmail]   = useState('');
    const [txtPassword , setTxtPassword]   = useState('');
    const [txtTypeUser , setTxtTypeUser]   = useState('');
    const [txtLevel    , setTxtLevel]      = useState('');
    const [disabledAdd, setdisabledAdd]    = useState(true);

    const [userLogged, setUserLogged] = useLocalStorage('userLogged');


    const animations = {
      initial: { opacity: 0, x: 0 },
      animate: { opacity: 1, x: 0 },
      
  };
  
    const yaExisteEmail = async()=> {
      /* buscamos el email en db */
      const response = await axios.get(`${REACT_APP_API}/user/${txtNewEmail}`, {
         headers: {
             "authorization": `Bearer ${userLogged.userToken}`,
         }
         });
      
      if (response.data === 'User not found') return false;
      else return true;  
    }

    function validateForm() {
      
      if (txtPassword && txtUserName && txtNewEmail) setdisabledAdd(false)
      else setdisabledAdd(true)
      
    }

    function handleUserName(e) {
        setTxtUserName(e.target.value.toLowerCase());
        validateForm();
    }

   function handleNewEmail(e) {
      setTxtNewEmail(e.target.value.toLowerCase());
      let lastchar = e.target.value[e.target.value.length-1]
      if (lastchar ==='@') {
         if (txtNewEmail.includes(lastchar)) {
            setTxtNewEmail('');
         }
      } 
      validateForm();
      
   }

   const handlePassword = (e) => {
      setTxtPassword(e);
      validateForm();
   }
 

   function handleTypeUser(e) {
      setTxtTypeUser(e.target.value);
      validateForm();
   }
   
   function handleLevel(e) {
      validateForm();
      setTxtLevel(e.target.value);
      validateForm();
      
   }

   async function handleSubmitForm(e) {
      e.preventDefault();
      
      if (!disabledAdd) {
         if (txtTypeUser && txtTypeUser !== 'Choose...') {
            if (txtLevel && txtLevel !== 'Choose...') {
               const newUser = {
                  userName  : txtUserName,
                  email     : txtNewEmail,
                  password  : txtPassword,
                  typeUser  : txtTypeUser,
                  level     : txtLevel,
               }

               if ( await yaExisteEmail(txtNewEmail) ) {
                  tostada_W(`Email: ${txtNewEmail} already exists`,"top-center",1500,'dark');
               } else 
                  {
                  try {
                     const response = await axios.post(`${REACT_APP_API}/user`,newUser, {
                        headers: {
                            "authorization": `Bearer ${userLogged.userToken}`,
                        }
                        });
                        console.log(response)
                     if (response) {
                        if (response.data.message==='El token NO es valido!') {
                           navigate('/login' );    
                           tostada_W(response.data.message,"top-center",1500,'dark');
                           return
                     
                        } else {
                           // aviso de la mision fue un exito
                           tostada_S('New User DONE!',"top-center",1500,'light');
                        } 
                     }
                     navigate('/dashboard/viewerusers', { replace: true });    
                  } catch (error) {
                     console.log("ERROR:" ,error.message);
                     return 
                     } 
               }
               

            } else {
               //mensaje de que no se ha caoturado el level
               tostada_W('missing Level!',"bottom-right",1500,'light');
            }
         } else {
            // no se ha capturado el typeuser
            tostada_W('missing TypeUser!',"bottom-right",1500,'light');
         }
      } 
   }
         

   const handleCloseNewUser =()=> {
      navigate('/dashboard/viewerusers', { replace: true});
   }

  return (
      <Container className = "container  justify-content-center" id = "containerInventory">
        
          <div className="titleUser">
            <div className = "text-center">
               <h5> ADD NEW DEVICE TO INVENTORY</h5>
            </div>           
         </div> 
         
          
         <div className="d-flex" id = "containerForm">        
            <Col>
            
               <Form className="mx-auto"  id ="form"  autoComplete= 'off' onSubmit={(e) => handleSubmitForm(e)} >   
                     <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Internal Code</Form.Label>
                                    <Form.Control 
                                       type        = "internalCode" 
                                       placeholder = "Enter internal code" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Serial</Form.Label>
                                    <Form.Control 
                                       type        = "serial" 
                                       placeholder = "Enter serial number" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>

                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Device</Form.Label>
                                    <Form.Control 
                                       type        = "device" 
                                       placeholder = "Enter device" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* ----SEGUNDA FILA  */}
                    <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Trade</Form.Label>
                                    <Form.Control 
                                       type        = "trade" 
                                       placeholder = "Enter trade" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control 
                                       type        = "model" 
                                       placeholder = "Enter model" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
    
                    {/* --- TERCERA FILA ---- */}
                    <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Room</Form.Label>
                                    <Form.Control 
                                       type        = "room" 
                                       placeholder = "Enter classroom" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>level</Form.Label>
                                    <Form.Control 
                                       type        = "level" 
                                       placeholder = "Enter level" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>

                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>campus</Form.Label>
                                    <Form.Control 
                                       type        = "campus" 
                                       placeholder = "Enter campus" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                        
                    {/* --- CUARTA FILA ---- */}
                    <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Usuario</Form.Label>
                                    <Form.Control 
                                       type        = "room" 
                                       placeholder = "Enter Usuario" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Document Responsability</Form.Label>
                                    <Form.Control 
                                       type        = "docRes" 
                                       
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>

                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Document Purchase</Form.Label>
                                    <Form.Control 
                                       type        = "docCom" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                    </Row>

                {/* --- QUINTA  FILA ---- */}
                <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {6} xl = {6} lg = {4} md = {5} sm = {8} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control 
                                    as             = "textarea"
                                       placeholder = "Enter notes" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Checked By</Form.Label>
                                    <Form.Control 
                                       type        = "checkedBy" 
                                       placeholder = "Enter name " 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}      
                                    />
                            </Form.Group>
                        </Col>

                    </Row>

                  <Row >
                     <Form.Group className = "col mt-5 mb-3 d-md-flex justify-content-md-center gap-3">
                     <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                        <Button className = "customButton" variant = "danger" onClick = {handleCloseNewUser}>Cancel</Button>
                     </Col>
                     <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                        <Button className = "customButton" type    = "submit" variant = "success" disabled = {disabledAdd}>Add</Button>
                     </Col>
                        
                     </Form.Group>    
                  </Row>
                     
               </Form> 
            </Col>
         </div> 
   </Container>
  );
}

export default NewDeviceInventory;