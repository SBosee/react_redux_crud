import {createSlice} from "@reduxjs/toolkit";
import { TodoState } from "../type";
const initialState:TodoState[]=[]

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers:{
        //Add
         addTodo:(state,action)=>{
            const {name, description,id} = action.payload
            state.push({id:id,name:name,description:description})
         },
       
        updateTodo:(state,action)=>{
            const {id,name, description} = action.payload
            const data = state.find((value)=> value.id == id )
            if(data){
                data.name = name;
                data.description = description;
            }
            console.log(data,"data")
         },

        //Delete
         deleteTodo:(state,action)=>{
            return state.filter(todo => todo.id !== action.payload);
        
            
         }

    }
})

export const {addTodo,deleteTodo,updateTodo} = todoSlice.actions;
export default todoSlice.reducer;