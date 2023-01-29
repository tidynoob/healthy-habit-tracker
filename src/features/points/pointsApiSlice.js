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
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedPoints = responseData.map((record) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          record.id = record._id
          return record
        })
        return recordAdapter.setAll(initialState, loadedPoints)
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
    })
  })
})

const { useGetPointsQuery } = pointsApiSlice

const selectPointsResult = usersApiSlice.endpoints.getPoints.select()

const selectPointsData = createSelector(
  selectPointsResult,
  (pointsResult) => pointsResult.data
)

const {
  selectAll: selectAllPoints,
  selectById: selectPointsById
} = pointsAdapter.getSelectors((state) => selectPointsData(state) ?? initialState)

export {
  pointsApiSlice,
  useGetPointsQuery,
  selectAllPoints,
  selectPointsById
}
