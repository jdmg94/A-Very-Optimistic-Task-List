import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

//import todoList from './pages/index.slice' 
import todoList from './pages/sauce/index.slice.optimistic'

import { reducer as Notifications } from './sections/Notifications'

export default configureStore({
  middleware: getDefaultMiddleware(),
  reducer: { todoList, Notifications },
})
