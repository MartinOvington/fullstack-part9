import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';

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

  return newPatient;
};

export default {
  getPatients,
  getPublicPatients,
  getPatientById,
  addPatient,
};
