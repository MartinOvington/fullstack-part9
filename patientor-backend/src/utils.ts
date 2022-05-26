import {
  NewPatient,
  Gender,
  NewEntry,
  Diagnosis,
  HealthCheckRating,
  NewBaseEntry,
  SickLeave,
  Discharge,
} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isDate = (date: string): boolean => {
  const date_regex = /\d{4}-\d{2}-\d{2}/;
  return date_regex.test(date);
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: [],
  };

  return newPatient;
};

const parseType = (type: unknown): string => {
  if (
    !type ||
    !isString(type) ||
    (type !== 'HealthCheck' &&
      type !== 'OccupationalHealthcare' &&
      type !== 'Hospital')
  ) {
    throw new Error('Invalid entry type');
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const isStringArray = (arr: unknown): arr is Array<string> => {
  if (!(arr instanceof Array)) {
    return false;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!isString(arr[i])) {
      return false;
    }
  }
  return true;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown
): Array<Diagnosis['code']> => {
  if (!diagnosisCodes || !isStringArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnosis codes');
  }
  return diagnosisCodes;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect or missing employerName');
  }

  return employerName;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      'Incorrect or missing healthCheckRating: ' + healthCheckRating
    );
  }

  return healthCheckRating;
};

const isSickLeave = (sickLeave: unknown): sickLeave is SickLeave => {
  if (
    !sickLeave ||
    !(typeof sickLeave === 'object') ||
    !('startDate' in sickLeave) ||
    !('endDate' in sickLeave)
  ) {
    return false;
  }
  return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    !isSickLeave(sickLeave) ||
    !isDate(sickLeave.startDate) ||
    !isDate(sickLeave.endDate)
  ) {
    throw new Error('Incorrect sickLeave');
  }
  return sickLeave;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  if (
    !discharge ||
    !(typeof discharge === 'object') ||
    !('date' in discharge) ||
    !('criteria' in discharge)
  ) {
    return false;
  }
  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    !isDischarge(discharge) ||
    !isDate(discharge.date) ||
    !isString(discharge.criteria)
  ) {
    throw new Error('Incorrect discharge');
  }
  return discharge;
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  type: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
};

export const toNewEntry = ({
  description,
  date,
  specialist,
  type,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: EntryFields): NewEntry => {
  const parsedType = parseType(type);
  const newBaseEntry: NewBaseEntry = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: diagnosisCodes
      ? parseDiagnosisCodes(diagnosisCodes)
      : undefined,
  };
  switch (parsedType) {
    case 'HealthCheck':
      return {
        ...newBaseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
    case 'OccupationalHealthcare':
      return {
        ...newBaseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(employerName),
        sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined,
      };
    case 'Hospital':
      return {
        ...newBaseEntry,
        type: 'Hospital',
        discharge: parseDischarge(discharge),
      };
  }
  throw new Error('Incorrect type');
};
