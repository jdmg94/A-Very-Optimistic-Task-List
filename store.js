import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

//import todoList from './pages/index.slice' 
import todoList from './src/views/Home/Home.slice.optimistic'

import { reducer as Notifications } from './src/sections/Notifications'

export default configureStore({
  middleware: getDefaultMiddleware(),
  reducer: { todoList, Notifications },
})
