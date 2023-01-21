import { Box } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

function DashLayout() {
  return (
    <>
      <DashHeader />
      <Box maxW="container.3xl">
        <Outlet />
      </Box>
      <DashFooter />
    </>
  )
}

export default DashLayout
