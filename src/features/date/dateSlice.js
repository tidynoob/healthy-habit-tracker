import { createSlice } from '@reduxjs/toolkit'

const dateSlice = createSlice({
  name: 'date',
  initialState: { date: new Date() },
  reducers: {
    setDate: (state, action) => {
      const { date: newDate } = action.payload
      // eslint-disable-next-line no-param-reassign
      state.date = newDate
    }
  }
})

export const { setDate } = dateSlice.actions

export default dateSlice.reducer

export const selectDate = (state) => state.date.date
