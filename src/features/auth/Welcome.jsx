import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Container, Heading, Text } from '@chakra-ui/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

const data = {
  labels: ['Habit 1', 'Habit 2', 'Habit 3'],
  datasets: [
    {
      label: 'Streak',
      data: [
        faker.datatype.number(10),
        faker.datatype.number(10),
        faker.datatype.number(10)
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }
  ]
}

const options = {
  indexAxis: 'y',
  maintainAspectRatio: false,
  responsive: false,
  scales: {
    x: {
      beginAtZero: true
    }
  }
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip)

function StreakChart() {
  return <Bar data={data} options={options} height={300} width={200} />
}

function Welcome() {
  const date = new Date()
  const today = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(date)

  return (
    <Box as="section" w="full">
      <Container maxW="container.3xl">
        <Heading>Welcome to the Healthy Habit Tracker!</Heading>
        <Text>Today is {today}</Text>
        <StreakChart />
        <Link to="/dash/habits">Habits</Link>
        <Link to="/dash/users">User Settings</Link>
      </Container>
    </Box>
  )
}

export default Welcome
