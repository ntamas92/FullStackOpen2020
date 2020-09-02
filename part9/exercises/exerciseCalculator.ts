interface DailyInfo {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (dailyHours : Array<number>, targetDaily : number) : DailyInfo => {

  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(x => x > 0).length
  const target = targetDaily
  const average = dailyHours.reduce((prev, cur) => prev + cur, 0) / dailyHours.length

  const success = average >= target;
  const rating = 2
  const ratingDescription = "not too bad but could be better"

   const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
   }

   return result
}

interface ExerciseParams {
  target: number,
  days: Array<number>
}

const parseExerciseArguments = (args: Array<string>): ExerciseParams => {
  if(args.length < 4)
    throw Error("Not enough arguments were given")

  const [target, ...days] = args.slice(2).map(Number)

  if(isNaN(target) || days.findIndex(isNaN) > -1)
    throw Error("one of the inputs was not a number")

  return { target, days }
}

const exerciseParams = parseExerciseArguments(process.argv)

console.log(calculateExercises(exerciseParams.days, exerciseParams.target))