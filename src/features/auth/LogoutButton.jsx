import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'
import React from 'react'

function LogoutButton() {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }

  return (
    <Button
      variant="outline"
      bg="white"
      colorScheme="teal"
      onClick={handleLogout}
    >
      Log Out
    </Button>
  )
}

export default LogoutButton
