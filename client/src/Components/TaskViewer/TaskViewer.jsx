import React, { useEffect }     from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '../../js/useLocalStorage';

import Table     from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Task      from './Task/Task';

import { loadAllTasks } from '../../redux/tasks/tasksReducer';
import { createListClassRooms } from '../../redux/classRooms/classRoomsReducer';


function TaskViewer() {
  const { listOfTasks } = useSelector( state=> state.tasks);
  
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
  const dispatch = useDispatch();  

  useEffect(() => {
      dispatch(createListClassRooms());
  },[])

  useEffect(() => {
    dispatch(loadAllTasks(userLogged.levelUser));
},[listOfTasks])


  return (
    <Container className = "container-fluid py-5 mb-2" >
        <Table striped bordered hover size="sm" >
          <thead>
            <tr>
              <th className = "col-sm-2 text-center">Date</th>
              <th className = "col-sm-1 text-center">Time</th>
              <th className = "col-sm-1 text-center">ClassRoom</th>
              <th className = "col-sm-1 text-center">Grade/Group</th>
              <th className = "col-sm-5 text-center">Problem</th>
              <th className = "col-sm-1 text-center">Status</th>
              <th className = "col-sm-1 text-center">Delete</th>
              <th className = "col-sm-1 text-center">Edit</th>
            </tr> 
          </thead>
          <tbody>
               { listOfTasks && listOfTasks.map( (t)=>
                  <Task key = {t.id} t={t}/>
              )}  
          </tbody>
        </Table>
    </Container>    
  );
}

export default TaskViewer;