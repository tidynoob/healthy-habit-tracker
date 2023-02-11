/* eslint-disable react/jsx-props-no-spreading, react/no-unstable-nested-components */

import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import { Box, Spinner } from '@chakra-ui/react'
import { subDays, parseISO } from 'date-fns'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import useAuth from '../../../hooks/useAuth'
import { useGetHabitsForUserQuery } from '../habitsApiSlice'
import getCountPerDay from '../../../utils/getCountPerDay'
import { setDate } from '../../date/dateSlice'
import './HabitHeatmap.css'

function Heatmap() {
  const { user, isLoading: isAuthLoading, isAuthenticated } = useAuth0()
  const { sub: id } = user

  const endDate = new Date()
  const startDate = subDays(endDate, 365)
  const dispatch = useDispatch()

  const { data, isLoading, isError } = useGetHabitsForUserQuery(id)

  if (isLoading || isAuthLoading || !isAuthenticated) {
    return <Spinner />
  }

  if (isError) {
    return <div>Something went wrong</div>
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
