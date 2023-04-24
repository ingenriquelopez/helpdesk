import { configureStore } from '@reduxjs/toolkit';

// Reducers
import userReducer       from './users/userReducer';
import tasksReducer      from './tasks/tasksReducer';
import classRoomsReducer from './classRooms/classRoomsReducer';
import inventoryReducer  from './inventory/inventoryReducer';

export default configureStore({
  reducer: {
    user       : userReducer,
    tasks      : tasksReducer,
    classRooms : classRoomsReducer,
    inventory  : inventoryReducer,
  }
})