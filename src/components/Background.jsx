import { Link } from 'react-router-dom'
import React from 'react'
import {
  Box,
  Container,
  Heading,
  Flex,
  Image,
  HStack,
  Button
} from '@chakra-ui/react'

// <Link to="/login">Login</Link>

function Background({ children }) {
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
      <Box
        as="header"
        w="full"
        background="white"
        px={{ base: '1rem', lg: '0' }}
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
            <Flex gap="2" alignItems="center">
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
            <HStack spacing="4" display={{ base: 'none', md: 'inline-block' }}>
              <Button as={Link} to="/register" colorScheme="teal">
                Sign Up
              </Button>
              <Button
                as={Link}
                to="/login"
                variant="outline"
                colorScheme="teal"
              >
                Login
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>
      {children}
    </Box>
  )
}

export default Background
