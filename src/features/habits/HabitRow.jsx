import { HStack, Tr, Td, Text } from '@chakra-ui/react'
import React from 'react'
import HabitCompletion from './HabitCompletion'
import HabitDelete from './HabitDelete'

function HabitRow({ habit }) {
  const { name } = habit

  return (
    <Tr>
      <Td>
        <HStack>
          <HabitDelete habit={habit} />
          <Text>{name}</Text>
        </HStack>
      </Td>
      <Td textAlign="center">
        <HabitCompletion habit={habit} />
      </Td>
    </Tr>
  )
}

export default HabitRow
