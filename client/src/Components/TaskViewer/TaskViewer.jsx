import React, { useEffect, useState }     from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocalStorage } from '../../js/useLocalStorage';

import Table     from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button        from 'react-bootstrap/Button';
import Task      from './Task/Task';
import './TaskViewer.css';

import { loadAllTasks, loadTasks } from '../../redux/tasks/tasksReducer';
import { createListClassRooms } from '../../redux/classRooms/classRoomsReducer';
import DataTable from 'react-data-table-component';
import moment        from 'moment';



function TaskViewer() {
  const { listOfTasks } = useSelector( state=> state.tasks);
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
  const dispatch = useDispatch();  

  const columns = [
    {
        name: 'DATE',
        selector: row => moment(row.dateTask).format('DD/MMM/YYYY'),
        sortable: true,
    },
    {
        name: 'TIME',
        selector: row => moment(row.dateTask).format('LT')
    },
    {
      name: 'CLASSROOM',
      selector: row => row.classRoom,
      sortable: true,
    },
    {
      name: 'G & G',
      selector: row => row.gyg,
      sortable: true,
    },
    {
      name: 'PROBLEM',
      selector: row => row.problem,
    },
    {
      name: 'STATUS',
      selector: row => <Button className = 'btn-sm'
      /* onClick  = {handleResolve} */
      disabled = {userLogged.typeUser==='User' ? true: false}
      variant  = {row.statusTask ==='Completed' 
      
      ? 'success' 
      : row.statusTask ==='Required' ? 'primary' 
         : row.statusTask ==='Rejected' ? 'danger': 'warning' }
> 
    {row.statusTask}  
</Button>  

    },
];

const data = listOfTasks;
/* const data = [
    {
        id: 1,
        dateTask: 'Beetlejuice',
        time: '1988',
    },
    {
        id: 2,
        dateTask: 'Ghostbusters',
        time: '1984',
    },
]
 */

 const sortByDate = ()=> {
  /* let listTmp = [...listOfTasks];
  if (order ==='ASC') {
    listTmp.sort((o1,o2) => {
      if (o1.dateTask < o2.dateTask) {
        return -1;
      } else if (o1.dateTask > o2.dateTask) {
        return 1;
      }else {
        return 0;
      }
    });
    setOrder('DES')
  } else {
    listTmp.sort((o1,o2) => {
      if (o1.dateTask > o2.dateTask) {
        return -1;
      } else if (o1.dateTask < o2.dateTask) {
        return 1;
      }else {
        return 0;
      }
    });
    setOrder('ASC');
  } */
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
},[listOfTasks]);




  return (
    <Container className = "container-fluid py-5 mb-2" >
     <DataTable
            columns={columns}
            data={data}
        />

    </Container>    
  );
}

export default TaskViewer;