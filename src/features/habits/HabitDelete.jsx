import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai'
import { useDeleteHabitMutation } from './habitsApiSlice'

function HabitDelete({ habit }) {
  const { id } = habit
  const [confirm, setConfirm] = React.useState(false)
  const [deleteHabit] = useDeleteHabitMutation()

  const handleClick = async () => {
    if (confirm) {
      // Delete habit from database
      await deleteHabit(id)
    } else {
      setConfirm(true)
    }
  }

  return (
    <IconButton
      variant={confirm ? 'solid' : 'ghost'}
      colorScheme={confirm ? 'red' : null}
      onClick={handleClick}
      icon={confirm ? <AiFillDelete /> : <AiOutlineDelete />}
    />
  )
}

export default HabitDelete
