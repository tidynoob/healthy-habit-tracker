import { createSlice } from '@reduxjs/toolkit'
// import { format } from 'date-fns'

const pointsSlice = createSlice({
  name: 'points',
  initialState: { date: new Date() },
  reducers: {
    setDate: (state, action) => {
      const { date: newDate } = action.payload
      //   console.log(newDate)
      // eslint-disable-next-line no-param-reassign
      state.date = newDate
    }
  }
})

export const { setDate } = pointsSlice.actions

export default pointsSlice.reducer

export const selectDate = (state) => state.points.date
