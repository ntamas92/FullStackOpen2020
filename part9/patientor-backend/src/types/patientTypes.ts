import { parseString, parseDate, parseEnum } from "../utils/typeValidator";
import { Entry } from "./entryTypes";

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

export type PublicPatientData = Omit<PatientData, "ssn" | "entries">;

export type NewPatientData = Omit<PatientData, "id">;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const parsePatientData = (patientData: any): NewPatientData => {

  const name = parseString(patientData.name);
  const dateOfBirth = parseDate(patientData.dateOfBirth);
  const ssn = parseString(patientData.ssn);

  const gender = parseEnum<Gender>(Gender, patientData.gender);

  const occupation = parseString(patientData.occupation);

  return {
    name, dateOfBirth, ssn, gender, occupation, entries: []
  };
};

