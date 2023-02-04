import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
// import store from '../../app/store'
// import { habitsApiSlice } from '../habits/habitsApiSlice'
// import { usersApiSlice } from '../users/usersApiSlice'
// import { pointsApiSlice } from '../points/pointsApiSlice'
// import useAuth from '../../hooks/useAuth'

function Prefetch() {
  // const { id } = useAuth()
  // console.log('id', id)

  useEffect(() => {
    // eslint-disable-next-line no-console
    // console.log('Prefetching data...')
    // const habits = store.dispatch(habitsApiSlice.endpoints.getHabits.initiate())
    // const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    // const points = store.dispatch(pointsApiSlice.endpoints.getPoints.initiate())

    return () => {
      // eslint-disable-next-line no-console
      // console.log('Unsubscribing from data...')
      // habits.unsubscribe()
      // users.unsubscribe()
      // points.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch
