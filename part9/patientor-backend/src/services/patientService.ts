import patientData from '../data/patients.json'
import { PublicPatientData } from "../types/patientTypes"

const getEntries = (): Array<PublicPatientData> => {
  return patientData.map(x => {
    const { ssn, ...rest } = x
    return { ...rest, dateOfBirth: new Date(rest.dateOfBirth) }}
  );
};

const addEntry = (_entry: PublicPatientData) => {
  return null;
};

export default {
  getEntries,
  addEntry
};