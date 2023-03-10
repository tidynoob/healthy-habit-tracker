import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import apiSlice from '../../app/api/apiSlice'

const pointsAdapter = createEntityAdapter({})

const initialState = pointsAdapter.getInitialState()

const pointsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPoints: builder.query({
      query: () => '/points',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedPoints = responseData.map((record) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          record.id = record._id
          return record
        })
        return pointsAdapter.setAll(initialState, loadedPoints)
      },
      // eslint-disable-next-line no-unused-vars
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Point', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Point', id }))
          ]
        }
        return [{ type: 'Point', id: 'LIST' }]
      }
    }),
    getPointsForHabit: builder.query({
      query: (habitId) => `/habits/${habitId}/points`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        // console.log('responseData', responseData)
        const loadedPoints = responseData.map((record) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          record.id = record._id
          return record
        })
        return pointsAdapter.setAll(initialState, loadedPoints)
      },
      // eslint-disable-next-line no-unused-vars
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Point', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'Point', id }))
          ]
        }
        return [{ type: 'Point', id: 'LIST' }]
      }
    }),
    addNewPoint: builder.mutation({
      query: ({ habit, date }) => ({
        url: '/points',
        method: 'POST',
        body: { habit, date }
      }),
      invalidatesTags: [{ type: 'Point', id: 'LIST' }]
    }),
    updatePoint: builder.mutation({
      query: (updatedPointData) => ({
        url: '/points',
        method: 'PATCH',
        body: { ...updatedPointData }
      }),
      invalidatesTages: (result, error, arg) => [{ type: 'Point', id: arg.id }]
    }),
    deletePoint: builder.mutation({
      query: ({ habitId, date }) => ({
        url: `/points/${habitId}`,
        method: 'DELETE',
        body: { date }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Point', id: arg.id }]
    })
  })
})

const {
  useGetPointsQuery,
  useGetPointsForHabitQuery,
  useAddNewPointMutation,
  useDeletePointMutation,
  useUpdatePointMutation
} = pointsApiSlice

const selectPointsResult = pointsApiSlice.endpoints.getPointsForHabit.select()

const selectPointsData = createSelector(
  selectPointsResult,
  (pointsResult) => pointsResult.data
)

const { selectAll: selectAllPoints, selectById: selectPointsById } =
  pointsAdapter.getSelectors((state) => selectPointsData(state) ?? initialState)

export {
  pointsApiSlice,
  useGetPointsQuery,
  useGetPointsForHabitQuery,
  useAddNewPointMutation,
  useDeletePointMutation,
  useUpdatePointMutation,
  selectAllPoints,
  selectPointsById
}
