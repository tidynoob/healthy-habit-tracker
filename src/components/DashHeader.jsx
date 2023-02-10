import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  HStack,
  Button,
  Spinner,
  Text,
  Square
} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'
import LogoutButton from '../features/auth/LogoutButton'
import SignupButton from '../features/auth/SignUpButton'
import LoginButton from '../features/auth/LoginButton'

function DashHeader() {
  const navigate = useNavigate()

  const { isAuthenticated } = useAuth0()

  return (
    <Box
      as="header"
      w="full"
      background="white"
      px={{ base: '4', lg: '0' }}
      py="4"
    >
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
        <Flex justify="space-between">
          <Flex as={Link} to="/dash" gap="2" alignItems="center">
            <Image
              src="/assets/logo.svg"
              alt="Healthy Habit Tracker"
              h="30px"
              w="30px"
              display={{ base: 'none', sm: 'inline-block' }}
            />
            <Heading as="h2" fontSize="3xl" fontWeight="bold">
              Healthy Habit Tracker
            </Heading>
          </Flex>
          <HStack
            as="nav"
            spacing="4"
            display={{ base: 'none', md: 'inline-block' }}
          >
            {!isAuthenticated && <SignupButton />}
            {!isAuthenticated && <LoginButton />}
            {isAuthenticated && <LogoutButton />}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default DashHeader
