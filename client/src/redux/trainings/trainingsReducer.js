import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const {REACT_APP_API} = process.env;


const initialState = { listOfTrainings:[] };

export const trainingsReducer = createSlice({
    name: 'trainings',
    initialState,
    reducers: {
        addTraining: (state, action) => { 
            state.listOfTrainings.push(action.payload); 
           },
        loadTrainings: (state, action) => { 
           state.listOfTrainings = action.payload;       
        },
        
        updateTraining: (state, action) => {
            const { id, training, speaker,level, dateTraining, mode } = action.payload;
            const foundTraining = state.listOfTrainings.find((training) => training.id === id );
             if (foundTraining) {
              foundTraining.training = training;
              foundTraining.speaker  = speaker;
              foundTraining.level    = level;
              foundTraining.dateTraining   = dateTraining;
              foundTraining.mode   = mode;
            } 
        },

        deleteTraining: (state, action) => {
            const foundTraining = state.listOfTraining.find((training) => training.id === action.payload);
            if (foundTraining) {
              state.listOfTrainings.splice(state.listOfTrainings.indexOf(foundTraining), 1);
            }
        }
    }
})

export const { loadTrainings, addTraining, updateTraining,deleteTraining} = trainingsReducer.actions;
export default trainingsReducer.reducer;

export const loadAllTrainings = () => (dispatch) => {
        axios.get(`${REACT_APP_API}/trainings`) 
        .then((response) => {
        dispatch(loadTrainings(response.data));
        })
        .catch((error) => console.log(error));
};