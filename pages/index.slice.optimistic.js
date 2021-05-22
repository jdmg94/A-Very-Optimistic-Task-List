import { original } from 'immer'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { addItem, updateItem, removeItem } from './index.thunks'
import { produceWithPatch, produceWithReversal } from '../utils/patchUtils'

const TodoList = createSlice({
  name: 'TodoList',
  initialState: {
    items: {},
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

        draft.items[id] = {
          id,
          message: action.meta.arg,
        }
      })
    },
    [addItem.fulfilled]: (state, action) => {      
      const id = action.meta.requestId

      state.status = 'done'      
      delete state.undoStack[id] 
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
        const buffer = draft.items[id]
        
        draft.status = 'loading'
        
        if (buffer) {
          buffer.message = action.meta.arg.message
        }
      })
   },
    [updateItem.fulfilled]: (state, action) => {
      const id = action.meta.arg.id
      
      state.status = 'done'      
      delete state.undoStack[id] 
    },
    [updateItem.rejected]: (state, action) => {
      const id = action.meta.arg.id

      const nextState = produceWithReversal(state, id, draft => {
        draft.status = 'error'
        draft.error = action.error.message       
      })
      
      console.log(
        'the next state', 
        nextState, 
        'the original state', 
        original(state)
      )
      
      return nextState
    },   
    [removeItem.pending]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithPatch(state, id, draft => {
        draft.status = 'loading'
        
        delete draft.items[id]
     })
    },
    [removeItem.fulfilled]: (state, action) => {      
       const id = action.meta.arg.id
      
       state.status = 'done'      
       delete state.undoStack[id] 
    },
    [removeItem.rejected]: (state, action) => {
      const id = action.meta.arg.id
      
      return produceWithReversal(state, id, draft => {
        draft.status = 'error'
        draft.error = action.payload
      })
    },
 }
})

export default TodoList.reducer
