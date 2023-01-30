/* eslint-disable */
import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Spinner } from '@chakra-ui/react'
import { selectUserById } from './usersApiSlice'

function EditUser() {
  const { userId } = useParams()
  const user = useSelector((state) => selectUserById(state, userId))

  //   return user ? <EditUserForm user={user} /> : <Spinner />
  return <Spinner />
}

export default EditUser
