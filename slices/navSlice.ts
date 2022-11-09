import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '../store'

interface CounterState {
    choose: number | null,
    scale:number | null,
    color:string | null,
    congratulation: boolean
  }

const initialState : CounterState={
    choose:null,
    scale:null,
    color:'black',
    congratulation:false
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
        setColor:(state,action :PayloadAction<string>)=>{
            state.color = action.payload
        },
        setCongratulation:(state,action: PayloadAction<boolean>)=> {
            state.congratulation = action.payload
        }

    }
})

export const {setChoose,setScale,setColor, setCongratulation} = navSlice.actions

export const selectChoose = (state:RootState) => state.nav.choose;
export const selectScale = (state:RootState) => state.nav.scale;
export const selectColor = (state:RootState) => state.nav.color;
export const selectCongratulation = (state:RootState) => state.nav.congratulation;


export default navSlice.reducer;
