import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Checkbox, Skeleton } from '@chakra-ui/react'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { selectDate } from '../points/pointsSlice'
import {
  useGetPointsForHabitQuery,
  useAddNewPointMutation,
  useDeletePointMutation
} from '../points/pointsApiSlice'

function HabitCompletion({ habit }) {
  const { _id: id } = habit
  const date = useSelector(selectDate)
  const [addNewPoint] = useAddNewPointMutation()
  const [deletePoint] = useDeletePointMutation()
  const { data, isLoading } = useGetPointsForHabitQuery(id, 'HabitCompletion')
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    const alreadyCompleted = () => {
      const entities = data?.entities || {}
      const points = Object.values(entities) || []
      const check = points.find(
        (p) =>
          format(parseISO(p.date), 'MM/dd/yyyy') === format(date, 'MM/dd/yyyy')
      )
      const result = !!check
      setIsChecked(result)
    }
    alreadyCompleted()
  }, [isLoading, date])

  const handleClick = async () => {
    if (isChecked) {
      await deletePoint({ habitId: id, date })
    } else {
      await addNewPoint({ habit: String(id), date })
    }
    setIsChecked(!isChecked)
  }

  if (isLoading) return <Skeleton />

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
