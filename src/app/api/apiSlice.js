import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
  tagTypes: ['Habit', 'User', 'Point'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({})
})

export default apiSlice
