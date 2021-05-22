import { nanoid, createSlice } from '@reduxjs/toolkit'

const Notifications = createSlice({
  name: 'Notifications',
  initialState: [],
  reducers: {
    addNotification: (state, action) => {
      const buffer = { 
        id: nanoid(5),
        message: action.payload 
      }          

      state.push(buffer)
    },
    removeNotification: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id)
      
      if (index > -1) state.splice(index, 1)
    },
  }
})

export const {
  addNotification,
  removeNotification,
} = Notifications.actions

export default Notifications.reducer