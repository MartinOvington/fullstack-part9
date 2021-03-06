import React, { createContext, useContext, useReducer } from 'react';
import { Patient, Diagnosis, Entry } from '../types';

import { Action } from './reducer';

export type State = {
  diagnoses: { [code: string]: Diagnosis };
  patients: { [id: string]: Patient };
  patient: Patient | null;
};

const initialState: State = {
  diagnoses: {},
  patients: {},
  patient: null,
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]) => {
  const action: Action = {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisList,
  };
  return action;
};

export const setPatientList = (patientList: Patient[]) => {
  const action: Action = {
    type: 'SET_PATIENT_LIST',
    payload: patientList,
  };
  return action;
};

export const addPatient = (patient: Patient) => {
  const action: Action = {
    type: 'ADD_PATIENT',
    payload: patient,
  };
  return action;
};

export const setPatient = (patient: Patient) => {
  const action: Action = {
    type: 'SET_PATIENT',
    payload: patient,
  };
  return action;
};

export const addEntry = (entry: Entry) => {
  const action: Action = {
    type: 'ADD_ENTRY',
    payload: entry,
  };
  return action;
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
