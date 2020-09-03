import express from "express"
import { calculateBmi } from "./bmiCalculator"
import { DailyInfo, calculateExercises } from "./exerciseCalculator"

const app = express()
app.use(express.json())


app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!")
})

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight)
  const height = Number(req.query.height)

  const bmi = calculateBmi(weight, height)

  res.json({ weight, height, bmi })
})

app.get("/exercises", (req, res) => {
  const exerciseInput = req.body

  if (!exerciseInput.daily_exercises || !exerciseInput.target) {
    res.status(400).json({ error: "parameters missing" })
  }

  if (isNaN(exerciseInput.target) || !Array.isArray(exerciseInput.daily_exercises) || exerciseInput.daily_exercises.findIndex(isNaN) > -1)
    res.status(400).json({ error: "parameters malformed" })

  console.log("notmissing")
  const dailyExercises = <Array<number>>exerciseInput.daily_exercises
  const target = <number>exerciseInput.target

  const dailyInfo: DailyInfo = calculateExercises(dailyExercises, target)

  res.json(dailyInfo)
})

const PORT = 3003



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})