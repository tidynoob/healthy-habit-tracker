import React from 'react'
import { Box, Text, IconButton, Container } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'

function DashFooter() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onGoHomeClicked = () => navigate('/dash')

  const goHomeButton = pathname !== '/dash' && (
    <IconButton onClick={onGoHomeClicked} icon={<AiOutlineHome />}>
      Go Home
    </IconButton>
  )

  return (
    <Box as="footer" w="full">
      <Container maxW="container.3xl">
        {goHomeButton}
        <Text>Current User:</Text>
        <Text>Status:</Text>
      </Container>
    </Box>
  )
}

export default DashFooter
