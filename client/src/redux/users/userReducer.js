import { createSlice } from '@reduxjs/toolkit';
const initialState = {
                 userName  : "",
                    email  : "",
                 typeUser  : "",
                 levelUser : "",
  };

  export const userReducer = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
   
        setUser: (state,action ) => {
            state.userName  = action.payload.userName;
            state.email     = action.payload.email;
            state.typeUser  = action.payload.typeUser;
            state.levelUser = action.payload.levelUser;
            state.userToken = action.payload.userToken;
        },
        unsetUser: (state)=> {
            state.userName   = "";
            state.email      = "";
            state.typeUser   = "";
            state.levelUser  = "";
            state.userTokenm = "";
        },
        getUser:(email, token)=> {

        }
    }
  })
  
  export const { addUser, setUser, unsetUser} = userReducer.actions;
  export default userReducer.reducer;

 /*  export const getUser = (email, token) => {
    return async function (dispatch) {
        try {
            const json = await axios.get(`/user/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return dispatch({
                type: GET_USER,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
} */