import { Link } from 'react-router-dom'
import React from 'react'
import {
  Box,
  Container,
  Heading,
  Flex,
  Text,
  HStack,
  Button
} from '@chakra-ui/react'
import Background from './Background'

// <Link to="/login">Login</Link>

function Public() {
  return (
    <Background>
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
    </Background>
  )
}

export default Public
