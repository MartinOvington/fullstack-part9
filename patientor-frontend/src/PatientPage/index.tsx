import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient, Gender } from '../types';

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: 'SET_PATIENT', payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if ((id && !patient) || (id && patient && id !== patient.id)) {
      void fetchPatient(id);
    }
  }, [dispatch]);

  if (!patient || patient.id !== id) {
    return null;
  }

  return (
    <Box style={{ marginTop: '1em' }}>
      <Typography variant="h5">
        {patient.name}{' '}
        {patient.gender === Gender.Male ? (
          <MaleIcon />
        ) : patient.gender === Gender.Female ? (
          <FemaleIcon />
        ) : null}
      </Typography>

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </Box>
  );
};

export default PatientPage;