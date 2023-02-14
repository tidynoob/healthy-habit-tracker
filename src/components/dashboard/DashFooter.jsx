import React from 'react'
// import { Link } from 'react-router-dom'
// import { Box, Text, IconButton, Container } from '@chakra-ui/react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { AiOutlineHome } from 'react-icons/ai'
import {
  Box,
  Container
  // Flex,
  // Heading,
  // Image,
  // HStack,
  // Button
} from '@chakra-ui/react'

function DashFooter() {
  // const navigate = useNavigate()
  // const { pathname } = useLocation()

  // const onGoHomeClicked = () => navigate('/dash')

  // const goHomeButton = pathname !== '/dash' && (
  //   <IconButton onClick={onGoHomeClicked} icon={<AiOutlineHome />}>
  //     Go Home
  //   </IconButton>
  // )

  return (
    // <Box as="footer" w="full">
    //   <Container maxW="container.3xl">
    //     <Text>Current User:</Text>
    //     <Text>Status:</Text>
    //   </Container>
    // </Box>
    <Box
      as="header"
      w="full"
      background="transparent"
      px={{ base: '1rem', lg: '0' }}
      py="4"
      pos="fixed"
      bottom="0"
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
      />
    </Box>
  )
}

export default DashFooter
