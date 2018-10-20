export const PERIODS = [
  { value: 'year', label: 'Year' },
  { value: 'month', label: 'Month' },
  { value: 'week', label: 'Week' },
  { value: 'day', label: 'Day' },
  { value: 'hour', label: 'Hour' }
]

export const MEASUREMENTS = [
  { value: 'count', label: 'Count' },
  { value: 'avg_duration', label: 'Average Duration' }
]

export const DEFAULT_TARGETS = {
  count_year: 1000,
  count_month: 300,
  count_week: 80,
  count_day: 15,
  count_hour: 2,
  avg_duration_year: 20,
  avg_duration_month: 20,
  avg_duration_week: 20,
  avg_duration_day: 20,
  avg_duration_hour: 20
}
