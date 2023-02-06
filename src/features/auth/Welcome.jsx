import React from 'react'
// import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import StreakChart from '../habits/StreakChart'
import DatePicker from '../date/DatePicker'
import HabitTable from '../habits/HabitTable'
import NewHabitButton from '../habits/NewHabitButton'

function Welcome() {
  // const date = new Date()
  // const today = new Intl.DateTimeFormat('en-US', {
  //   dateStyle: 'full',
  //   timeStyle: 'long'
  // }).format(date)

  return (
    <Box display="grid" gridTemplateColumns="1fr 3fr" gap="4">
      <Box
        gridColumnStart={1}
        gridColumnEnd={2}
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
      <StreakChart />
    </Box>
  )
}

export default Welcome

/* <Link to="/dash/habits">Habits</Link>
      <Link to="/dash/users">User Settings</Link> */
