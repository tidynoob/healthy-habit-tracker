import React from 'react'
import { Box } from '@chakra-ui/react'
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
      backgroundColor: 'rgb(11, 197, 234, 0.2)',
      borderColor: 'rgb(11, 197, 234)',
      borderWidth: 1
    }
  ]
}

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
  return (
    <Box
      w="full"
      bg="white"
      borderRadius="base"
      p="4"
      position="relative"
      // maxH="50vh"
    >
      <Bar data={data} options={options} />
    </Box>
  )
}

export default StreakChart
