import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import apiSlice from './api/apiSlice'
import authReducer from '../features/auth/authSlice'
import pointsReducer from '../features/points/pointsSlice'

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    points: pointsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware),
  devTools: true
})

setupListeners(store.dispatch)

export default store
