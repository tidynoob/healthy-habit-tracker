import React from 'react'
// import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import StreakChart from '../habits/StreakChart'
import DatePicker from '../date/DatePicker'
import HabitTable from '../habits/HabitTable'
import NewHabitButton from '../habits/NewHabitButton'
import Heatmap from '../habits/Heatmap'

function Welcome() {
  // const date = new Date()
  // const today = new Intl.DateTimeFormat('en-US', {
  //   dateStyle: 'full',
  //   timeStyle: 'long'
  // }).format(date)

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '1fr', md: '1fr 3fr' }}
      gap="4"
    >
      <Box
        gridColumnStart={1}
        gridColumnEnd={{ base: '-1', md: '2' }}
        gridRow={{ base: '1 / span 1', md: '1 / span 2' }}
        bg="white"
        borderRadius="base"
        p="4"
        display="flex"
        flexDirection="column"
        gap="4"
      >
        <DatePicker />
        <HabitTable />
        <NewHabitButton />
      </Box>
      <Box gridColumnStart={{ base: '1', md: '2' }} maxW="100%">
        <StreakChart />
      </Box>
      <Box
        gridColumnStart={{ base: '1', md: '2' }}
        gridColumnEnd={-1}
        bg="white"
        borderRadius="base"
        p="4"
        maxW="full"
        overflowX={{ base: 'scroll', xl: 'hidden' }}
        dir="rtl"
      >
        <Heatmap />
      </Box>
    </Box>
  )
}

export default Welcome

/* <Link to="/dash/habits">Habits</Link>
      <Link to="/dash/users">User Settings</Link> */
