import React, { useEffect}     from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Table     from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import ClassRoom      from './ClassRoom';
import { useLocalStorage } from '../../../js/useLocalStorage';

import { createListClassRooms } from '../../../redux/classRooms/classRoomsReducer';


function ViewerClassRooms() {
  const { listCR } = useSelector( (state=> state.classRooms))
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');

  const dispatch = useDispatch();

useEffect(() => {
    dispatch(createListClassRooms(userLogged.levelUser));
},[])

  return (
    <Container className = "container-fluid py-5">
      <Link to='/dashboard/newclassroom'>
        <button>Add New ClassRoom</button>  
      </Link>
      
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className = "col-sm-2 text-center">ClassRoom</th>
              <th className = "col-sm-2 text-center">GyG</th>
              <th className = "col-sm-3 text-center">Level</th>
              <th className = "col-sm-3 text-center">Campus</th>
              <th className = "col-sm-3 text-center">Floor</th>
              <th className = "col-sm-1 text-center">Delete</th>
              <th className = "col-sm-1 text-center">Edit</th>
            </tr> 
          </thead>
          <tbody>
             {listCR && listCR.map( (c)=> 
              <ClassRoom key = {c.classRoom} c={c}/>  
            )}
            
          </tbody>
        </Table>
    </Container>    
  );
}

export default ViewerClassRooms;