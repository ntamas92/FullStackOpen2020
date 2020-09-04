import express from "express";
import cors from "cors";

import diagnoseRouter from "./routes/diagnose";
import patientRouter from "./routes/patients";

const app = express()
app.use(cors())


app.get("/api/ping", (_req, res) => {
  res.send("pong").end()
})

const PORT = 3001

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`App now listening at ${PORT}`)
})