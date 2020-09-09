import initialPatientData from '../data/patients';
import { PublicPatientData, NewPatientData, PatientData } from "../types/patientTypes";
import { Entry } from '../types/entryTypes';

let patientData = initialPatientData;

const getEntries = (): Array<PublicPatientData> => {
  return patientData.map(convertToPublic);
};

const getDetails = (patientId: string): PatientData | undefined => {
  return patientData.find(x => x.id === patientId);
};

const addPatient = (newPatient: NewPatientData): PublicPatientData => {
  const id = Math.random() * 10000;

  const createdPatient = { ...newPatient, id: id.toString() };
  patientData.push(createdPatient);

  return convertToPublic(createdPatient);
};

const addPatientEntry = (patientId: string, newEntry: Entry): Entry => {
  const id = Math.random() * 10000;

  const createdEntry = { ...newEntry, id: id.toString() };
  const patient = patientData.find(x => x.id === patientId);

  //TODO: It would be better to communicate missing patient with proper status code
  if (!patient)
    throw new Error("patient not found");

  const extendedPatient = { ...patient, entries: patient.entries.concat(createdEntry) };

  patientData = patientData.map(x => x === patient ? extendedPatient : x);

  return createdEntry;
};

const convertToPublic = (entry: PatientData): PublicPatientData => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...publicData } = entry;
  return publicData;
};

export default {
  getEntries,
  getDetails,
  addPatient,
  addPatientEntry
};