import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    user:null,
    token: null,
    status: 'idle',
    error:null,
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart(state){
            state.status = "loading";
        },
        loginSuccess(state,action){
            state.user = action.payload.user;
            state.token = action.payload.token
            state.status = "succeeded"
        },
        loginFailure(state, action){
            state.status ='failed',
            state.error = action.payload
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = 'idle';
        },
    }
})

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;


export const login = (username, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      dispatch(loginSuccess({ user: data.user, token: data.token }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  export default userSlice.reducer;