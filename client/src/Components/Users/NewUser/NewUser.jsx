import React, { useState } from 'react'
import { useLocalStorage } from '../../../js/useLocalStorage';
import { useNavigate  }     from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import "./NewUser.css";
import axios from 'axios';
import { tostada_S } from '../../../utils/Tostadas';
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
    

    function handleUserName(e) {
        setTxtUserName(e.target.value);
    }

      function handleNewEmail(e) {
        setTxtNewEmail(e.target.value);
      }

      function handlePassword(e) {
        setTxtPassword(e.target.value);
      }

      function handleTypeUser(e) {
        setTxtTypeUser(e.target.value);
      }
      
      function handleLevel(e) {
         setTxtLevel(e.target.value)
      }

      async function handleSubmitForm(e) {
        e.preventDefault();
        
        const newUser = {
            userName  : txtUserName,
            email     : txtNewEmail,
            password  : txtPassword,
            typeUser  : txtTypeUser,
            level     : txtLevel,
        }
        try {
            const response = await axios.post(`${REACT_APP_API}/user`,newUser);
            if (response) {
                // aviso de la mision fu un exito
                tostada_S('New User DONE!',"top-center",1500,'light');
            }
            navigate('/dashboard/viewerusers', { replace: true });    
        } catch (error) {
            console.log(error.message);
          } 
        
      }
    const handleCloseNewUser =()=> {
        navigate('/dashboard/viewerusers', { replace: true});
    }

  return (
    <Container className = "container-fluid position-relative py-1">
      <Row  className = "text-center">
         <h5> ADD NEW USER</h5>
      </Row>
      <Row>
         <div id ="image">
         </div>
      </Row>        
      <Form  id ="form" 
             className = "position-absolute col-5 top-50 start-50 translate-middle" 
             autoComplete= 'off'
             onSubmit={(e) => handleSubmitForm(e)}
      >
         <Form.Group className = "mb-3 mx-auto" >
            <Row >
               <Col className="text-center">
                  <Form.Label>UserName</Form.Label>
               </Col>
            </Row>
            <Row>
               <Col className = "d-grid justify-content-center">
                  <Form.Control 
                     type = "username" 
                     placeholder = "Enter UserName" 
                     value = {txtUserName}
                     onChange = {(e)=> handleUserName(e)}       
                  />
               </Col>
            </Row>
         </Form.Group>
         <Form.Group className="mb-3 mx-auto" controlId = "formEmail">   
            <Row>
               <Col className="text-center">
                  <Form.Label>Email address</Form.Label>
               </Col>
            </Row>
            <Row className = "d-md-flex justify-content-center py-2">
               <Col xl = {10} lg = {10} md = {10} sm className = "text-center" >            
                  <Form.Control 
                     type = "email" 
                     placeholder = "Enter email" 
                     autoComplete="off"
                     value = {txtNewEmail}
                     onChange = { (e)=> handleNewEmail(e)}
                  />
               </Col>
            </Row>    
         </Form.Group>
         <Form.Group controlId="formPassword">
            <Row className = "mt-4">
               <Col className="text-center">
                  <Form.Label>Password</Form.Label>
               </Col>
            </Row>
            <Row>
               <Col className = "d-grid justify-content-center">
                  <Form.Control 
                     type = "password"                     
                     placeholder = "Password" 
                     value = {txtPassword}
                     onChange = { (e) => handlePassword(e)}
                  />
               </Col>
            </Row>
         </Form.Group>
         <Row className = "mt-4 d-md-flex justify-content-center">
            <Col className="text-center  col-5">
               <Form.Group controlId="formTypeUser">
                  <Form.Label>Type User</Form.Label>
                  <Form.Select 
                     aria-label="Type user"  
                     onChange ={ (e)=> handleTypeUser(e)}
                  >
                     <option>Choose type user</option>
                     <option value="User">User</option>
                     <option value="superUser">superUser</option>
                     <option value="Admin">Admin</option>
                     <option value="superAdmin">superAdmin</option>
                  </Form.Select>                    
               </Form.Group>
            </Col>
            <Col className="text-center col-5 ">
               <Form.Group controlId = "formLevel">
                  <Form.Label>Level</Form.Label>
                  <Form.Select 
                     aria-label="Level" 
                     
                     onChange ={ (e) => handleLevel(e) }
                  >
                     <option>Choose level</option>
                     <option value = "PreSchool">PreSchool</option>
                     <option value = "Elementary">Elementary</option>
                     <option value = "HighSchool">HighSchool</option>
                     <option value = "College">College</option>
                     <option value = "Global">Global</option>
                     <option value = "Absolute">Absolute</option>
                  </Form.Select>
               </Form.Group>         
            </Col>
         </Row> 

         <Row >
            <Form.Group className = "col mt-5 mb-3 d-md-flex justify-content-md-center gap-3">
               <Button className = "customButton" variant = "danger" onClick = {handleCloseNewUser}>Cancel</Button>
               <Button className = "customButton" type ="submit" variant = "success">Submit</Button>
               
            </Form.Group>    
         </Row>
            
      </Form>
   </Container>
  );
}

export default NewUser;