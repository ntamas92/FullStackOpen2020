export interface PatientData {
  id: string,
  name: string,
  dateOfBirth: Date,
  ssn: string,
  gender: string,
  occupation: string
}

export type PublicPatientData = Omit<PatientData, "ssn">