import { configureStore } from '@reduxjs/toolkit'
import  CartSlice from './slices/cartSlice'
export const store = configureStore({
  reducer: {
    Day_to_Task:CartSlice

  },
})

export default store