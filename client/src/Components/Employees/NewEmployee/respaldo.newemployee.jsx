import React, { useState } from 'react'
import { motion } from 'framer-motion/dist/framer-motion';
import { useNavigate  }     from 'react-router-dom';
import { useLocalStorage } from '../../../js/useLocalStorage';

import Footer from '../../Footer/Footer';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import "./NewEmployee.css";
import axios from 'axios';
import { tostada_S, tostada_W } from '../../../utils/Tostadas';
const {REACT_APP_API} = process.env;

// de momento no se esta utilizando
//const arrayLevels = [ "PreSchool", "Elementary", "HighSchool", "College","Global","Absolute"];

function NewEmployee() {
    const navigate= useNavigate();
    
    const [txtNumEmployee , setTxtNumEmployee]  = useState('');
    const [txtName        , setTxtName]         = useState('');
    /* const [txtGenere      , setTxtGenere]       = useState(''); */
    const [txtEmail       , setTxtEmail]        = useState('');
    const [txtLevel       , setTxtLevel]        = useState('');
    const [txtDepartment  , setTxtDepartment]   = useState('');

    const [disabledAdd, setdisabledAdd]    = useState(true);

    const [userLogged, setUserLogged] = useLocalStorage('userLogged');

    const [genere, setGenere] = useState('');

    /* const { genere } = item; */


    const animations = {
      initial: { opacity: 0, x: 0 },
      animate: { opacity: 1, x: 0 },
      
  };
  
  const handleChangeGenere = e => {
   e.persist();
   
   setGenere(e.target.value);
 };

    const yaExisteEmail = async()=> {
      /* buscamos el email en db */
      const response = await axios.get(`${REACT_APP_API}/employees/${txtEmail}`, {
         headers: {
             "authorization": `Bearer ${userLogged.userToken}`,
         }
         });
      
      if (response.data === 'Employee not found') return false;
      else return true;  
    }

    function validateForm() {
      if (txtNumEmployee && txtName && txtEmail ) { 
         setdisabledAdd(false)
      }  else setdisabledAdd(true)
    }

    function handleNumEmployee(e) {
        setTxtNumEmployee(e.target.value.toLowerCase());
        validateForm();
    }

    function handleName(e) {
      
        setTxtName(e.target.value.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) );
        validateForm();
    }

   function handleEmail(e) {
      setTxtEmail(e.target.value.toLowerCase());
      let lastchar = e.target.value[e.target.value.length-1]
      if (lastchar ==='@') {
         if (txtEmail.includes(lastchar)) {
            setTxtEmail('');
         }
      } 
      validateForm();
   }


   function handleLevel(e) {
      setTxtLevel(e.target.value);
      validateForm();
   }
   
   function handleDepartment(e) {
      setTxtDepartment(e.target.value);
      validateForm();
   }

   async function handleSubmitForm(e) {
      e.preventDefault();
      
      if (!disabledAdd) {
         if (txtLevel && txtDepartment !== 'Choose...') {
               const newEmployee = {
                  numEmployee : txtNumEmployee,
                  name        : txtName,
                  genere      : genere,
                  email       : txtEmail,
                  level       : txtLevel,
                  department  : txtDepartment,
               }

               if ( await yaExisteEmail(txtEmail) ) {
                  tostada_W(`Email: ${txtEmail} already exists`,"top-center",1500,'dark');
               } else 
                  {
                  try {
                     const response = await axios.post(`${REACT_APP_API}/employees`,newEmployee, {
                        headers: {
                            "authorization": `Bearer ${userLogged.userToken}`,
                        }
                        });
                        
                            if (response.data.message==='El token NO es valido!') {
                              navigate('/login' );    
                              tostada_W(response.data.message,"top-center",1500,'dark');
                            return
                            }
                              else {
                                 
                                 if (response.data ==='successfull') {
                                    // aviso de la mision fue un exito
                                    tostada_S('New User DONE!',"top-center",1500,'light');
                                 } else {
                                    tostada_W(response.data,"top-center",1500,'dark');
                                   }
                              } 
                  
                     navigate('/trainings', { replace: true });    
                  } catch (error) {
                     console.log("ERROR:" ,error.message);
                     return 
                     } 
               }
            
         } else {
            // no se ha capturado el typeuser
            tostada_W('missing Level or Department!',"bottom-right",1500,'light');
         }
      } 
   }
         

   const handleCloseNewEmployee =()=> {
      navigate('/trainings', { replace: true});
   }

  return (   
   <div className="d-flex mb-0 d-md-flex justify-content-center"  id = "containerEmployee">
      
      <div className="titleEmployee">
         <div className = "text-center">
            <h5> ADD NEW EMPLOYEE</h5>
         </div>           
      </div> 
      
      <Form className="mx-auto mt-1"  onSubmit={(e) => handleSubmitForm(e)} id = "form" >
         <div className="row">
            <div className="col-3">

            </div>
         </div>
         <Row className = "d-grid d-md-flex justify-content-center py-1">
            <Col xl = {3} lg = {3} md = {3} sm = {3}  className = "text-center"> 
               <Form.Label className = "font-weight-bold">Num Employee</Form.Label>
            </Col>
         </Row>
         <Row className = "d-grid d-md-flex justify-content-center py-2">
            <Col xl = {2} lg = {2} md = {3} sm = {6} xs= {6}  className = "text-center"> 
               <Form.Control 
                        type        = "text" 
                        placeholder = "#" 
                        value       = {txtNumEmployee}
                        onChange    = {(e)=> handleNumEmployee(e)}       
               />
            </Col>

         </Row>

         <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
            <Col xl = {7} lg = {7} md = {12} sm  = {12} xs = {12}  className = "text-center"> 
                  <Form.Label className = "font-weight-bold">Employee Name</Form.Label>
                  <Form.Control 
                     type        = "name" 
                     id          = "name"
                     placeholder = "Enter Name" 
                     value       = {txtName}
                     onChange    = { (e)=> handleName(e)}       
                  />
            </Col>
            
            <Col xl = {4} lg = {4} md = {4} sm  className = "text-center"> 
               <Form.Label className = "font-weight-bold">Genere</Form.Label>

               <Form.Group controlId="genere">
                  <Form.Check
                     value = "Female"
                     type  = "radio"
                     
                     label = "Female"
                     onChange = {handleChangeGenere} 
                     checked = {genere === "Female"}
                  />
                  <Form.Check
                     value = "Male"
                     type = "radio"

                     label = "Male"
                     onChange={handleChangeGenere} 
                     checked = {genere === "Male"}
                  />
                  </Form.Group>
               
            </Col>

            <Col>
               <input id="input-b3" name="input-b3[]" type="file" class="file" multiple data-show-upload="false" data-show-caption="true" data-msg-placeholder="Select {files} for upload..."></input>
            </Col>

         </Row> {/* FIN DE Row de nombre y genero */}
         <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
            <Col xl = {7} lg = {7} md = {12} sm  = {12} xs = {12}  className = "text-center"> 
               <Form.Label className = "font-weight-bold">Employee Email</Form.Label>
               <Form.Control 
                  type        = "email" 
                  placeholder = "Enter email" 
                  value       = {txtEmail}
                  onChange    = {(e)=> handleEmail(e)}       
               />
            </Col>
         </Row>

         <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
         
            <Col xxl = {4} xl = {6} lg = {6} md = {8} sm = {12}  className = "text-center">
               <Form.Label className = "font-weight-bold">Level</Form.Label>
               <Form.Control as = "select"
                  
                  onChange ={ (e)=> handleLevel(e)}
               >
                  <option>Choose...</option>
                  <option value = "PreSchool">PreSchool</option>
                  <option value = "Elementary">Elementary</option>
                  <option value = "HighSchool">HighSchool</option>
                  <option value = "College">College</option>
               </Form.Control>     
            </Col>

            <Col xxl = {4} xl = {6} lg = {6} md = {8} sm = {10}  className = "text-center">
               <Form.Label className = "font-weight-bold">Department</Form.Label>
               <Form.Control as = "select"
                  onChange ={ (e)=> handleDepartment(e)}
               >
                  <option>Choose...</option>
                  <option value = "Administrative">Administrative</option>
                  <option value = "Academic">Academic</option>
                  <option value = "Direction">Direction</option>
                  <option value = "Support Assistance">Support Assistance</option>
                  <option value = "Sports">Sports</option>
                  <option value = "General Services">General Services</option>
               </Form.Control> 
            </Col>

         </Row>   {/* row de nivel y departamento    */}
         <Row>
         <input id="input-b3" name="input-b3[]" type="file" class="file" multiple 
            data-show-upload="false" data-show-caption="true" data-msg-placeholder="Select {files} for upload..."></input>
         </Row>
      

         <Row >
            <Form.Group className = "col mt-5 mb-3 d-md-flex justify-content-md-center gap-3">
               <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                  <Button className = "customButton" variant = "danger" onClick = {handleCloseNewEmployee}>Cancel</Button>
               </Col>
               <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                  <Button className = "customButton" type    = "submit" variant = "success" disabled = {disabledAdd}>Add</Button>
               </Col>
            
            </Form.Group>    
         </Row>
         
      </Form> 
               
   </div> 
         
  );
}

export default NewEmployee;