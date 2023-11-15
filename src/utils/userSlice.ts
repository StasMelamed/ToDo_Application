import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name:"user",
    initialState: {
        style:"btn-primary",
        userName:""
    },
    reducers:{

        goStart:(state,action)=>{
            state.style = 'btn-success';
            state.userName = action.payload;
        },
        unSet:(state)=>{
            state.userName="";
        }
    }
})

export default userSlice.reducer;

export const {goStart,unSet} = userSlice.actions;