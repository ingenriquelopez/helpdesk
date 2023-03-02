import React, { useEffect, useState}     from 'react'
import { Link } from 'react-router-dom';
import Table     from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import ServiceOrder      from './ServiceOrder';
import { ToastContainer } from 'react-toastify';

//import { createListClassRooms } from '../../../redux/classRooms/classRoomsReducer';
import axios from 'axios';
const {REACT_APP_API} = process.env;

function ServiceOrdersViewer() {
  const [listOS,setlistOS]  = useState();
  const getListOS = async()=> {
    try {
        const listServiceOrders = await axios.get(`${REACT_APP_API}/services/level/Absolute`)
        setlistOS(listServiceOrders.data)
    } catch (error) {
        console.log(error.message);
    }
  }
useEffect(() => {
    getListOS();
    //dispatch(createListClassRooms(userLogged.levelUser));
},[])

  return (
    <Container className = "container-fluid py-5">
      <Link to='' /*</Container>'/dashboard/newclassroom'*/>
        <button>Add New Order</button>  
      </Link>
      
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className = "col-auto text-center"># Service</th>
              <th className = "col-auto text-center">document</th>
              <th className = "col-auto text-center">date</th>
              <th className = "col-auto text-center">Status</th>
              <th className = "col-auto text-center">dateDone</th>
              <th className = "col-auto text-center"># Task</th>
              <th className = "col-auto text-center">Cancel</th>
              <th className = "col-auto text-center">Done</th>
            </tr> 
          </thead>
          <tbody>
             {listOS && listOS.map( (c)=> 
              <ServiceOrder key = {c.number} c={c}/>  
            )}
            
          </tbody>
        </Table>
        <ToastContainer 
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />    
    </Container>    
  );
}

export default ServiceOrdersViewer;