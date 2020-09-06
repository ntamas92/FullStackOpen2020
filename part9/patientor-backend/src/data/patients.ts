import { PatientData, Gender } from "../types/patientTypes"

const patientData: Array<PatientData> = [
    {
        id: "d2773336-f723-11e9-8f0b-362b9e155667",
        name: "John McClane",
        dateOfBirth: new Date("1986-07-09"),
        ssn: "090786-122X",
        gender: Gender.Male,
        occupation: "New york city cop"
    },
    {
        id: "d2773598-f723-11e9-8f0b-362b9e155667",
        name: "Martin Riggs",
        dateOfBirth: new Date("1979-01-30"),
        ssn: "300179-77A",
        gender: Gender.Male,
        occupation: "Cop"
    },
    {
        id: "d27736ec-f723-11e9-8f0b-362b9e155667",
        name: "Hans Gruber",
        dateOfBirth: new Date("1970-04-25"),
        ssn: "250470-555L",
        gender: Gender.Male,
        occupation: "Technician"
    },
    {
        id: "d2773822-f723-11e9-8f0b-362b9e155667",
        name: "Dana Scully",
        dateOfBirth: new Date("1974-01-05"),
        ssn: "050174-432N",
        gender: Gender.Female,
        occupation: "Forensic Pathologist"
    },
    {
        id: "d2773c6e-f723-11e9-8f0b-362b9e155667",
        name: "Matti Luukkainen",
        dateOfBirth: new Date("1971-04-09"),
        ssn: "090471-8890",
        gender: Gender.Male,
        occupation: "Digital evangelist"
    }
]

export default patientData