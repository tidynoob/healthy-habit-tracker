import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
// import HabitsList from './features/habits/HabitsList'
import UsersList from './features/users/UsersList'
// import PointsList from './features/points/PointsList'
import SignUp from './features/auth/SignUp'
import EditUser from './features/users/EditUser'
import Prefetch from './features/auth/Prefetch'

function App() {
  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignUp />} />
          <Route element={<Prefetch />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />

              <Route path="users">
                <Route index element={<UsersList />} />
                <Route path=":userId" element={<EditUser />} />
              </Route>

              {/* <Route path="habits">
              <Route index element={<HabitsList />} />
            </Route>

            <Route path="points">
              <Route index element={<PointsList />} />
            </Route> */}
            </Route>
            {/* end dash */}
          </Route>
        </Route>
        {/* end Prefetch */}
      </Routes>
    </Box>
  )
}

export default App
