import React, { useState , useEffect} from 'react'
import { useNavigate  }         from 'react-router-dom';
import { useLocalStorage }      from '../../../js/useLocalStorage';
import Button                   from 'react-bootstrap/Button';
import Form                     from 'react-bootstrap/Form';
import Row                      from 'react-bootstrap/Row';
import Col                      from 'react-bootstrap/Col';

import { Image,CloudinaryContext, Transformation } from 'cloudinary-react';

import axios                    from 'axios';
import { tostada_S, tostada_W } from '../../../utils/Tostadas';
import "./NewEmployee.css";


const { REACT_APP_API } = process.env;

const { REACT_APP_CLOUDINARY_CLOUD_NAME, 
   REACT_APP_CLOUDINARY_UPLOAD_PRESET} = process.env;



// de momento no se esta utilizando
//const arrayLevels = [ "PreSchool", "Elementary", "HighSchool", "College","Global","Absolute"];

function NewEmployee() {
    const navigate= useNavigate();
    
    const [txtNumEmployee , setTxtNumEmployee]  = useState('');
    const [txtName        , setTxtName]         = useState('');
    const [txtEmail       , setTxtEmail]        = useState('');
    const [txtLevel       , setTxtLevel]        = useState('');
    const [txtDepartment  , setTxtDepartment]   = useState('');
    const [disabledAdd    , setdisabledAdd]     = useState(true);
    const [userLogged     , setUserLogged]      = useLocalStorage('userLogged');
    const [genere         , setGenere]          = useState('');

    
     const defaultFile = 'https://stonegatesl.com/wp-content/uploads/2021/01/avatar-300x300.jpg'; 
    
    const [backColorEmail, setBackColorEmail] = useState('1px solid #ccc');
    const [backColorName, setBackColorName] = useState('1px solid #ccc');

    
    const [urlPicture, updateUrlPicture] = useState();
    const [public_id, updatePublic_id] = useState('');
    const [error, updateError] = useState();
    
    


    /* creacion del widget de cloudinary par ael upload de las imagenes posteriores*/
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: REACT_APP_CLOUDINARY_CLOUD_NAME,
        uploadPreset: REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          updatePublic_id(result.info.public_id);
          updateUrlPicture(result.info.secure_url)        }
      }
    );
    /*--------------------------------------------------------------------------*/

    /*----------------------------------*/
    const validEmailPreviewImage =async () => {      
      
      if ( await yaExisteEmail(txtEmail) ) {
         
         setBackColorEmail('1px solid #D87A66');
         return false; /* no deberia avanzar en el sig. paso */
      } else  {
         setBackColorEmail('1px solid #ccc');
         return true;
      }
    }

   /*----------------------------------*/
   const validNamePreviewImage =async () => {      
   if ( !txtName) {
      setBackColorName('1px solid #D87A66');
      return false; /* no deberia avanzar en el sig. paso */
   } else  {
      setBackColorName('1px solid #ccc');
      return true;
   }
   }
   

    /* -------------------*/
    
    

    /*-----------------------------------*/
    const handleOnClick = ()=> {
      
       myWidget.open();

    }
   
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
      if (txtNumEmployee && txtName && txtEmail && urlPicture) { 
         setdisabledAdd(false)
      }  else setdisabledAdd(true)

      validEmailPreviewImage();
      validNamePreviewImage();
   }
   
   function handleNumEmployee(e) {
      setTxtNumEmployee(e.target.value.toLowerCase());
      validateForm();
   }
   
   function handleName(e) {
      
      setTxtName(e.target.value.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase()))) );
      validateForm();
   }
   

   const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(email));
    };


   function handleEmail(e) {
      setdisabledAdd(true)
      
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
                  picture     : urlPicture,
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

useEffect( ()=> {
console.log(urlPicture)
validateForm();
}, [urlPicture,txtName]);




  return (   
   <div className="d-flex mb-0 d-md-flex justify-content-center"  id = "containerEmployee">
      
      <div className="titleEmployee">
         <div className = "text-center">
            <h5> ADD NEW EMPLOYEE</h5>
         </div>           
      </div> 
      
      <CloudinaryContext cloudName= {REACT_APP_CLOUDINARY_CLOUD_NAME}>
         <form className = "row d-md-flex justify-content-center" onSubmit={(e) => handleSubmitForm(e)} id = "form">
            
            <div className="row" id = "fieldsUpper">
               <div className="col-3 ">
                     <Form.Label className = "font-weight-bold">Num Employee</Form.Label>
                     <Form.Control 
                              type        = "text" 
                              placeholder = "#" 
                              value       = {txtNumEmployee}
                              onChange    = {(e)=> handleNumEmployee(e)}       
                     />
               </div>
               <div className="col-7">
                  <Form.Label >Employee Name</Form.Label>
                     <Form.Control 
                        type        = "name" 
                        id          = "nameEmployee"
                        placeholder = "Enter Name" 
                        value       = {txtName}
                        onChange    = { (e)=> handleName(e)}       
                     />
               </div>
               <div className="col-2">
                  <Form.Label className = "font-weight-bold">Genere</Form.Label>

                  <Form.Group controlId="genere">
                     <Form.Check
                        value = "Female"
                        type  = "radio"
                        
                        label    = "Female"
                        onChange = {handleChangeGenere} 
                        checked  = {genere === "Female"}
                     />
                     <Form.Check
                        value = "Male"
                        type = "radio"

                        label = "Male"
                        onChange={handleChangeGenere} 
                        checked = {genere === "Male"}
                     />
                  </Form.Group>
               </div>
            </div>
            <div className="row mt-3 mb-3 py-2 md-flex justify-content-start" id = "spaceCentral">
               <div className="col-7 leftSpace">
                  <Form.Label className = "font-weight-bold">Employee Email</Form.Label>
                  <Form.Control 
                        type        = "email" 
                        placeholder = "Enter email" 
                        value       = {txtEmail}
                        style = {{border: backColorEmail }}   
                        onChange    = {(e)=> handleEmail(e)}       
                     />
                     <Form.Label className = "font-weight-bold mt-3">Level</Form.Label>
                           <Form.Control as = "select"
                              
                              onChange ={ (e)=> handleLevel(e)}
                              className = "col-6"
                           >
                              <option>Choose...</option>
                              <option value = "PreSchool">PreSchool</option>
                              <option value = "Elementary">Elementary</option>
                              <option value = "HighSchool">HighSchool</option>
                              <option value = "College">College</option>
                           </Form.Control>    
                           <Form.Label className = "font-weight-bold mt-3">Department</Form.Label>
                           <Form.Control as = "select"
                              className = "col-8"
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

               </div>
               <div className="rightSpace col-5">
                  <div className="col-12" id ="spaceBtnUpload">
                     <button className="cloudinary-button" onClick={handleOnClick}>
                        Upload an Employee Image
                     </button>

                     <div id = "spaceImage" className = "col-12 mt-2">   
                        <Image
                           cloudName    = {REACT_APP_CLOUDINARY_CLOUD_NAME}
                           uploadPreset = {REACT_APP_CLOUDINARY_UPLOAD_PRESET}
                           secure       = "true"
                           public_id    = {public_id}
                           
                           id           = "employeePicture"
                        >
                        <Transformation width="100" height="120" crop="fill" />
                        </Image>
                     </div>
                  </div> 
               </div>
               
            </div>
            
                     
                  
            <Row >
               <Form.Group className = "col mt-2 mb-3 d-md-flex justify-content-md-center gap-3">
                  <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                     <Button className = "customButton" variant = "danger" onClick = {handleCloseNewEmployee}>Cancel</Button>
                  </Col>
                  <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                     <Button className = "customButton" type    = "submit" variant = "success" disabled = {disabledAdd}>Add</Button>
                  </Col>
               
               </Form.Group>    
            </Row>
         </form>
      </CloudinaryContext>
      
      
               
   </div> 
         
  );
}

export default NewEmployee;