import React, { useState } from 'react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { FormControl, FormLabel } from '@chakra-ui/react'

function DatePicker() {
  const [date, setDate] = useState(new Date())
  //   console.log(date)

  const config = {
    dateNavBtnProps: {
      colorScheme: 'teal',
      variant: 'ghost'
    },
    dayOfMonthBtnProps: {
      defaultBtnProps: {
        borderColor: 'teal.500',
        variant: 'outline',
        _hover: {
          background: 'teal.50'
        },
        _active: {
          background: 'teal.100'
        }
      },
      selectedBtnProps: {
        background: 'teal.100'
      },
      todayBtnProps: {
        borderColor: 'teal.500'
      }
    },
    inputProps: {}
  }

  return (
    <FormControl display="flex" alignItems="center" gap="4">
      <FormLabel fontWeight="bold" htmlFor="date" whiteSpace="nowrap" m="0">
        Select Date
      </FormLabel>
      <SingleDatepicker
        name="date"
        usePortal="true"
        propsConfigs={config}
        onDateChange={setDate}
        maxDate={new Date()}
        date={date}
      />
    </FormControl>
  )
}

export default DatePicker
