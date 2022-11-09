import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from '../store'

{/*
interface CounterState {
    email: string | null,
    image:string | undefined ,
    name:string | undefined,
  }
*/}
  type AuthState = {
    email?:String ,
    image?:String,
    name?:String,
  }

const initialState : AuthState={
    email:undefined,
    image:undefined,
    name:undefined,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setSession:(state,action : PayloadAction<AuthState>)=>{
            state.email = action.payload.email
            state.image = action.payload.image
            state.name = action.payload.name
        },

    }
})

export const authActions = authSlice.actions

export default authSlice.reducer;
