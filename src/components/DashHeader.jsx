import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Flex, Heading } from '@chakra-ui/react'

function DashHeader() {
  return (
    <Box as="header" w="full">
      <Container maxW="container.3xl">
        <Flex>
          <Link to="/dash">
            <Heading>Healthy Habit Tracker</Heading>
          </Link>
          <Flex as="nav">{/* nav buttons */}</Flex>
        </Flex>
      </Container>
    </Box>
  )
}

export default DashHeader
