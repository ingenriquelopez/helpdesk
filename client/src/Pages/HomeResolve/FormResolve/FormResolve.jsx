import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NewService from '../../../Components/Services/NewService/NewService';
import { tostada_S, tostada_W } from '../../../utils/Tostadas';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import axios from 'axios'



function FormResolve( {propNumber}) {
   const navigate = useNavigate();
   const [modalShow, setModalShow] = useState(false);

   const [taskState        ,       settaskState]    = useState('');
   /* state para campos individuales que despues formaran el registro para el endpoint */
   const [newStatus        ,       setnewStatus]    = useState('Process');
   const [dateTaskRequired , setdateTaskRequired]   = useState('');
   const [newDateReview    ,   setnewDateReview]    = useState('');
   const [newNotes         ,        setnewNotes]    = useState('');
   const [newDateRejected  ,setnewDateRejected]     = useState('');
   const [newReason        ,        setnewReason]   = useState('');
   const [newSolution      ,     setnewSolution]    = useState('');
   const [newDateSolution  , setnewDateSolution]    = useState('');
   const [newOrderService  , setnewOrderService]    = useState('');
   const [disabledOS       ,      setdisabledOS]    = useState(false);
   const [disabledOM       ,      setdisabledOM]    = useState(false);

   const [startDate        , setStartDate]          = useState('');
   const [isOpenDR         , setIsOpenDR]           = useState(false);
   const [isOpenDS         , setIsOpenDS]           = useState(false);
   const [isOpenDREJ       , setIsOpenDREJ]         = useState(false);

   const {REACT_APP_API} = process.env;
      
   //---------------MOSTRAR EL MODAL DE NewService.jsx ---------------------//
   const handleShowService       = () =>  setModalShow(true);   

    const findTaskOnDB = async() => {
      try {
         const statusTask = await axios.get(`${REACT_APP_API}/status/${propNumber}`);
         if (statusTask) {
            settaskState(statusTask.data);
            setnewNotes(statusTask.data.notes);
            setnewReason(statusTask.data.reasonRejected);
            
               
            statusTask.data.orderService  ? setdisabledOS(true): setdisabledOS(false);
            statusTask.data.orderService ? setnewOrderService(statusTask.data.orderService)    : setnewOrderService('');

            let dt = new Date(statusTask.data.dateTask);
            dt.setTime(Date.parse(statusTask.data.dateTask));
            statusTask.data.dateTask ? setdateTaskRequired(dt) : setdateTaskRequired('');
            
            
            let dr = new Date(statusTask.data.dateReview);
            statusTask.data.dateReview ? setnewDateReview(dr) : setnewDateReview('');
            statusTask.data.dateReview ? setStartDate(dr): setStartDate(new Date());

                        
            let drej = new Date(statusTask.data.dateRejected);
            statusTask.data.dateRejected ? setnewDateRejected(drej) : setnewDateRejected('');
            


            let ds = new Date();
            ds.setTime(Date.parse(statusTask.data.dateSolution))
            statusTask.data.dateSolution ? setnewDateSolution(ds) : setnewDateSolution('');
            
            
            return(statusTask.data)
         }   
         return statusTask;
      } catch (error) {
         console.log(error.message);
      }
    }


    const saveStatusProcess = async()=> {
         const dataOfNewState= {
            number        : taskState.number,
            statusTask    : newStatus,
            dateReview    : newDateReview,
            notes         : newNotes,
            solution      : '',
            dateSolution: null,
            orderService  : newOrderService,
         }
         try {
            const response = await axios.put(`${REACT_APP_API}/status`,dataOfNewState);
            tostada_S('Changing Status to PROCESS',"top-right",2500,'colored');
            setTimeout( ()=> { navigate('/home', { replace: true })},2500)              
            navigate('/home');
            return response;

         } catch (error) {
            console.log(error.message);
         }
    }

    const saveStatusRejected = async()=> {
      const dataOfNewState= {
         number        : taskState.number,
         statusTask    : newStatus,
         dateRejected  : newDateRejected,
         reasonRejected: newReason,
         solution      : '',
         dateSolution: null,
      }
      try {
         const response = await axios.put(`${REACT_APP_API}/status`,dataOfNewState);
         tostada_S('Changing Status to PROCESS',"top-right",2500,'colored');
         setTimeout( ()=> { navigate('/home', { replace: true })},2500)              
         navigate('/home');
         return response;

      } catch (error) {
         console.log(error.message);
      }
 }

    const saveStatusCompleted = async()=> {
      let canContinue = false;
      if (!newOrderService) canContinue = true;
      else {
         let response = await axios.get(`${REACT_APP_API}/services/number/${newOrderService}`);
         if (response.data.serviceStatus ==='Done')  canContinue = true;
         else canContinue = false;
      }
      
      if (canContinue) {
         const dataOfNewState= {
            number        : taskState.number,
            statusTask    : newStatus,
            solution      : newSolution,
            dateSolution  : newDateSolution,
         }
         try {
            const response = await axios.put(`${REACT_APP_API}/status`,dataOfNewState);
            tostada_S('Changing Status to COMPLETED',"top-right",2500,'colored');
            setTimeout( ()=> { navigate('/home', { replace: true })},2500)              

            navigate('/home');
            return response;
         } catch (error) {
            console.log(error.message);
         }
      } else {
            tostada_W('Service not Done yet!',"top-center",2500,'dark');
            setTimeout( ()=> { navigate('/home', { replace: true })},2500)              
         } 
    }

    /*  ______________________H A N D L E R S __________________________ */
    const handleNewStatus = (e)=> {
      setnewStatus(e)
    }
    const handleNewNotes = (e)=> {
      setnewNotes(e)
    }

    const handleNewReason = (e)=> {
      setnewReason(e)
    }

    const handleNewOrderService = (e)=> {
      setnewOrderService(e);
    }
    
    const handleCancel=()=> {
      navigate('/home');
    }

    const handleNewSolution = (e)=> {
      setnewSolution(e)
    }

    const handleFormResolve = (e) => {
      e.preventDefault();
      if (newStatus === 'Process')   saveStatusProcess();
      if (newStatus === 'Completed') saveStatusCompleted();
      if (newStatus === 'Rejected')  saveStatusRejected();
    }
    const handleLgClose =()=> {
      setModalShow(false);
    }

    
    const thereAreDoc =async()=> {
      try {
         const response = await axios.get(`${REACT_APP_API}/configServiceOrder`);
         if (response.data.length <= 0)setdisabledOS (true);   
      } catch (error) {
         console.log(error.message)
      }
      
    }

    const handleChangeDateReview   = (date) => {
      setIsOpenDR(!isOpenDR);
      setnewDateReview(date);
    };

    const handleClickDateReview    = (e) => {
      e.preventDefault();
      setIsOpenDR(!isOpenDR);
    }

    const handleClickDateRejected    = (e) => {
      e.preventDefault();
      setIsOpenDREJ(!isOpenDREJ);
    }
    const handleChangeDateRejected   = (date) => {
      setIsOpenDREJ(!isOpenDREJ);
      setnewDateRejected(date);
    };

    const handleChangeDateSolution  = (e) => {
      setIsOpenDS(!isOpenDS);
      setnewDateSolution(e);
    };

    const handleClickDateSolution  = (e)=> {
      e.preventDefault();
      setIsOpenDS(!isOpenDS);
    }



    useEffect( ()=> {
        findTaskOnDB();
        thereAreDoc();
    },[])

  return (

    <Container fluid className ="d-md-flex">
      <div className ="dataOfRequest mt-5 container-fluid">
         <Row className = "d-md-flex justify-content-center py-2">
            <Col xl = {4} lg = {4} md = {4} sm className = "text-center" >
               <Form.Label className ="text-center font-weight-bold" htmlFor='number'>NUMBER REQUEST</Form.Label>   
               <Form.Control 
                  disabled 
                  className    = "text-center" 
                  type         = "text" 
                  defaultValue = {taskState.number} 
               />
            </Col>
            <Col xl = {4} lg = {4} md = {4} sm className = "text-center" >
               <Form.Label className ="text-center font-weight-bold" htmlFor='number'>CURRENT STATUS</Form.Label>   
               <Form.Control 
                  disabled 
                  className    = "text-center" 
                  type         = "text" 
                  defaultValue = {taskState.statusTask} 
               />
            </Col>
         </Row>
         <Row className = "d-md-flex justify-content-center py-2">
            <Col xl = {6} lg = {6} md = {6} sm className = "text-center">
               <Form.Label className = "text-center font-weight-bold">DATE</Form.Label>                
               <Row>
                   <Form.Label className = "text-center text-decoration-underline mb-3" > 
                     {moment(dateTaskRequired).format('dddd DD/MMMM/YYYY')}
                  </Form.Label> 
               </Row>
               
            </Col>
         </Row>
         <Row className = "d-md-flex justify-content-center py-2">
            <Col xl = {4} lg = {4} md = {4} sm className = "text-center" >            
               <Form.Label className = "text-center font-weight-bold">GYG</Form.Label>                
               <Row>
                  <Form.Label className = "text-center text-decoration-underline mb-3">{taskState.gyg}</Form.Label>
               </Row>               
            </Col>
         </Row>
         
         <Row className = "d-md-flex justify-content-center py-2">
            <Col xl = {4} lg = {4} md = {4} sm className = "text-center" >            
               <Form.Label className = "text-center font-weight-bold mt-2"> DEVICE</Form.Label>
               <Row>
               <Form.Label className = "text-center text-decoration-underline mb-3">{taskState.device}</Form.Label>
               </Row>
            </Col>
         </Row>
         <Row className = "d-md-flex justify-content-center py-1">
            <Col xl = {12} lg = {12} md = {12} sm className = "text-center" >   
               <Form.Label className = "text-center font-weight-bold mt-1"> PROBLEM</Form.Label>
               <Form.Control 
                  as    = "textarea"  
                  name  = "problem" 
                  disabled
                  defaultValue = {taskState.problem}
                  className = "text-center mb-3 "
               /> 
            </Col>
         </Row>
         
        
      </div>
   {/* -----------------RIGHT CONTAINER FORM FOR TO RESOLVE ------------------------ */}
   <Container>
      <div className ="dataOfSolution mt-5 container-fluid d-grid">
         <Form onSubmit = { (e) => handleFormResolve(e)}>
            <Row className = "d-md-flex justify-content-center py-2">
               <Col xl = {4} lg = {4} md = {4} sm className = "text-center" >
                  <Form.Label>Set New Status</Form.Label>
                  <Form.Select onChange = { (e)=> handleNewStatus(e.target.value)}>
                     <option value = "Process"  >Process</option>
                     <option value = "Completed">Completed</option>
                     <option value = "Rejected" >Rejected</option>
                  </Form.Select>
               </Col>
            </Row>
            {
               newStatus ==='Process' 
               ? 
                  <>
                     <Row className = "d-md-flex justify-content-center py-1">
                         <Col xl = {12} lg = {12} md = {12} sm className = "text-center">            
                           <Form.Label className = "text-center font-weight-bold mt-1">REVIEW DATE</Form.Label>
                        </Col>
                        <Col xl = {5} lg = {5} md = {5} sm className = "text-center">            
                           <Row className = "d-md-flex justify-content-center py-1">
                              <Col>
                                 <button className = {newDateReview ? "btn-info" : "btn-light"}
                                    onClick = { (e) => handleClickDateReview(e) } 
                                 >
                                 {newDateReview ? moment(newDateReview).format("dddd DD/MMMM/YYYY"): 'Date...?' }
                                 {isOpenDR && (<DatePicker selected={newDateReview} onChange={ (date) => handleChangeDateReview(date)} inline />  )} 
                                 
                                 </button>
                              </Col>
                           </Row>
                        </Col> 
                     </Row>
                     <Row className = "d-md-flex justify-content-center py-1">
                         <Col xl = {12} lg = {12} md = {12} sm className = "text-center" >   
                           <Form.Label className = "text-center font-weight-bold mt-1"> NOTES</Form.Label>
                           <Form.Control 
                              as           = "textarea"  
                              name         = "notes" 
                              defaultValue = {taskState.notes}
                              className    = "text-center mb-0 "
                              onChange     = { (e)=> handleNewNotes(e.target.value)}
                           />
                        </Col>
                     </Row> 
                     <Row className = "d-md-flex justify-content-center py-2 mt-0">
                        <Col xl = {3} lg = {3} md = {3} sm className = "text-center">
                           <Button disabled = {disabledOS} variant = "link" onClick = { ()=> handleShowService()}>Order Service:</Button>
                           <Form.Control 
                              disabled     
                              className    = "text-center" 
                              type         = "text" 
                              defaultValue = {taskState.orderService} 
                              onChange     = { (e)=> handleNewOrderService(e.target.value)}
                           />
                        </Col>
                     </Row> 
                  </>
               : 
                  newStatus === 'Rejected' 
                     ?
                        <>
                           <Row className = "d-md-flex justify-content-center py-1">
                              <Col xl = {12} lg = {12} md = {12} sm className = "text-center">            
                                 <Form.Label className = "text-center font-weight-bold mt-1">REJECTED DATE</Form.Label>
                              </Col>
                              <Col xl = {5} lg = {5} md = {5} sm className = "text-center">            
                                 <Row className = "d-md-flex justify-content-center py-1">
                                    <Col>
                                       <button className = {newDateRejected ? "btn-info" : "btn-light"}
                                          onClick = { (e) => handleClickDateRejected(e) } 
                                       >
                                          {newDateRejected ? moment(newDateRejected).format("dddd DD/MMMM/YYYY"): 'Date...?' }
                                          {isOpenDREJ && (<DatePicker selected={newDateRejected} onChange={ (date) => handleChangeDateRejected(date)} inline />  )} 
                                       </button>
                                    </Col>
                                 </Row>
                              </Col>
                           </Row>
                           <Row className = "d-md-flex justify-content-center py-1">
                              <Col xl = {12} lg = {12} md = {12} sm className = "text-center" >   
                                 <Form.Label className = "text-center font-weight-bold mt-1"> REASON REJECTED</Form.Label>
                                 <Form.Control 
                                    as           = "textarea"  
                                    name         = "reason" 
                                    defaultValue = {taskState.reasonRejected }
                                    className    = "text-center mb-0 "
                                    onChange     = { (e)=> handleNewReason(e.target.value)}
                                 />
                              </Col>
                           </Row> 
                        </>
                     : 
                     <>
                     <Row className = "d-md-flex justify-content-center py-1">
                         <Col xl = {12} lg = {12} md = {12} sm className = "text-center" >   
                          <Form.Label className = "text-center font-weight-bold mt-1">S O L U T I O N</Form.Label>
                          <Form.Control 
                              as           = "textarea"  
                              name         = "solution" 
                              defaultValue = {taskState.solution}
                              className    = "text-center mb-3 "
                              disabled     = {disabledOS}
                              onChange     = { (e)=> handleNewSolution(e.target.value) }
                           />
                         </Col>
                        </Row>
                        <Row className = "d-md-flex justify-content-center py-1">
                           <Col xl = {12} lg = {12} md = {12} sm className = "text-center" >            
                              <Form.Label className = "text-center font-weight-bold mt-1">SOLVE DATE</Form.Label>
                           </Col>
                           <Col xl = {5} lg = {5} md = {5} sm className = "text-center">            
                                 <Row className = "d-md-flex justify-content-center py-1">
                                    <button disabled = {disabledOS} className = {newDateSolution ? "btn-success" : "btn-light"}
                                          onClick = { (e) => handleClickDateSolution(e) }
                                    >      
                                    {newDateSolution ? moment(newDateSolution).format("dddd DD/MMMM/YYYY"): 'Date...?' }
                                       
                                    </button>
                                    {isOpenDS && (<DatePicker showIcon = {true} selected={newDateSolution} onChange={ (date) => handleChangeDateSolution(date)} inline />  )} 
                                 </Row>
                              </Col>
                        </Row>
                     </>
         }
         
            <Row className = "d-md-flex justify-content-center py-1">
               <Col xl = {3} lg = {3} md = {3} sm className = "text-center" >
                  <Button variant = "danger" onClick = { (e)=> {handleCancel(e)}}>Cancel</Button>
               </Col>
               <Col xl = {3} lg = {3} md = {3} sm className = "text-center">
                  <Button 
                        type     = "submit" 
                        variant  = "success"
                        disabled = { newStatus ==='Completed' && !newDateSolution ? true: false}
                        
                  >
                     Apply
                  </Button>
               </Col>
            </Row>
         </Form>
      </div>
   </Container>
   <NewService  numrequest         = { taskState.number }    
                show               = { modalShow }      
                onHide             = { () => setModalShow(false) }   
                newOrderService    = { newOrderService }
                setnewOrderService = { setnewOrderService }
                level              = { taskState.level }
   />
       <ToastContainer/> 
    </Container>

  )
}

export default FormResolve