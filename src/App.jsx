import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch } from 'react-redux'
import Layout from './components/Layout'
import Public from './components/Public'
// import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
// import HabitsList from './features/habits/HabitsList'
// import UsersList from './features/users/UsersList'
// // import PointsList from './features/points/PointsList'
// import SignUp from './features/auth/SignUp'
// import EditUser from './features/users/EditUser'
import Prefetch from './features/auth/Prefetch'
// import PersistLogin from './features/auth/PersistLogin'
import ProfilePage from './features/auth/Profile'
import { setCredentials } from './features/auth/authSlice'

function App() {
  // console.log('App.jsx')
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()

  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        const accessToken = await getAccessTokenSilently()
        dispatch(setCredentials({ accessToken }))
        console.log('accessToken', accessToken)
      } catch (error) {
        console.log(error.message)
      }
    })()
  }, [isAuthenticated])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
