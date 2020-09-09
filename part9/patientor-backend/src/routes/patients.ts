import express from 'express';
import patientService from "../services/patientService";
import { parsePatientData, NewPatientData } from "../types/patientTypes";
import { parseEntry } from '../types/entryTypes';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getEntries());
});

router.get('/:id', (req, res) => {
  res.json(patientService.getDetails(req.params.id));
});

router.post("/:id/entries", (req, res) => {
  const entry = parseEntry(req.body);

  //TODO:Error handling
  res.status(201).json(patientService.addPatientEntry(req.params.id, entry));
});

router.post('/', (req, res) => {
  const parsedPatientData: NewPatientData = parsePatientData(req.body);
  
  const newPatient = patientService.addPatient(parsedPatientData);

  res.json(newPatient);
});

export default router;