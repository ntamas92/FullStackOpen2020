export interface DailyInfo {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (dailyHours : Array<number>, targetDaily : number) : DailyInfo => {

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