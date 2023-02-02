import React, { useEffect, useState } from 'react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
// import format from 'date-fns/format'
import { setDate as setGlobalDate } from '../features/points/pointsSlice'

function DatePicker() {
  const [date, setDate] = useState(new Date())
  //   console.log(date)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setGlobalDate({ date }))
  }, [date])

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
        dateFormat="MM/dd/yyyy"
      />
    </FormControl>
  )
}

export default DatePicker
