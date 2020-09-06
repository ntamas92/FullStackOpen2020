import express from 'express';
import patientService from "../services/patientService";
import { parsePatientData, NewPatientData } from "../types/patientTypes";

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getEntries())
})

router.post('/', (req, res) => {
  const patientData: any = req.body
  console.log(req.body)
  const parsedPatientData : NewPatientData = parsePatientData(patientData)
  
  const newPatient = patientService.addEntry(parsedPatientData)

  res.json(newPatient)
})

export default router;