import diagnoseData from '../data/diagnoses.json'
import Diagnose from "../types/diagnoseTypes"

const getEntries = () : Array<Diagnose> => {
  return diagnoseData;
};

const addEntry = (_entry: Diagnose) => {
  return null;
};

export default {
  getEntries,
  addEntry
};