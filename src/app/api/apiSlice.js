import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3500',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 403) {
    // eslint-disable-next-line no-console
    console.log('Reauthenticating...')
    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
    if (refreshResult.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }))

      result = await baseQuery(args, api, extraOptions)
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.message = 'Your session has expired. '
      }
      return refreshResult
    }
  }
  return result
}

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Habit', 'User'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({})
})

export default apiSlice
