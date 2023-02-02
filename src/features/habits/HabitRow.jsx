import { HStack, IconButton, Tr, Td, Text } from '@chakra-ui/react'
import React from 'react'
import HabitCompletion from './HabitCompletion'

function HabitRow({ habit }) {
  const { name } = habit

  return (
    <Tr>
      <Td>
        <HStack>
          <IconButton />
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
