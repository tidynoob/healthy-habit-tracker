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
      {children}
    </Box>
  )
}

export default Background
