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
import useAuth from '../../hooks/useAuth'
import { useGetHabitsForUserQuery } from './habitsApiSlice'
import HabitRow from './HabitRow'

function HabitTable() {
  const { id } = useAuth()

  const { data, isLoading } = useGetHabitsForUserQuery(id)

  if (isLoading) {
    return <Spinner />
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
