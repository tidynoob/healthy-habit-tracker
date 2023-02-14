import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import Header from '../Header'
import DashFooter from './DashFooter'
import SignupButton from '../../features/auth/SignUpButton'
import LoginButton from '../../features/auth/LoginButton'
import LogoutButton from '../../features/auth/LogoutButton'

function DashLayout() {
  const { isAuthenticated } = useAuth0()

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
      <Header>
        {!isAuthenticated && <SignupButton />}
        {!isAuthenticated && <LoginButton />}
        {isAuthenticated && <LogoutButton />}
      </Header>

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
