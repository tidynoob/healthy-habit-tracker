import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Heading, Text } from '@chakra-ui/react'

function Welcome() {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(date)

  return (
    <Box as="section" w="full">
      <Container maxW="container.3xl">
        <Heading>Welcome to the Healthy Habit Tracker!</Heading>
        <Text>Today is {today}</Text>
        <Link to="/dash/habits">Habits</Link>
        <Link to="/dash/users">User Settings</Link>
      </Container>
    </Box>
  )
}

export default Welcome
