import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
const {REACT_APP_API} = process.env;


const initialState = { listOfTrainings:[] };

export const employeesReducer = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action) => { 
            state.listOfEmployees.push(action.payload); 
           },
        loadEmployees: (state, action) => { 
           state.listOfEmployees = action.payload;       
        },
        
        updateEmployee: (state, action) => {
            const { numEmployee, name, genere, email, level, department } = action.payload;
            const foundEmployee = state.listOfEmployee.find( (employee) => employee.numEmployee === numEmployee );
             if (foundEmployee) {
              foundEmployee.name       = name;
              foundEmployee.genere     = genere;
              foundEmployee.email      = email;
              foundEmployee.level      = level;
              foundEmployee.department = department;
            } 
        },

        deleteEmployee: (state, action) => {
            const foundEmployee = state.listOfEmployee.find((employee) => employee.numEmployee === action.payload);
            if (foundEmployee) {
              state.listOfEmployees.splice(state.listOfEmployees.indexOf(foundEmployee), 1);
            }
        }
    }
})

export const { loadEmployees, addEmployee, updateEmployee,deleteEmployee} = employeesReducer.actions;
export default employeesReducer.reducer;

export const loadAllEmployees = () => (dispatch) => {
        axios.get(`${REACT_APP_API}/employees`) 
        .then((response) => {
        dispatch(loadEmployees(response.data));
        })
        .catch((error) => console.log(error));
};