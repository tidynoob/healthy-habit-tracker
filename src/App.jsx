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
import NewUserForm from './features/users/NewUserForm'
import EditUser from './features/users/EditUser'

function App() {
  return (
    <Box minH="100vh">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Public />} />
          <Route path="login" element={<Login />} />
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Welcome />} />

            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":userId" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
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
      </Routes>
    </Box>
  )
}

export default App
