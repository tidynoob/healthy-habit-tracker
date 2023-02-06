import React from 'react'
import { Box, Skeleton, Spinner } from '@chakra-ui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { addDays } from 'date-fns'
import useAuth from '../../hooks/useAuth'
import { useGetHabitsForUserQuery } from './habitsApiSlice'
import { selectDate } from '../date/dateSlice'
import { findMaxStreak, findCurrentStreak } from '../../utils/findStreaks'

const options = {
  indexAxis: 'y',
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

function StreakChart() {
  const { id } = useAuth()
  const date = new Date()
  const { data, isLoading } = useGetHabitsForUserQuery(id)

  if (isLoading) {
    return <Spinner />
  }

  const arrayData = Object.values(data.entities)

  const labels = arrayData?.map((habit) => habit.name)

  const asOfStreaks = arrayData?.map((habit) => {
    const { points: dates } = habit
    const streak = findCurrentStreak(dates, date)
    const yesterdayStreak = findCurrentStreak(dates, addDays(date, -1))
    const asOfStreak = Math.max(streak, yesterdayStreak)
    return asOfStreak
  })

  const maxStreaks = arrayData?.map((habit) => {
    const { points: dates } = habit
    const streak = findMaxStreak(dates, date)
    const yesterdayStreak = findMaxStreak(dates, addDays(date, -1))
    const maxStreak = Math.max(streak, yesterdayStreak)
    return maxStreak
  })

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Streak',
        data: asOfStreaks,
        backgroundColor: 'rgb(11, 197, 234, 0.2)',
        borderColor: 'rgb(11, 197, 234)',
        borderWidth: 1
      },
      {
        label: 'Max Streak',
        data: maxStreaks,
        backgroundColor: 'rgb(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 1
      }
    ]
  }

  return (
    <Box w="full" bg="white" borderRadius="base" p="4" position="relative">
      <Bar data={chartData} options={options} />
    </Box>
  )
}

export default StreakChart
