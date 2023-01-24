import React from 'react'
// import { Link } from 'react-router-dom'
import { Box, Button } from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import StreakChart from '../../components/StreakChart'
import DatePicker from '../../components/DatePicker'
import DashTable from '../../components/DashTable'

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
        <DashTable />
        <Button
          colorScheme="teal"
          variant="ghost"
          w="full"
          leftIcon={<AiOutlinePlus />}
        >
          Add Habit
        </Button>
      </Box>
      <StreakChart />
    </Box>
  )
}

export default Welcome

/* <Link to="/dash/habits">Habits</Link>
      <Link to="/dash/users">User Settings</Link> */
