import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const {REACT_APP_API} = process.env;


const initialState = { listCR:[] };

  export const classRoomsReducer = createSlice({
    name: 'classRooms',
    initialState,
    reducers: {
      loadAllClassRooms: (state,action ) => {
        state.listCR = action.payload
      },
      addNewClassRoom: (state, action) => {
        state.listCR.push(action.payload);
      },
      deleteClassRoom: (state, action) => {
        const foundCR = state.listCR.find((room) => room.classRoom === action.payload);
        if (foundCR) {
          state.listCR.splice(state.listCR.indexOf(foundCR), 1);
        }
    },
    updateCR: (state, action) => {
      const { classRoom, gyg, level, campus , floor } = action.payload;
      const foundCR = state.listCR.find((room) => room.classRoom === classRoom );
       if (foundCR) {
        foundCR.gyg    = gyg;
        foundCR.level  = level;
        foundCR.campus = campus;
        foundCR.floor  = floor;
      } 
  },
    }
  })
  
  export const { addNewClassRoom, deleteClassRoom, updateCR,loadAllClassRooms } = classRoomsReducer.actions;
  export default classRoomsReducer.reducer;

  export const createListClassRooms = () => (dispatch) => {
      axios.get(`${REACT_APP_API}/classRoom`)
      .then((response) => {
      dispatch(loadAllClassRooms(response.data));
      })
      .catch((error) => console.log(error));
  };