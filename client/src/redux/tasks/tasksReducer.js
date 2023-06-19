import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const {REACT_APP_API} = process.env;


const initialState = { listOfTasks:[] };

export const taskReducer = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => { 
            state.listOfTasks.push(action.payload); 
           },
        loadTasks: (state, action) => { 
           state.listOfTasks = action.payload;       
        },
        
        updateTask: (state, action) => {
            const { id, classRoom, level, gyg, teacher, device , problem } = action.payload;
            const foundTask = state.listOfTasks.find((task) => task.id === id );
             if (foundTask) {
              foundTask.classRoom = classRoom;
              foundTask.level     = level;
              foundTask.gyg       = gyg;
              foundTask.teacher   = teacher;
              foundTask.device    = device;
              foundTask.problem   = problem;
            } 
        },

        deleteTask: (state, action) => {
            const foundTask = state.listOfTasks.find((task) => task.id === action.payload);
            if (foundTask) {
              state.listOfTasks.splice(state.listOfTasks.indexOf(foundTask), 1);
            }
        }
    }
})

export const { loadTasks, addTask, updateTask,deleteTask} = taskReducer.actions;
export default taskReducer.reducer;

export const loadAllTasks = (levelReq) => (dispatch) => {
        axios.get(`${REACT_APP_API}/task/${levelReq}`) 
        .then((response) => {
        dispatch(loadTasks(response.data));
        })
        .catch((error) => console.log(error));
};

