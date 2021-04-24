import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addItem, updateItem, removeItem } from './index.thunks'


const TodoList = createSlice({
  name: 'TodoList',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  extraReducers: {
    [addItem.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
      state.items.push({
        id: action.meta.requestId,
        message: action.meta.arg,
      })
    },
    [addItem.fulfilled]: (state) => {
      console.log('addition fullfilled!')
      state.status = 'done'
    },
    [addItem.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.payload

      const index = state.items.findIndex(item => item.id === action.meta.requestId)

      if (index > -1) state.items.splice(index, 1)

    },
    [updateItem.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null
      
      const index = state.items.findIndex(item => item.id === action.meta.arg.id)

      if (index > -1) state.items[index].message = action.meta.arg.message
    },
    [updateItem.fulfilled]: (state) => {
      console.log('update fullfilled')
      state.status = 'done'
    },
    [updateItem.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.payload

      const index = state.items.findIndex(item => item.id === action.meta.arg.id)

      if (index > -1) state.items[index].message = action.meta.arg.original
    },
    [removeItem.pending]: (state, action) => {
      state.status = 'loading'
      state.error = null

      const index = state.items.findIndex(item => item.id === action.meta.arg.id)

      if (index > -1) state.items.splice(index, 1)
    },
    [removeItem.fulfilled]: (state) => {
       console.log('remove fullfilled!')
       state.status = 'done'
    },
    [removeItem.rejected]: (state, action) => {
      state.status = 'error'
      state.error = action.payload

      if (!state.items.includes(action.meta.arg)) state.items.push(action.meta.arg)
    },
  }
})

export default TodoList.reducer
