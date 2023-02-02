import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Spinner
} from '@chakra-ui/react'
import React from 'react'
import useAuth from '../../hooks/useAuth'
import { useGetHabitsForUserQuery } from './habitsApiSlice'

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
    <Tr key={i}>
      <Td textAlign="right">{habit.name}</Td>
      <Td textAlign="center">
        <Checkbox colorScheme="teal" size="lg" />
      </Td>
    </Tr>
  ))

  return (
    <TableContainer>
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
