import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

function DashLayout() {
  return (
    <Box
      minH="100vh"
      position="relative"
      w="full"
      overflowX="hidden"
      background="linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/assets/background.jpg)"
      backgroundPosition={{ base: 'top right' }}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <DashHeader />
      <Box as="main" w="full" py="4" px={{ base: '4', lg: '0' }}>
        <Container
          maxW={{
            base: 'full',
            lg: 'container.md',
            xl: 'container.lg',
            '2xl': 'container.xl'
          }}
          px="0"
          mx="auto"
        >
          <Outlet />
        </Container>
      </Box>
      <DashFooter />
    </Box>
  )
}

export default DashLayout
