import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload
      // eslint-disable-next-line no-param-reassign
      state.token = accessToken
    },
    logOut: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.token = null
    }
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectToken = (state) => state.auth.token
