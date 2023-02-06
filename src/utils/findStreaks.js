import { parseISO, isSameDay, addDays } from 'date-fns'

function findMaxStreak(dates, asOfDate) {
  const datesCopy = [...dates]
  const datesAsDates = datesCopy.map((date) => parseISO(date))
  const sortedDates = datesAsDates.sort((a, b) => a - b)
  let maxStreak = []
  let currentStreak = []

  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i]
    if (i === 0 || isSameDay(date, addDays(sortedDates[i - 1], 1))) {
      currentStreak.push(date)
    } else {
      if (currentStreak.length > maxStreak.length) {
        maxStreak = currentStreak
      }
      currentStreak = [date]
    }
  }

  if (currentStreak.length > maxStreak.length) {
    maxStreak = currentStreak
  }

  return maxStreak.length
}

function findCurrentStreak(dates, asOfDate) {
  const datesCopy = [...dates]
  const datesAsDates = datesCopy.map((date) => parseISO(date))
  const sortedDates = datesAsDates.sort((a, b) => b - a)
  const currentStreak = []

  if (!isSameDay(sortedDates[0], asOfDate)) {
    return 0
  }
  for (let i = 0; i < sortedDates.length; i++) {
    const date = sortedDates[i]
    // console.log(addDays(sortedDates[i - 1], 1))
    if (i === 0 || isSameDay(date, addDays(sortedDates[i - 1], -1))) {
      currentStreak.push(date)
    } else {
      break
    }
  }

  return currentStreak.length
}

export { findMaxStreak, findCurrentStreak }
