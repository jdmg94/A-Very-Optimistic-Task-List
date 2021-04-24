import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addItem, updateItem, removeItem } from './index.thunks'

const TodoList = createSlice({
  name: 'TodoList',
  initialState: {
   items: [],
   error: null,
   status: 'idle', 
  },
  extraReducers: {  
    [addItem.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    }, 
    [addItem.fulfilled]: (state, action) => {
      state.status = 'done'
      state.items.push({
        id: action.meta.requestId,
        message: action.payload.data,
      })
      
      console.log('addition fullfilled!')
    },
    [addItem.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.payload
    },
    [updateItem.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [updateItem.fulfilled]: (state, action) => {
            state.status = 'done'
      const index = state.items.findIndex(item => item.id === action.meta.arg.id)
      
      if (index > -1) state.items[index].message = action.payload.changes.message
      
      console.log('update fullfilled')
    },
    [updateItem.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.payload
    },
    [removeItem.pending]: (state) => {
      state.staus = 'loading'
      state.error = null
    },
    [removeItem.fulfilled]: (state, action) => {
      state.status = 'done'
      const index = state.items.findIndex(item => item.id === action.payload.data.id)
      
      if (index > -1) state.items.splice(index, 1)
      
      console.log('remove fullfilled!')
    },
    [removeItem.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.payload
    },
  }
})

export default TodoList.reducer
