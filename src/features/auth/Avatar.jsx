import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Avatar as ChakraAvatar, forwardRef } from '@chakra-ui/react'

const Avatar = forwardRef((props, ref) => {
  const { user } = useAuth0()
  const { name, picture } = user

  return <ChakraAvatar h="40px" w="40px" name={name} src={picture} ref={ref} />
})

export default Avatar
