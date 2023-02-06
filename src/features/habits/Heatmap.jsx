/* eslint-disable react/jsx-props-no-spreading, react/no-unstable-nested-components */

import React from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import Tooltip from '@uiw/react-tooltip'
// import { Tooltip, TooltipProvider } from 'react-tooltip'
import { Box } from '@chakra-ui/react'
import 'react-calendar-heatmap/dist/styles.css'

function Heatmap() {
  return (
    <Box w={{ base: '50rem', xl: '100%' }} mx="auto">
      <CalendarHeatmap
        startDate={new Date('2022-02-06')}
        endDate={new Date()}
        values={[
          { date: '2023-01-01', count: 12 },
          { date: '2023-01-22', count: 122 },
          { date: '2023-01-30', count: 38 }
          // ...and so on
        ]}
      />
    </Box>
  )
}
export default Heatmap
