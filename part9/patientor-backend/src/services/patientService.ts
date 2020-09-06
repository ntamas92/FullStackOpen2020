import patientData from '../data/patients'
import { PublicPatientData, NewPatientData, PatientData } from "../types/patientTypes"

const getEntries = (): Array<PublicPatientData> => {
  return patientData.map(convertToPublic);
};

const addEntry = (entry: NewPatientData) : PublicPatientData => {
  const id = Math.random() * 10000

  const newEntry = { ...entry, id: id.toString() }
  patientData.push(newEntry)

  return convertToPublic(newEntry)
};

const convertToPublic = (entry: PatientData): PublicPatientData => {
  const { ssn, ...publicData } = entry
  return publicData
}

export default {
  getEntries,
  addEntry
};