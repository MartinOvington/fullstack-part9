import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';

const patients: Array<Patient> = patientData;

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
  getNonSensitivePatients,
  addPatient,
};
