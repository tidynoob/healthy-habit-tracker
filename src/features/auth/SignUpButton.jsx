import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

function SignupButton() {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dash'
      },
      authorizationParams: {
        screen_hint: 'signup'
      }
    })
    const accessToken = await getAccessTokenSilently()
    dispatch(setCredentials({ accessToken }))
  }

  return (
    <Button variant="solid" colorScheme="teal" onClick={handleSignUp}>
      Sign Up
    </Button>
  )
}

export default SignupButton
