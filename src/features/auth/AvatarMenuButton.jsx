import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Avatar from './Avatar'

function AvatarMenuButton() {
  const { logout } = useAuth0()

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }

  return (
    <Menu placement="bottom-end">
      <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
        <Avatar />
      </MenuButton>
      <MenuList minW="40">
        <MenuItem>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default AvatarMenuButton
