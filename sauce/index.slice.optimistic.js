import { createSlice } from "@reduxjs/toolkit"
import { addItem, updateItem, removeItem } from "../pages/index.thunks"
import { produceWithPatch, produceWithReversal } from "../utils/patchUtils"

const TodoList = createSlice({
    name: "TodoList",
    initialState: {
    items: {},
    status: "idle",
    error: null,
    undoStack: {},
  },
  extraReducers: {
    [addItem.pending]: (state, action) => {
      const id = action.meta.requestId

      return produceWithPatch(state, id, (draft) => {
        draft.error = null
        draft.status = "loading"

        draft.items[id] = {
          id,
          done: false,
          message: action.meta.arg,
        }
      })
    },
    [addItem.fulfilled]: (state, action) => {
      const id = action.meta.requestId

      state.status = "done"
      delete state.undoStack[id]
    },
    [addItem.rejected]: (state, action) => {
      const id = action.meta.requestId

      return produceWithReversal(state, id, (draft) => {
        draft.status = "error"
        draft.error = action.error.message
      })
    },
    [updateItem.pending]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithPatch(state, id, (draft) => {
        const buffer = draft.items[id]

        draft.status = "loading"

        if (buffer) {
          Object.keys(action.meta.arg)
            .filter(key => key !== 'id')
            .forEach(key => {
              buffer[key] = action.meta.arg[key]
            })
        }
      })
    },
    [updateItem.fulfilled]: (state, action) => {
      const id = action.meta.arg.id

      state.status = "done"
      delete state.undoStack[id]
    },
    [updateItem.rejected]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithReversal(state, id, (draft) => {
        draft.status = "error"
        draft.error = action.error.message
      })
    },
    [removeItem.pending]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithPatch(state, id, (draft) => {
        draft.status = "loading"

        delete draft.items[id]
      });
    },
    [removeItem.fulfilled]: (state, action) => {
      const id = action.meta.arg.id

      state.status = "done"
      delete state.undoStack[id]
    },
    [removeItem.rejected]: (state, action) => {
      const id = action.meta.arg.id

      return produceWithReversal(state, id, (draft) => {
        draft.status = "error"
        draft.error = action.payload
      })
    },
  },
})

export default TodoList.reducer
