import { Link } from 'react-router-dom'
import React from 'react'
import {
  Box,
  Container,
  Heading,
  Flex,
  Image,
  Text,
  HStack,
  Button
} from '@chakra-ui/react'

// <Link to="/login">Login</Link>

function Public() {
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
      <Box as="main" w="full" py="4" px={{ base: '1rem', lg: '0' }}>
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
          <Flex
            justify="center"
            align="center"
            direction="column"
            mt={{ base: '16', sm: '36' }}
            gap="4"
          >
            <Heading
              as="h1"
              fontSize="6xl"
              fontWeight="bold"
              color="white"
              textAlign="center"
            >
              <Text
                as="span"
                fontSize="inherit"
                fontWeight="inherit"
                background="linear-gradient(150deg, #4FD1C5 6.07%, #00B5D8 50%)"
                bgClip="text"
              >
                Transform
              </Text>{' '}
              your life
            </Heading>
            <Text fontSize="2xl" color="white" maxW="sm" textAlign="center">
              Take control of your habits, improve your health and well-being
              with our easy-to-use tracker
            </Text>
            <HStack spacing="4">
              <Button as={Link} to="/register" size="lg" colorScheme="teal">
                Sign Up
              </Button>
              <Button
                as={Link}
                to="/login"
                variant="outline"
                size="lg"
                colorScheme="teal"
                bg="white"
              >
                Login
              </Button>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

export default Public
