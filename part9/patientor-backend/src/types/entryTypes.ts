
import Diagnosis from "./diagnoseTypes";
import { parseString, parseEnum, parseArray } from "../utils/typeValidator";

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  specialist: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  }
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  }
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const parseEntry = (entryData: any): Entry => {
  const baseEntry: BaseEntry = {
    id: "0",
    description: parseString(entryData.description),
    date: parseString(entryData.date),
    specialist: parseString(entryData.specialist),
    //TODO: implement parsing for array
    diagnosisCodes: parseArray<string>(entryData.diagnosisCodes, parseString),
  };

  const type = parseString(entryData.type);

  switch (type) {
    case "HealthCheck":
      return { ...baseEntry, type, healthCheckRating: parseEnum(HealthCheckRating, entryData.healthCheckRating) };
    case "OccupationalHealthcare":
      return {
        ...baseEntry, type,
        employerName: parseString(entryData.employerName),
        specialist: parseString(entryData.specialist)
        //TODO: sickleave
      };
    case "Hospital":
      if (!entryData.discharge)
        throw new Error("Field discharge is missing.");

      return {
        ...baseEntry, type,
        discharge: {
          date: parseString(entryData.discharge.date),
          criteria: parseString(entryData.discharge.criteria)
        }
      };
  }

  throw new Error("Unknown entry");
};