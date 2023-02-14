import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Spinner
} from '@chakra-ui/react'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useGetHabitsForUserQuery } from './habitsApiSlice'
import HabitRow from './HabitRow'

function HabitTable() {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth0()
  const { sub: id } = user
  // console.log(id)
  // console.log(isAuthenticated)

  const { data, isLoading, isError, error } = useGetHabitsForUserQuery(id)

  if (isLoading || isAuthLoading || !isAuthenticated) {
    return null
  }

  if (isError) {
    return <div>{error.message}</div>
  }

  const { entities } = data
  const habits = Object.values(entities)

  const rows = habits?.map((habit, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <HabitRow key={i} habit={habit} />
  ))

  return (
    <TableContainer w="full">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center">Habit</Th>
            <Th textAlign="center">Completed?</Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  )
}

export default HabitTable
