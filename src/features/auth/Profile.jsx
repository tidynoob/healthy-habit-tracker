import { useAuth0 } from '@auth0/auth0-react'
import { Container, Heading, Image } from '@chakra-ui/react'
import React from 'react'

function Profile() {
  const { user } = useAuth0()
  // console.log('user', user)

  if (!user) {
    return null
  }

  return (
    <Container
      maxW="sm"
      display="flex"
      bg="white"
      borderRadius="base"
      p="4"
      flexDir="column"
      alignItems="center"
      gap="4"
    >
      <Image
        src={user.picture}
        alt={user.name}
        h="5rem"
        w="5rem"
        borderRadius="full"
      />
      <Heading size="xl">{user.name}</Heading>
    </Container>
  )
}

export default Profile
