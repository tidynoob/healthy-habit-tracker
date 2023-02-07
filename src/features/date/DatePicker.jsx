import React, { useEffect, useState } from 'react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import { FormControl, FormLabel } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { selectDate, setDate as setGlobalDate } from './dateSlice'

function DatePicker() {
  const globalDate = useSelector(selectDate)
  const [date, setDate] = useState(globalDate)
  //   console.log(date)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setGlobalDate({ date }))
  }, [date])

  useEffect(() => {
    setDate(globalDate)
  }, [globalDate])

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
    <FormControl display="flex" alignItems="center" gap="4" w="full">
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
