/* eslint-disable react/jsx-props-no-spreading, react/no-unstable-nested-components */

import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import { Box, Spinner } from '@chakra-ui/react'
import { subDays, parseISO } from 'date-fns'
import { useDispatch } from 'react-redux'
import useAuth from '../../../hooks/useAuth'
import { useGetHabitsForUserQuery } from '../habitsApiSlice'
import getCountPerDay from '../../../utils/getCountPerDay'
import { setDate } from '../../date/dateSlice'
import './HabitHeatmap.css'

function Heatmap() {
  const { id } = useAuth()
  const endDate = new Date()
  const startDate = subDays(endDate, 365)
  const dispatch = useDispatch()

  const { data, isLoading } = useGetHabitsForUserQuery(id)

  if (isLoading) {
    return <Spinner />
  }

  const arrayData = Object.values(data.entities)

  const countPerDay = getCountPerDay(arrayData, startDate, endDate)
  // console.log(countPerDay)

  return (
    <Box w={{ base: '50rem', xl: '100%' }} mx="auto">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={countPerDay}
        classForValue={(value) => {
          if (!value) {
            return 'color-empty'
          }
          return `color-${value.count > 5 ? 5 : value.count}`
        }}
        tooltipDataAttrs={(value) => {
          return {
            'data-tip': `${value?.date?.toLocaleString() || null} | count: ${
              value.count
            }`
          }
        }}
        onClick={(value) => {
          // console.log(value)
          dispatch(setDate({ date: parseISO(value.date) }))
        }}
      />
    </Box>
  )
}
export default Heatmap
