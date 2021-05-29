import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addItem, updateItem, removeItem } from './index.thunks'

const TodoList = createSlice({
  name: 'TodoList',
  initialState: {
   items: {},
   error: null,
   status: 'idle', 
  },
  extraReducers: {  
    [addItem.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    }, 
    [addItem.fulfilled]: (state, action) => {
      const id = action.meta.requestId
      
      state.status = 'done'
      state.items[id] = {
        id,
        message: action.payload.data,
      }
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
      const id = action.meta.arg.id
      const buffer = state.items[id]

      if (buffer) {
        Object.keys(action.payload.changes)
            .filter(key => key !== 'id')
            .forEach(key => {
              buffer[key] = action.payload.changes[key]
            })
      }
      
      state.status = 'done'
     
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
      const id = action.payload.data.id
      
      state.status = 'done'
      delete state.items[id]
    },
    [removeItem.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.payload
    },
  }
})

export default TodoList.reducer
