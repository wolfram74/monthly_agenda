#Features

* setting a check in day
* setting goals on last check in day of the month for next month
* auto generating status update form for each check in

#Possible data format
top level data
checkInDay:int
yearMonth: month object
monthObject
  goals: array of goal objects
  weeks: array of week objects
  monthlyReflection: array of reflection strings
  monthlyProgress: array of 0-2 progress indicator
weekObject
  dailyChecks: array of arrays with booleans
  weeklyProgress: array of 0-2 progress indicators
  weeklyReflection: array of reflection strings
goalObject
  description: string describing broad goal
  plan: how goal will be met
  nonZeroThreshold: int describing minimum minutes for "worked on"

#problems to solve

* determining if a checkInDay has been set
* determining what months should be defined
* determining which week is being looked at
