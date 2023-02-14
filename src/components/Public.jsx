import React from 'react'
import { Box, Container, Heading, Flex, Text, HStack } from '@chakra-ui/react'
import Background from './Background'
import SignupButton from '../features/auth/SignUpButton'
import LoginButton from '../features/auth/LoginButton'
import Header from './Header'

function Public() {
  return (
    <Background>
      <Header>
        <SignupButton />
        <LoginButton />
      </Header>
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
              <SignupButton />
              <LoginButton />
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Background>
  )
}

export default Public
