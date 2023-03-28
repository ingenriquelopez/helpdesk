import React, { useEffect, useState }     from 'react'
import { useNavigate  }     from 'react-router-dom';
import { Link } from 'react-router-dom';
import Table     from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import User      from './User';
import { tostada_W } from '../../utils/Tostadas';


import axios from 'axios';
import './ViewerUsers.css';
import { useLocalStorage } from '../../js/useLocalStorage';

const {REACT_APP_API} = process.env;

function ViewerUsers() {
  const navigate= useNavigate();

  const [listUsers, setListUsers] = useState(null);
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
      
   //----------------------------------------------------------
  const getAllUsers =async()=> {
    try {
      const response = await axios.get(`${REACT_APP_API}/user`, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
        });
        if (response) {
          if (response.data.message==='El token NO es valido!') {
             navigate('/login' );    
             tostada_W(response.data.message,"top-center",1500,'dark');
             return
          } 
        }

      const { data } = response;
      
      if (data) {
        setListUsers(data);
      }   
    } catch (error) {
      console.log(error.message)
    }
  }
//----------------------------------------------------------
  useEffect(()=> {  
    getAllUsers();
  },[])

  console.log(listUsers);
  return (
    <Container className = "container-fluid py-5">
      <Link to='/dashboard/newuser'>
        <button>Add New User</button>  
      </Link>
      
        <Table striped bordered hover size="sm" >    
          <thead className = "headerT">
            <tr>
              <th className = "col-sm-2 text-center">UserName</th>
              <th className = "col-sm-3 text-center">Email</th>
              <th className = "col-sm-2 text-center">TypeUser</th>
              <th className = "col-sm-1 text-center">Level</th>
              <th className = "col-sm-1 text-center">Delete</th>
              <th className = "col-sm-1 text-center">Edit</th>
            </tr> 
          </thead>
          <tbody>
             {listUsers && listUsers.map( (u)=> 
              <User key = {u.email} u={u}/>  
            )}
            
          </tbody>
        </Table>
    </Container>    
  );
}

export default ViewerUsers;