import React from 'react'
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react'
import { BiPlusCircle, BiCheckCircle } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'
import { useAddNewHabitMutation } from './habitsApiSlice'
import useAuth from '../../hooks/useAuth'
import useOutsideClick from '../../hooks/useOutsideClick'

function NewHabitButton() {
  const { user } = useAuth0()
  const { sub: id } = user

  const [habitName, setHabitName] = React.useState('')
  const [confirm, setConfirm] = React.useState(false)

  const [addNewHabit, { isLoading }] = useAddNewHabitMutation()

  const handleClickOutside = () => {
    setConfirm(false)
  }

  const ref = useOutsideClick(handleClickOutside)

  const handleClick = async () => {
    if (habitName === '') {
      return
    }
    if (confirm) {
      // Add habit to database
      await addNewHabit({
        name: habitName,
        userId: String(id)
      })
      setHabitName('')
      setConfirm(false)
    } else {
      setConfirm(true)
    }
  }

  if (isLoading) {
    return <Text>Adding habit...</Text>
  }

  return (
    <InputGroup mt="auto" w="full">
      <Input
        placeholder="Add Habit"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <InputRightElement>
        <IconButton
          ref={ref}
          variant="ghost"
          colorScheme={confirm ? 'green' : 'white'}
          onClick={handleClick}
          icon={
            confirm ? (
              <BiCheckCircle onClick={handleClick} pointerEvents="none" />
            ) : (
              <BiPlusCircle onClick={handleClick} pointerEvents="none" />
            )
          }
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default NewHabitButton
