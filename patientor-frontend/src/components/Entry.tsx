import {
  Entry,
  Diagnosis,
  HealthCheckRating,
  HealthCheckEntry,
  Discharge,
  HospitalEntry,
  OccupationalHealthcareEntry,
  SickLeave,
} from '../types';
import { Box, Typography } from '@material-ui/core';
import { useStateValue } from '../state';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DischargeDetails = ({
  discharge,
}: {
  discharge: Discharge | undefined;
}) => {
  if (discharge) {
    return (
      <Box>
        <Typography variant="body2">
          discharge date: {discharge.date} <br />
          discharge criteria: {discharge.criteria}
        </Typography>
      </Box>
    );
  }
  return null;
};

const SickLeaveDetails = ({
  sickleave,
}: {
  sickleave: SickLeave | undefined;
}) => {
  if (sickleave) {
    return (
      <Box>
        <Typography variant="body2">
          sick leave start: {sickleave.startDate} <br />
          sick leave end: {sickleave.endDate}
        </Typography>
      </Box>
    );
  }
  return null;
};

const DiagnosisCodes = ({
  diagnosisCodes,
}: {
  diagnosisCodes: Diagnosis['code'][] | undefined;
}) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Box>
      {diagnosisCodes ? (
        <Box>
          {diagnosisCodes.map((dc: Diagnosis['code']) => (
            <Box key={dc}>
              <Typography variant="body2">
                {dc} {diagnoses[dc] ? diagnoses[dc].name : ''}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}
    </Box>
  );
};

const HealthCheckIcon = ({
  healthRating,
}: {
  healthRating: HealthCheckRating;
}) => {
  switch (healthRating) {
    case 0:
      return <FavoriteIcon sx={{ color: 'rgba(50, 200, 50, 1)' }} />;
    case 1:
      return <FavoriteIcon sx={{ color: 'rgba(230, 255, 110, 1)' }} />;
    case 2:
      return <FavoriteIcon sx={{ color: 'rgba(255, 109, 0, 1)' }} />;
    case 3:
      return <FavoriteIcon sx={{ color: 'rgba(230, 0, 0, 1)' }} />;
    default:
      return <></>;
  }
};

const HospitalDetails = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Box border={2} borderRadius={10} m={1}>
      <Box m={2}>
        <Typography variant="body2">
          {entry.date} <LocalHospitalIcon />
        </Typography>
        <Typography variant="body2">
          <em>{entry.description}</em>
        </Typography>
        <Box m={1} />
        <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
        <Box />
        <Box m={1}>
          <Typography variant="body2">
            diagnosis by {entry.specialist}
          </Typography>
        </Box>
        <DischargeDetails discharge={entry.discharge} />
      </Box>
    </Box>
  );
};

const OccupationalHealthcareDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Box border={2} borderRadius={10} m={1}>
      <Box m={2}>
        <Typography variant="body2">
          {entry.date} <WorkIcon /> {entry.employerName}
        </Typography>
        <Typography variant="body2">
          <em>{entry.description}</em>
        </Typography>
        <Box m={1} />
        <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
        <Box />
        <Box m={1}>
          <Typography variant="body2">
            diagnosis by {entry.specialist}
          </Typography>
        </Box>
        <SickLeaveDetails sickleave={entry.sickLeave} />
      </Box>
    </Box>
  );
};
const HealthCheckDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  return (
    <Box border={2} borderRadius={10} m={1}>
      <Box m={2}>
        <Typography variant="body2">
          {entry.date} <PersonSearchIcon />
        </Typography>
        <Typography variant="body2">
          <em>{entry.description}</em>
        </Typography>
        <HealthCheckIcon healthRating={entry.healthCheckRating} />
        <Box m={1} />
        <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
        <Box />
        <Box m={1}>
          <Typography variant="body2">
            diagnosis by {entry.specialist}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareDetails entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
  }
};

export default EntryDetails;
