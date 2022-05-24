import { Entry, Diagnosis } from '../types';
import { Box, Typography } from '@material-ui/core';
import { useStateValue } from '../state';

const EntryList = ({ entries }: { entries: Entry[] }) => {
  const [{ diagnoses }] = useStateValue();

  const Entry = (entry: Entry) => (
    <Box>
      <Typography variant="body2">
        {entry.date} <em>{entry.description}</em>
      </Typography>
      {entry.diagnosisCodes ? (
        <ul>
          {entry.diagnosisCodes.map((dc: Diagnosis['code']) => (
            <li key={dc}>
              <Typography variant="body2">
                {dc} {diagnoses[dc] ? diagnoses[dc].name : ''}
              </Typography>
            </li>
          ))}
        </ul>
      ) : null}
    </Box>
  );
  return (
    <Box style={{ marginTop: '1em' }}>
      <Typography variant="h6">entries</Typography>
      {entries.map((entry: Entry) => (
        <Box key={entry.id}>{Entry(entry)}</Box>
      ))}
    </Box>
  );
};

export default EntryList;
