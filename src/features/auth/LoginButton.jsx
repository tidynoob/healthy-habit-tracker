import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

function LoginButton() {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/dash'
      }
    })
    const accessToken = await getAccessTokenSilently()
    dispatch(setCredentials({ accessToken }))
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
