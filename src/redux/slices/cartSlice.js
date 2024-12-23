import { createSlice } from "@reduxjs/toolkit";
// import {loadFromLocalStorage,saveToLocalStorage} from '../storage'


const loadFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem("tasks");
      return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
      console.error("Error loading from localStorage", e);
      return [];
    }
  };

const saveToLocalStorage = (tasks) => {
    try {
      const serializedState = JSON.stringify(tasks);
      localStorage.setItem("tasks", serializedState);
    } catch (e) {
      console.error("Error saving to localStorage", e);
    }
  };
  

 const CartSlice = createSlice({
    name: "Day_to_Task",
    initialState:loadFromLocalStorage(),
    reducers : {
        addToTask:(state,action) => {
            state.push(action.payload)
            saveToLocalStorage(state);
            console.log(action,'AddToTask')
        }
        
    }
})

export const{addToTask} = CartSlice.actions
export default CartSlice.reducer



