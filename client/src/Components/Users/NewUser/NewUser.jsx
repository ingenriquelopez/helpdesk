import React, { useState } from 'react'
import { motion } from 'framer-motion/dist/framer-motion';
import { useNavigate  }     from 'react-router-dom';
import { useLocalStorage } from '../../../js/useLocalStorage';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import "./NewUser.css";
import axios from 'axios';
import { tostada_S, tostada_W } from '../../../utils/Tostadas';
const {REACT_APP_API} = process.env;

// de momento no se esta utilizando
//const arrayLevels = [ "PreSchool", "Elementary", "HighSchool", "College","Global","Absolute"];

function NewUser() {
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
      <Container className = "container  mt-1 justify-content-center" >
        
          <div className="titleUser">
              <div id ="image">
            </div> 
            <div className = "text-center">
               <h5> ADD NEW USER</h5>
            </div>           
         </div> 
         
          
         <div className="d-flex" id = "containerUser">        
            <Col>
            
               <Form className="mx-auto"  id ="form"  autoComplete= 'off' onSubmit={(e) => handleSubmitForm(e)} >   
                     <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xl = {4} lg = {4} md = {4} sm  className = "text-center"> 
               
                           <Form.Group className = "mb-3 mx-auto" >
                              <Row >
                                 <Col className="text-center">
                                    <Form.Label>UserName</Form.Label>
                                 </Col>
                              </Row>
                              <Row>
                                 <Col className = "d-grid justify-content-center">
                                    <Form.Control 
                                       type        = "username" 
                                       placeholder = "Enter UserName" 
                                       value       = {txtUserName}
                                       onChange    = {(e)=> handleUserName(e)}       
                                    />
                                 </Col>
                              </Row>
                           </Form.Group>
                        </Col>
                     </Row>
                     <Row className = "justify-content-center py-2 mt-4">
                        <Col xxl = {4} xl = {6} lg = {6} md = {8} sm = {10}  className = "text-center">
                           <Row className = "mt-4 d-md-flex justify-content-center">   
                                    <Form.Group className="mb-3 mx-auto" controlId="formEmail" >
                                       <Form.Label>Email address</Form.Label>
                                       <Form.Control 
                                          type         = "email" 
                                          placeholder  = "Enter email" 
                                          autoComplete = "off"
                                          value        = {txtNewEmail}
                                          
                                          onChange     = { (e)=> handleNewEmail(e)}
                                       />
                                    </Form.Group>
                                 {/* </Col> */}
                           </Row>

                        </Col>
                     </Row>    
                  
                  <Form.Group controlId="formPassword">
                     <Row className = "mt-4">
                        <Col className="text-center">
                           <Form.Label>Password</Form.Label>
                        </Col>
                     </Row>
                     <Row>
                        <Col className = "d-grid justify-content-center">
                           <Form.Control 
                              type        = "password"                     
                              placeholder = "Password" 
                              value       = {txtPassword}
                              onKeyUp     = { (e)=> handlePassword(e.target.value) }
                              onChange    = { (e) => handlePassword(e.target.value)}
                           />
                        </Col>
                     </Row>
                  </Form.Group>

                  
                  <Row className = "mt-4 d-md-flex justify-content-center">
                     <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8}  className = "text-center">
                        <Form.Group className="mb-3 mx-auto" controlId="formTypeUser" >
                           <Form.Label>Type User</Form.Label>
                           <Form.Control as = "select"
                              aria-label="Type user"  
                              onChange ={ (e)=> handleTypeUser(e)}
                           >
                              <option>Choose...</option>
                              <option value = "User">User</option>
                              <option value = "superUser">superUser</option>
                              <option value = "Admin">Admin</option>
                              <option value = "superAdmin">superAdmin</option>
                           </Form.Control>                    
                        </Form.Group>
                     </Col>
                     <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center">
                           <Form.Group className="mb-3 mx-auto" controlId = "formLevel">
                                 <Form.Label>Level</Form.Label>
                                 <Form.Control as = "select" 
                                    aria-label="Level" 
                                    onChange ={handleLevel}
                                 >
                                    <option>Choose...</option>
                                    <option value = "PreSchool">PreSchool</option>
                                    <option value = "Elementary">Elementary</option>
                                    <option value = "HighSchool">HighSchool</option>
                                    <option value = "College">College</option>
                                    <option value = "Global">Global</option>
                                    <option value = "Absolute">Absolute</option>
                                 </Form.Control>
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

export default NewUser;