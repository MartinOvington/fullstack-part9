import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | { type: 'SET_DIAGNOSIS_LIST'; payload: Diagnosis[] }
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | { type: 'SET_PATIENT'; payload: Patient }
  | { type: 'ADD_ENTRY'; payload: Entry };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      };
    case 'ADD_ENTRY':
      if (!state.patient) {
        return state;
      }
      const modifiedPatient = {
        ...state.patient,
        entries: state.patient.entries.concat(action.payload),
      };
      return {
        ...state,
        patient: modifiedPatient,
        patients: {
          ...state.patients,
          [state.patient.id]: modifiedPatient,
        },
      };
    default:
      return state;
  }
};
