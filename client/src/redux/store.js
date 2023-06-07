import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userReducer       from './users/userReducer';
import tasksReducer      from './tasks/tasksReducer';
import classRoomsReducer from './classRooms/classRoomsReducer';
import inventoryReducer  from './Inventory/inventoryReducer';
import trainingsReducer  from './trainings/trainingsReducer';
import employeesReducer  from './employees/employeesReducer';

export default configureStore({
  reducer: {
    user       : userReducer,
    tasks      : tasksReducer,
    classRooms : classRoomsReducer,
    inventory  : inventoryReducer,
    trainings  : trainingsReducer,
    employees  : employeesReducer,
  }
})