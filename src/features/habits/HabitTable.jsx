import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox
} from '@chakra-ui/react'
import React from 'react'

const data = [
  {
    habit: 'Habit 1',
    completed: true
  },
  {
    habit: 'Habit 2',
    completed: false
  },
  {
    habit: 'Habit 3',
    completed: true
  }
]

function HabitTable() {
  const rows = data.map((row, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Tr key={i}>
      <Td textAlign="right">{row.habit}</Td>
      <Td textAlign="center">
        <Checkbox colorScheme="teal" size="lg" isChecked={row.completed} />
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
