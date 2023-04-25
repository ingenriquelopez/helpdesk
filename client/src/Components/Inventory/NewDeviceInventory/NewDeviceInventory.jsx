import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion }                      from 'framer-motion/dist/framer-motion';
import { useNavigate  }                from 'react-router-dom';
import { useLocalStorage }             from '../../../js/useLocalStorage';
import DatePicker               from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button    from 'react-bootstrap/Button';
import Form      from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import "./NewDeviceInventory.css";
import axios from 'axios';
import { tostada_S, tostada_W } from '../../../utils/Tostadas';
import moment from 'moment';

const {REACT_APP_API} = process.env;

function NewDeviceInventory() {
    const navigate= useNavigate();
    const [disabledAdd, setdisabledAdd]  = useState(true);
    const { listCR:listOfClassRooms }    = useSelector ( (state) => state.classRooms);
    const [userLogged, setUserLogged]    = useLocalStorage('userLogged');
    
    const [txtinternalCode , setTxtinternalCode]    = useState('');
    const [txtserial       , setTxtserial]          = useState('');
    const [txtdevice       , setTxtdevice]          = useState('');
    const [txttrade        , setTxttrade]           = useState('');
    const [txtmodel        , setTxtmodel]           = useState('');
    const [txtcolor        , setTxtcolor]           = useState('');
    const [txtroom         , setTxtroom]            = useState('');
    const [txtlevel        , setTxtlevel]           = useState('');
    const [txtcampus       , setTxtcampus]          = useState('');
    const [txtuserDevice   , setTxtuserDevice]      = useState('');
    const [txtdocRes       , setTxtdocRes]          = useState('');
    const [txtdocPur       , setTxtdocPur]          = useState('');
    const [txtnote         , setTxtnote]            = useState('');
    const [txtcheckedBy    , setTxtcheckedBy]       = useState('');
    const [txtlastRevision , setTxtlastRevision ]   = useState();

    const [isOpenDR         , setIsOpenDR]           = useState(false);
    const statusDefault = "Operating";

    
   

    const animations = {
      initial: { opacity: 0, x: 0 },
      animate: { opacity: 1, x: 0 },
  };
  
    const yaExisteInternalCode = async()=> {
      try {
         /* buscamos el code en db */
         const response = await axios.get(`${REACT_APP_API}/inventory/code/${txtinternalCode}`, {
            headers: {
               "authorization": `Bearer ${userLogged.userToken}`,
            }
            });
            
           if (response.data) return true

         } catch (error) {
            console.log(error.message)
         }
         return false
    }

    function validateForm() {
      if (txtinternalCode && txtdevice && txtroom) setdisabledAdd(false)
      else setdisabledAdd(true) 
    }

    function handleInternalCode(e) {
        setTxtinternalCode(e.target.value.toUpperCase());
        validateForm();
    }

   function handleSerial(e) {
      setTxtserial(e.target.value.toUpperCase());
      validateForm();
   }

   const handleDevice = (e) => {
      setTxtdevice(e.target.value.toUpperCase());
      validateForm();
   }
 
   const handleTrade = (e) => {
      setTxttrade(e.target.value.toUpperCase());
      validateForm();
   }

   const handleModel = (e) => {
      setTxtmodel(e.target.value.toUpperCase());
      validateForm();
   }

   const handleColor = (e) => {
      setTxtcolor(e.target.value.toUpperCase());
      validateForm();
   }

 
   function handleRoom(e) {  
      let ncr = e.target.value;

      if (ncr!== 'none' && ncr) {
          let listClassRooms = listOfClassRooms.find( (element)=> element.classRoom === ncr);
          setTxtroom(listClassRooms.classRoom);
          setTxtlevel(listClassRooms.level);
          setTxtcampus(listClassRooms.campus);
      } else {
          setTxtlevel('');
          setTxtcampus('');
      }
      validateForm();
  }
   
   function handleuserDevice(e) {
      setTxtuserDevice(e.target.value.toUpperCase());
      validateForm();   
   }

   function handleDocRes(e) {
      setTxtdocRes(e.target.value.toUpperCase());
      validateForm();   
   }

   function handleDocPur(e) {
      setTxtdocPur(e.target.value.toUpperCase());
      validateForm();   
   }

   
   function handleNote(e) {
      setTxtnote(e.target.value.toUpperCase());
      validateForm();   
   }

   const handleClickDateReview    = (e) => {
      e.preventDefault(); 
      setIsOpenDR(!isOpenDR);
    }
    const handleChangeDateReview   = (date) => {
      setIsOpenDR(!isOpenDR);
      setTxtlastRevision(date);
    };
   

   function handleCheckedBy(e) {
      setTxtcheckedBy(e.target.value.toUpperCase());
      validateForm();   
   }


   async function handleSubmitForm(e) {
      e.preventDefault();
      validateForm();
      
      if (!disabledAdd) {
               const NewDeviceInventory = {
                  internalCode  : txtinternalCode,
                  serial        : txtserial,
                  device        : txtdevice,
                  trade         : txttrade,
                  model         : txtmodel,
                  color         : txtcolor,
                  room          : txtroom,
                  level         : txtlevel,
                  campus        : txtcampus,
                  userDevice    : txtuserDevice,
                  docRes        : txtdocRes,
                  docPur        : txtdocPur, 
                  lastRevision  : txtlastRevision,
                  note          : txtnote,
                  checkedBy     : txtcheckedBy,
                  status        : statusDefault,
               }

               const YA_EXISTE =  await yaExisteInternalCode(txtinternalCode);
               if ( YA_EXISTE ) {
                  tostada_W(`Internal Code: ${txtinternalCode} already exists`,"top-center",1500,'dark');
               } else 
                  {
                  try {
                     const response = await axios.post(`${REACT_APP_API}/inventory`,NewDeviceInventory, {
                        headers: {
                            "authorization": `Bearer ${userLogged.userToken}`,
                        }
                        });
                     if (response) {
                        if (response.data.message==='El token NO es valido!') {
                           navigate('/login' );    
                           tostada_W(response.data.message,"top-center",1500,'dark');
                           return
                     
                        } else {
                           // aviso de la mision fue un exito
                           tostada_S('New Device to Inventory DONE!',"top-center",1500,'light');
                        } 
                     }
                     navigate('/dashboard/viewerInventory', { replace: true });    
                  } catch (error) {
                     console.log("ERROR:" ,error.message);
                     return 
                     } 
               }
      } 
   }
         

   const handleCloseNewDeviceInventory =()=> {
      navigate('/dashboard/viewerInventory', { replace: true});
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
                        <Col xxl = {3} xl = {4} lg = {4} md = {6} sm = {12} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                              <Form.Label>Internal Code</Form.Label>
                              <Form.Control 
                                 type        = "text" 
                                 placeholder = "Enter internal code" 
                                 value       = {txtinternalCode}
                                 onChange    = {(e)=> handleInternalCode(e)}      
                              />
                            </Form.Group>
                        </Col>
                        
                        <Col xxl = {3} xl = {4} lg = {4} md = {6} sm = {12} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                              <Form.Label>Serial</Form.Label>
                              <Form.Control 
                                 type        = "text" 
                                 placeholder = "Enter serial number" 
                                 value       = {txtserial}
                                 onChange    = {(e)=> handleSerial(e)}      
                              />
                            </Form.Group>
                        </Col>

                        <Col xxl = {3} xl = {4} lg = {4} md = {6} sm = {12} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                              <Form.Label>Device</Form.Label>
                              <Form.Control 
                                 type        = "text" 
                                 placeholder = "Enter type of device" 
                                 value       = {txtdevice}
                                 onChange    = {(e)=> handleDevice(e)}      
                              />
                           </Form.Group>
                        </Col>
                    </Row>

                    {/* ----SEGUNDA FILA  */}
                    <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {2} xl = {2} lg = {3} md = {6} sm = {12} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Trade</Form.Label>
                                    <Form.Control 
                                       type        = "text" 
                                       
                                       value       = {txttrade}
                                       onChange    = {(e)=> handleTrade(e)}      
                                    />
                            </Form.Group>
                        </Col>
                        <Col xxl = {2} xl = {2} lg = {3} md = {6} sm = {12} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control 
                                       type        = "text" 
                                       value       = {txtmodel}
                                       onChange    = {(e)=> handleModel(e)}      
                                    />
                            </Form.Group>
                        </Col>

                        <Col xxl = {2} xl = {2} lg = {3} md = {6} sm = {12} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control 
                                       type        = "text" 
                                       value       = {txtcolor}
                                       onChange    = {(e)=> handleColor(e)}      
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
    
                    {/* --- TERCERA FILA ---- */}
                    <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                           <Form.Group className="mb-3 mx-auto" >
                              <Form.Label className="text-center">Room</Form.Label>
                              <Form.Select options = {listOfClassRooms} 
                                 onChange = { (e)=> handleRoom(e) }                               
                              >
                               <option defaultValue = {txtroom}></option>
                                      
                                 {listOfClassRooms.map( (elemento)=> (  (elemento.level === userLogged.levelUser) || (userLogged.levelUser ==='Absolute') ? <option key={elemento.classRoom} value = {elemento.classRoom}>{elemento.classRoom}</option>
                                     :
                                     null
                                     ))}
                              </Form.Select>
                            </Form.Group>
                        </Col>


                        <Col xxl = {2} xl = {2} lg = {3} md = {6} sm = {12} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>level</Form.Label>
                                    <Form.Control 
                                       type        = "text" 
                                       value       = {txtlevel}
                                       disabled
                                    />
                            </Form.Group>
                        </Col>

                        <Col xxl = {2} xl = {2} lg = {3} md = {6} sm = {12} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>campus</Form.Label>
                                    <Form.Control 
                                       type        = "campus" 
                                       value       = {txtcampus}
                                       disabled
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                        
                    {/* --- CUARTA FILA ---- */}
                    <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                           <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>User Assigned</Form.Label>
                                    <Form.Control 
                                       type        = "text" 
                                       value       = {txtuserDevice}
                                       onChange    = {(e)=> handleuserDevice(e)}      
                                    />
                            </Form.Group>
                        </Col>
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Document Responsability</Form.Label>
                                    <Form.Control 
                                       type        = "docRes" 
                                       value       = {txtdocRes}
                                       onChange    = {(e)=> handleDocRes(e)}      
                                    />
                            </Form.Group>
                        </Col>

                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                            <Form.Group className = "mb-3 mx-auto" >
                                    <Form.Label>Document Purchase</Form.Label>
                                    <Form.Control 
                                       type        = "docCom" 
                                       value       = {txtdocPur}
                                       onChange    = {(e)=> handleDocPur(e)}      
                                    />
                            </Form.Group>
                        </Col>
                    </Row>

                {/* --- QUINTA  FILA ---- */}
                <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                  <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                     <Form.Group className = "mb-3 mx-auto" >                  
                        <button className = "btn btn-light" onClick = { (e) => handleClickDateReview(e) } > 
                           Date Last Revision ...
                        </button> 
                        <Form.Control 
                           type        = "text" 
                           value       = {moment(txtlastRevision).format("dddd DD/MMMM/YYYY")}
                           onChange    = {(e)=> handleChangeDateReview(e)}      
                        />                     
                        {isOpenDR && (<DatePicker selected={txtlastRevision} onChange={ (date) => handleChangeDateReview(date)} inline />  )}  
                     </Form.Group>
                  </Col>
                  
                  <Col xxl = {4} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                     <Form.Group className = "mb-3 mx-auto" >
                        <Form.Label>Notes</Form.Label>
                        <Form.Control 
                           as             = "textarea"
                           placeholder = "Enter note" 
                           value       = {txtnote}
                           onChange    = {(e)=> handleNote(e)}      
                        />
                      </Form.Group>
                  </Col>

                  <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {8} className = "text-center"> 
                     <Form.Group className = "mb-3 mx-auto" >
                        <Form.Label>Checked By</Form.Label>
                        <Form.Control 
                           type        = "checkedBy" 
                           placeholder = "Enter name " 
                           value       = {txtcheckedBy}
                           onChange    = {(e)=> handleCheckedBy(e)}      
                        />
                     </Form.Group>
                  </Col>
               </Row>
                  <Row >
                     <Form.Group className = "col mt-5 mb-3 d-md-flex justify-content-md-center gap-3">
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                            <Button className = "customButton" variant = "danger" onClick = {handleCloseNewDeviceInventory}>Cancel</Button>
                        </Col>
                        <Col xxl = {3} xl = {4} lg = {4} md = {5} sm = {12} className = "text-center">
                           <Button className = "customButton" type    = "submit" variant = "success" disabled = {disabledAdd}>Save</Button>
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