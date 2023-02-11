import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Checkbox } from '@chakra-ui/react'
// import format from 'date-fns/format'
// import parseISO from 'date-fns/parseISO'
import { isSameDay, parseISO } from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react'
import { selectDate } from '../date/dateSlice'
import { useUpdateHabitMutation } from './habitsApiSlice'
import useAuth from '../../hooks/useAuth'

function HabitCompletion({ habit }) {
  const { user } = useAuth0()
  const { sub: userId } = user

  const { _id: id, name: habitName, points } = habit
  const date = useSelector(selectDate)
  const preChecked = !!points.find((point) => {
    return isSameDay(parseISO(point), date)
  })

  const [updateHabit] = useUpdateHabitMutation()
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setIsChecked(preChecked)
  }, [preChecked])

  const handleClick = async () => {
    const habitObject = {
      id,
      name: String(habitName),
      user: String(userId),
      date
    }
    if (isChecked) {
      await updateHabit(habitObject)
    } else {
      await updateHabit(habitObject)
    }
    setIsChecked(!isChecked)
  }

  return (
    <Checkbox
      colorScheme="teal"
      size="lg"
      isChecked={isChecked}
      onChange={handleClick}
    />
  )
}

export default HabitCompletion
