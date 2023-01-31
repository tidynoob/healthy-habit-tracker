import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import apiSlice from '../../app/api/apiSlice'

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          // eslint-disable-next-line no-underscore-dangle, no-param-reassign
          user.id = user._id
          return user
        })
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      // eslint-disable-next-line no-unused-vars
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map((id) => ({ type: 'User', id }))
          ]
        }
        return [{ type: 'User', id: 'LIST' }]
      }
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: (responseData) => {
        // eslint-disable-next-line no-underscore-dangle, no-param-reassign
        responseData.id = responseData._id
        return usersAdapter.upsertOne(initialState, responseData)
      },
      // eslint-disable-next-line no-unused-vars
      providesTags: (result, error, arg) => {
        if (result?.id) {
          return [{ type: 'User', id: result.id }]
        }
        return []
      }
    }),
    addNewUser: builder.mutation({
      query: (newUserData) => ({
        url: '/users/new',
        method: 'POST',
        body: { ...newUserData }
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }]
    }),
    updateUser: builder.mutation({
      query: (updatedUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: { ...updatedUserData }
      }),
      invalidatesTages: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: '/users',
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    })
  })
})

const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApiSlice

const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
)

const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState)

export {
  usersApiSlice,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  selectAllUsers,
  selectUserById,
  selectUserIds
}
