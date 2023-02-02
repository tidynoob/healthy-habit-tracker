import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import apiSlice from '../../app/api/apiSlice'

const habitsAdapter = createEntityAdapter({})

const initialState = habitsAdapter.getInitialState()

const habitsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHabits: builder.query({
      query: () => '/habits',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedHabits = responseData.map((habit) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          habit.id = habit._id
          return habit
        })
        return habitsAdapter.setAll(initialState, loadedHabits)
      },
      // eslint-disable-next-line no-unused-vars
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'habit', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'habit', id }))
          ]
        }
        return [{ type: 'habit', id: 'LIST' }]
      }
    }),
    getHabitsForUser: builder.query({
      query: (id) => `/users/${id}/habits`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedHabits = responseData.map((habit) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          habit.id = habit._id
          return habit
        })
        return habitsAdapter.setAll(initialState, loadedHabits)
      },
      // eslint-disable-next-line no-unused-vars
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'habit', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'habit', id }))
          ]
        }
        return [{ type: 'habit', id: 'LIST' }]
      }
    }),
    addNewHabit: builder.mutation({
      query: (newHabitData) => ({
        url: '/habits',
        method: 'POST',
        body: { ...newHabitData }
      }),
      invalidatesTags: [{ type: 'habit', id: 'LIST' }]
    }),
    updateHabit: builder.mutation({
      query: (updatedHabitData) => ({
        url: '/habits',
        method: 'PATCH',
        body: { ...updatedHabitData }
      }),
      invalidatesTages: (result, error, arg) => [{ type: 'habit', id: arg.id }]
    }),
    deleteHabit: builder.mutation({
      query: ({ id }) => ({
        url: '/habits',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'habit', id: arg.id }]
    })
  })
})

const {
  useGetHabitsQuery,
  useGetHabitsForUserQuery,
  useAddNewHabitMutation,
  useDeleteHabitMutation,
  useUpdateHabitMutation
} = habitsApiSlice

const selectHabitsResult = habitsApiSlice.endpoints.getHabits.select()

const selectHabitsData = createSelector(
  selectHabitsResult,
  (habitsResult) => habitsResult.data
)

const {
  selectAll: selectAllHabits,
  selectById: selectHabitById,
  selectIds: selectHabitIds
} = habitsAdapter.getSelectors(
  (state) => selectHabitsData(state) ?? initialState
)

export {
  habitsApiSlice,
  useGetHabitsQuery,
  useGetHabitsForUserQuery,
  useAddNewHabitMutation,
  useDeleteHabitMutation,
  useUpdateHabitMutation,
  selectAllHabits,
  selectHabitById,
  selectHabitIds
}
