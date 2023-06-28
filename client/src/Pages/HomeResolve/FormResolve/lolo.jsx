{/* <Container fluid className ="d-flex align-content-center" id ="containerFormResolve">
      <Row>
         <p>holis</p>
      </Row>
       
      <div className ="dataOfRequest mt-5 container-fluid align-content-center" id = "panelRequest">
   
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

         <Row className = "py-2">
               <Form.Label className = "text-center font-weight-bold">DATE</Form.Label>                
             
                   <Form.Label className = "text-center text-decoration-underline mb-3" > 
                     {moment(dateTaskRequired).format('dddd DD/MMMM/YYYY')}
                  </Form.Label> 
             
         </Row>
         <Row className = "d-md-flex justify-content-center py-2">
               <Form.Label className = "text-center font-weight-bold">GYG</Form.Label>                
               
                  <Form.Label className = "text-center text-decoration-underline mb-3">{taskState.gyg}</Form.Label>

         </Row>
         
         <Row className = "d-md-flex justify-content-center py-2">
               <Form.Label className = "text-center font-weight-bold mt-2"> DEVICE</Form.Label>
               <Form.Label className = "text-center text-decoration-underline mb-3">{taskState.device}</Form.Label>
         </Row>
         <Row className = "d-md-flex justify-content-center py-1">
               <Form.Label className = "text-center font-weight-bold mt-1"> PROBLEM</Form.Label>
               <Form.Control 
                  as    = "textarea"  
                  name  = "problem" 
                  disabled
                  defaultValue = {taskState.problem}
                  className = "text-center mb-3 "
               /> 
            
         </Row>
         
         
      </div> 
   //-----------------RIGHT CONTAINER FORM FOR TO RESOLVE ------------------------ 

/* 
      <div className ="dataOfSolution mt-5 container-fluid align-content-center" id = "panelSolution">
   
     
     <Form onSubmit = { (e) => handleFormResolve(e)} id ="formSolucion">
        {/* <Row className = "d-md-flex justify-content-center py-2"> 
         <div id ="fila1">
            <Form.Label>Set New Status</Form.Label>
         </div>

           
            
              <Form.Select onChange = { (e)=> handleNewStatus(e.target.value)}>
                 <option value = "Process"  >Process</option>
                 <option value = "Completed">Completed</option>
                 <option value = "Rejected" >Rejected</option>
              </Form.Select>

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
                             </button> 
                                         {isOpenDR && (<DatePicker selected={newDateReview} onChange={ (date) => handleChangeDateReview(date)} inline />  )}  
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
                          //defaultValue = {taskState.notes}
                          className    = "text-center mb-0 "
                          value        = {newNotes}
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
                          //defaultValue = {taskState.orderService} 
                          value        = {newOrderService ? newOrderService:''}
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
                                      
                                   </button>
                                   {isOpenDREJ && (<DatePicker selected={newDateRejected} onChange={ (date) => handleChangeDateRejected(date)} inline />  )} 
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
                          disabled     = {disableCOMPLETED}
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
                                <button disabled = {disableCOMPLETED} className = {newDateSolution ? "btn-success" : "btn-light"}
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
   
      
      
   
   <NewService  numrequest         = { taskState.number }    
                show               = { modalShow }      
                onHide             = { () => setModalShow(false) }   
                newOrderService    = { newOrderService }
                setnewOrderService = { setnewOrderService }
                level              = { taskState.level }
   />
       <ToastContainer/> 
      
    </Container>
 */