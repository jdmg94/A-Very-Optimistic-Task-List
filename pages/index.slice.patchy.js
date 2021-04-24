import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addItem, updateItem, removeItem } from './index.thunks'
import { produceWithPatch, produceWithReversal } from '../utils/patchUtils'

const TodoList = createSlice({
  name: 'TodoList',
  initialState: {
    items: [],
    status: 'idle',
    error: null, 
    undoStack: {},
  },
  extraReducers: {
    [addItem.pending]: (state, action) => {
      const id = action.meta.requestId

      return produceWithPatch(state, id, draft => {
        draft.error = null
        draft.status = 'loading'

        draft.items.push({
          id,
          message: action.meta.arg,
        })
      })
    },
    [addItem.fulfilled]: (state, action) => {      
      const id = action.meta.requestId

      console.log('addition fulfilled')
      
      return produceWithReversal(state, id, draft => {
         draft.status = 'done'
       })
    },
    [addItem.rejected]: (state, action) => {
      const id = action.meta.requestId

      return produceWithReversal(state, id, draft => {
        draft.status = 'error'
        draft.error = action.error.message
      })
    },
    [updateItem.pending]: (state, action) => {
      const id = action.meta.arg.id
      
      return produceWithPatch(state, id, draft => {
        draft.status = 'loading'
        const index = draft.items.findIndex(item => item.id === id)

        if (index > -1) draft.items[index].message = action.meta.arg.message
      })
   },
    [updateItem.fulfilled]: (state, action) => {
      const id = action.meta.arg.id
      
      console.log('update fulfilled')
      
      return produceWithReversal(state, id, draft => {
         draft.status = 'done'
       })
    },
    [updateItem.rejected]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithReversal(state, id, draft => {
        draft.status = 'error'
        draft.error = action.error.message
      })
    },   
    [removeItem.pending]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithPatch(state, id, draft => {
        draft.status = 'loading'
        const index = draft.items.findIndex(item => item.id === action.meta.arg.id)
        if (index > -1) draft.items.splice(index, 1)
      })
    },
    [removeItem.fulfilled]: (state, action) => {      
       const id = action.meta.arg.id
      
      console.log('remove fulfilled')
      
       return produceWithReversal(state, id, draft => {
         draft.status = 'done'
       })
    },
    [removeItem.rejected]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithReversal(state, id, draft => {
        state.status = 'error'
        state.error = action.payload
      })
    },
 }
})

export default TodoList.reducer
