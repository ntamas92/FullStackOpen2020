import express from "express";
const app = express()

app.get("/ping", (_req, res) => {
  res.send("pong").end()
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`App now listening at ${PORT}`)
})