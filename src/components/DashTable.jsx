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

function DashTable() {
  const rows = data.map((row) => (
    <Tr>
      <Td>{row.habit}</Td>
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
            <Th>Habit</Th>
            <Th>Completed?</Th>
          </Tr>
        </Thead>
        <Tbody>{rows}</Tbody>
      </Table>
    </TableContainer>
  )
}

export default DashTable
