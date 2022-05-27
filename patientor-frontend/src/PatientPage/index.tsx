import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button } from '@material-ui/core';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient, addEntry } from '../state';
import { Patient, Gender, Entry } from '../types';
import EntryList from '../components/EntryList';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientPage = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error');
        setError(
          String(e?.response?.data?.error) || 'Unrecognized axios error'
        );
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Box>
      <Box style={{ marginTop: '1em' }}>
        <Typography variant="h5">
          {patient.name}{' '}
          {patient.gender === Gender.Male ? (
            <MaleIcon />
          ) : patient.gender === Gender.Female ? (
            <FemaleIcon />
          ) : null}
        </Typography>

        <Typography variant="body2">ssn: {patient.ssn}</Typography>
        <Typography variant="body2">
          occupation: {patient.occupation}
        </Typography>
        <EntryList entries={patient.entries} />
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </Box>
  );
};

export default PatientPage;
