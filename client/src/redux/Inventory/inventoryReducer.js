import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const {REACT_APP_API} = process.env;


const initialState = { listOfInventory:[] };

export const inventoryReducer = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
        addInventory: (state, action) => { 
            state.listOfInventory.push(action.payload); 
           },
        loadInventory: (state, action) => { 
           state.listOfInventory = action.payload;       
        },
        
        updateInventory: (state, action) => {
           /*  const { id, classRoom, level, gyg, teacher, device , problem } = action.payload;
            const foundTask = state.listOfTasks.find((task) => task.id === id );
             if (foundTask) {
              foundTask.classRoom = classRoom;
              foundTask.level     = level;
              foundTask.gyg       = gyg;
              foundTask.teacher   = teacher;
              foundTask.device    = device;
              foundTask.problem   = problem;
            }  */
        },

        deleteInventory: (state, action) => {
           /*  const foundTask = state.listOfTasks.find((task) => task.id === action.payload);
            if (foundTask) {
              state.listOfTasks.splice(state.listOfTasks.indexOf(foundTask), 1);
            } */
        }
    }
})

export const { loadInventory, addInventory, updateInventory,deleteInventory} = inventoryReducer.actions;
export default inventoryReducer;

export const loadAllInventory = () => (dispatch) => {
        axios.get(`${REACT_APP_API}/inventory`) 
        .then((response) => {
        dispatch(loadInventory(response.data));
        })
        .catch((error) => console.log(error));
};
