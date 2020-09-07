import { isString, parseDate, parseEnum } from "../utils/typeValidator"
import { Entry } from "./entryTypes"

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}


export interface PatientData {
  id: string,
  name: string,
  dateOfBirth: Date,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export type PublicPatientData = Omit<PatientData, "ssn" | "entries">

export type NewPatientData = Omit<PatientData, "id">

export const parsePatientData = (patientData: any): NewPatientData => {
  if (!isString(patientData.name))
    throw Error("name is missing.")

  const name = patientData.name
  const dateOfBirth = parseDate(patientData.dateOfBirth)

  if (!isString(patientData.ssn))
    throw Error("ssn is missing.")

  const ssn = patientData.ssn

  const gender = parseEnum<Gender>(Gender, patientData.gender)

  if (!isString(patientData.occupation))
    throw Error("occupation is missing.")

  const occupation = patientData.occupation

  return {
    name, dateOfBirth, ssn, gender, occupation, entries: []
  }
}

