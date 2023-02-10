import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import React from 'react'

function SignupButton() {
  const { loginWithRedirect } = useAuth0()

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dash'
      },
      authorizationParams: {
        screen_hint: 'signup'
      }
    })
  }

  return (
    <Button variant="solid" colorScheme="teal" onClick={handleSignUp}>
      Sign Up
    </Button>
  )
}

export default SignupButton
