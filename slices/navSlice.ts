import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface CounterState {
    choose: number | null,
    scale:number | null,
    color:number | null,
  }

const initialState : CounterState={
    choose:null,
    scale:null,
    color:null,
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers:{
        setChoose:(state,action : PayloadAction<number>)=>{
            state.choose = action.payload
        },
        setScale:(state,action : PayloadAction<number>)=>{
            state.scale = action.payload
        },
        setColor:(state,action :PayloadAction<number>)=>{
            state.color = action.payload
        },
        
    }
})

export const {setChoose,setScale,setColor} = navSlice.actions

export const selectChoose = (state:RootState) => state.nav.choose;
export const selectScale = (state:RootState) => state.nav.scale;
export const selectColor = (state:RootState) => state.nav.color;

export default navSlice.reducer;