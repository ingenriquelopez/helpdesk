import React, { useEffect }     from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '../../js/useLocalStorage';

import Table     from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button        from 'react-bootstrap/Button';
import Task      from './Task/Task';
import './TaskViewer.css';

import { loadAllTasks } from '../../redux/tasks/tasksReducer';
import { createListClassRooms } from '../../redux/classRooms/classRoomsReducer';


function TaskViewer() {
  const { listOfTasks } = useSelector( state=> state.tasks);
  
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
  const dispatch = useDispatch();  

 const sortByDate = ()=> {
  alert('Sort by Date')
  let LT = [...listOfTasks];
  LT.sort((o1,o2) => {
    if (o1.dateTask < o2.dateTask) {
      return -1;
    } else if (o1.dateTask > o2.dateTask) {
      return 1;
    }else {
      return 0;
    }
  });
 }

 const sortByGyg = ()=> {
  alert('Sort by gyg')
 }
 const sortByStatus = ()=> {
  alert('Sort by status')
 }

  useEffect(() => {
      dispatch(createListClassRooms());
  },[])

  useEffect(() => {
    dispatch(loadAllTasks(userLogged.levelUser));
},[listOfTasks])


  return (
    <Container className = "container-fluid py-5 mb-2" >
        <Table striped bordered hover size = "sm">
          <thead className = "headerT">
            <tr>
              <th className = "col-sm-2 text-center" >Date<Button variant="link" onClick = {sortByDate }><i class='bx bx-sort-alt-2 bx-xm'></i></Button></th>
              <th className = "col-sm-1 text-center" >Time</th>
              <th className = "col-sm-1 text-center" >ClassRoom</th>
              <th className = "col-sm-1 text-center" >G & G<Button variant="link" onClick = { sortByGyg }><i class='bx bx-sort-alt-2 bx-xm'></i></Button></th>
              <th className = "col-sm-3 text-center" >Problem</th>
              <th className = "col-sm-2 text-center" >Status<Button variant="link" onClick = { sortByStatus }><i class='bx bx-sort-alt-2 bx-xm'></i></Button></th>
              <th className = "col-sm-1 text-center" >Del</th>
              <th className = "col-sm-1 text-center" >Edit</th>
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