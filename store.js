import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import todoList from './pages/index.slice.patchy'

export default configureStore({
  reducer: { todoList },
  middleware: getDefaultMiddleware(),
})
