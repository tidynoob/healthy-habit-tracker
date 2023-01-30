import React from 'react'
import { Button } from '@chakra-ui/react'
import { BiPlusCircle } from 'react-icons/bi'

function NewHabitButton() {
  return (
    <Button
      colorScheme="teal"
      variant="ghost"
      leftIcon={<BiPlusCircle />}
      alignItems="center"
    >
      Add Habit
    </Button>
  )
}

export default NewHabitButton
