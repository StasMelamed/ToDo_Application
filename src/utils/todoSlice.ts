import {createSlice} from "@reduxjs/toolkit";


const todoSlice = createSlice({
    name:"todolist",
    initialState:[]
  ,
    reducers:{
        //@ts-ignore
        addToDo:(state, action)=>{
            if(state!=null) {
                return [...state, {checked:false,value:action.payload}]
            }
            return action.payload
        },

        reRender:(state, action)=>{

            return action.payload
        }


    }

})

export default todoSlice.reducer;

export const {addToDo,reRender} = todoSlice.actions;