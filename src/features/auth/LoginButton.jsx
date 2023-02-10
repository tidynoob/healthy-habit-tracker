import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import React from 'react'

function LoginButton() {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dash'
      }
    })
  }

  return (
    <Button
      variant="outline"
      colorScheme="teal"
      bg="white"
      onClick={handleLogin}
    >
      Log In
    </Button>
  )
}

export default LoginButton
