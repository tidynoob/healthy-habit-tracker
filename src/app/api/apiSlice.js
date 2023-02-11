import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useAuth0 } from '@auth0/auth0-react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_SERVER_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth
    if (token) {
      // console.log('token', token)
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
  // prepareHeaders: async (headers) => {
  //   const { getAccessTokenSilently } = useAuth0()
  //   const token = await getAccessTokenSilently()
  //   console.log('token', token)
  //   headers.set('authorization', `Bearer ${token}`)
  //   return headers
  // }
})

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions)

//   if (result?.error?.status === 403) {
//     // eslint-disable-next-line no-console
//     console.log('Reauthenticating...')
//     const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
//     if (refreshResult.data) {
//       api.dispatch(setCredentials({ ...refreshResult.data }))

//       result = await baseQuery(args, api, extraOptions)
//     } else {
//       if (refreshResult?.error?.status === 403) {
//         refreshResult.error.message = 'Your session has expired. '
//       }
//       return refreshResult
//     }
//   }
//   return result
// }

const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Habit', 'User'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({})
})

export default apiSlice
