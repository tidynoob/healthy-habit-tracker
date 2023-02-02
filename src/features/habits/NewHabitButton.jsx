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

function NewHabitButton() {
  const { id } = useAuth()
  // console.log(id)

  const [habitName, setHabitName] = React.useState('')
  const [confirm, setConfirm] = React.useState(false)

  const [addNewHabit, { isLoading }] = useAddNewHabitMutation()

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
          colorScheme={confirm ? 'green' : null}
          onClick={handleClick}
          icon={confirm ? <BiCheckCircle /> : <BiPlusCircle />}
        />
      </InputRightElement>
    </InputGroup>
  )
}

export default NewHabitButton
