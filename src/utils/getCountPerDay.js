import { eachDayOfInterval, format } from 'date-fns'

const getCountPerDay = (habits, startDate, endDate) => {
  const days = eachDayOfInterval({ start: startDate, end: endDate })
  const countPerDay = days.map((day) => {
    const count = habits.reduce((acc, habit) => {
      if (habit.points.includes(day.toISOString())) {
        return acc + 1
      }
      return acc
    }, 0)
    return { date: format(day, 'yyyy-MM-dd'), count }
  })
  return countPerDay
}

export default getCountPerDay
