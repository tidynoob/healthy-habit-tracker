import apiSlice from '../../app/api/apiSlice'
import { logOut, setCredentials } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
      })
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          dispatch(logOut())
          dispatch(apiSlice.util.resetApiState())
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
        }
      }
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          // eslint-disable-next-line no-console
          // console.log('data', data)
          const { accessToken } = data
          dispatch(setCredentials({ accessToken }))
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err)
        }
      }
    })
  })
})

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice
