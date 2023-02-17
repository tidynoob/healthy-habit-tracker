import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './components/Layout'
import Public from './components/Public'
import DashLayout from './components/dashboard/DashLayout'
import Dashboard from './features/auth/Dashboard'
import { setCredentials, selectToken } from './features/auth/authSlice'
import Profile from './features/auth/Profile'

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const token = useSelector(selectToken)

  useEffect(() => {
    let isMounted = true
    ;(async () => {
      const accessToken = await getAccessTokenSilently()
      dispatch(setCredentials({ accessToken }))
    })()
    return () => {
      isMounted = false
    }
  }, [getAccessTokenSilently])

  if (isLoading || (isAuthenticated && !token)) {
    return <div>Loading...</div>
  }

  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </Box>
  )
}

export default App
