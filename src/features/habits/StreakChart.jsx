import React from 'react'
import { Box, Spinner, Text } from '@chakra-ui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { addDays } from 'date-fns'
import { useAuth0 } from '@auth0/auth0-react'
import { useGetHabitsForUserQuery } from './habitsApiSlice'
import { findMaxStreak, findCurrentStreak } from '../../utils/findStreaks'

const options = {
  indexAxis: 'y',
  responsive: true,
  // maintainAspectRatio: false,
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
  const { user, isLoading: isAuthLoading, isAuthenticated } = useAuth0()
  const { sub: id } = user

  const date = new Date()
  const { data, isLoading, isError } = useGetHabitsForUserQuery(id)

  if (isLoading || isAuthLoading || !isAuthenticated) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        bg="white"
        p="4"
        borderRadius="base"
        h="full"
      >
        <Spinner />
      </Box>
    )
  }

  if (isError) {
    return (
      <Box
        bg="white"
        borderRadius="base"
        p="4"
        position="relative"
        w="full"
        minW="300px"
        maxW="100%"
        h="full"
      >
        <Text>Something went wrong</Text>
      </Box>
    )
  }

  const arrayData = Object.values(data.entities)
  if (arrayData.length === 0) {
    return (
      <Box
        bg="white"
        borderRadius="base"
        p="4"
        position="relative"
        w="full"
        minW="300px"
        maxW="100%"
      >
        <Text>Add a habit to start building a streak!</Text>
      </Box>
    )
  }

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
    <Box
      bg="white"
      borderRadius="base"
      p="4"
      position="relative"
      w="full"
      minW="300px"
      maxW="100%"
    >
      <Bar data={chartData} options={options} />
    </Box>
  )
}

export default StreakChart
