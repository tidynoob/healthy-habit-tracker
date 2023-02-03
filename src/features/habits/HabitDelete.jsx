import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai'
import { useDeleteHabitMutation } from './habitsApiSlice'
import useOutsideClick from '../../hooks/useOutsideClick'

function HabitDelete({ habit }) {
  const { id } = habit
  const [confirm, setConfirm] = React.useState(false)
  const [deleteHabit] = useDeleteHabitMutation()

  const handleClickOutside = () => {
    setConfirm(false)
  }

  const ref = useOutsideClick(handleClickOutside)

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
      size="sm"
      ref={ref}
      variant={confirm ? 'solid' : 'ghost'}
      colorScheme={confirm ? 'red' : null}
      onClick={handleClick}
      icon={
        confirm ? (
          <AiFillDelete onClick={handleClick} pointerEvents="none" />
        ) : (
          <AiOutlineDelete onClick={handleClick} pointerEvents="none" />
        )
      }
    />
  )
}

export default HabitDelete
