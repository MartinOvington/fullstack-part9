import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { PublicPatient, NewPatient, Patient, NewEntry, Entry } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const foundPatient = patients.find((p) => p.id === id);
  if (!foundPatient) {
    throw new Error('Could not find patient for entry');
  }
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  foundPatient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getPublicPatients,
  getPatientById,
  addPatient,
  addEntry,
};
