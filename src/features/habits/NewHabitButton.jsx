import React from 'react'
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react'
import { BiPlusCircle, BiCheckCircle } from 'react-icons/bi'
import { useAddNewHabitMutation } from './habitsApiSlice'
import useAuth from '../../hooks/useAuth'
import useOutsideClick from '../../hooks/useOutsideClick'

function NewHabitButton() {
  const { id } = useAuth()

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
        user: String(id)
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
    <InputGroup>
      <Input
        placeholder="Add Habit"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
      />
      <InputRightElement>
        <IconButton
          ref={ref}
          colorScheme={confirm ? 'green' : null}
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
