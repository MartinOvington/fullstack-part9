import { Entry, Diagnosis } from '../types';
import { Box, Typography } from '@material-ui/core';
import { useStateValue } from '../state';

const EntryList = ({ entries }: { entries: Entry[] }) => {
  const [{ diagnoses }] = useStateValue();

  const findDiagnosis = (code: string): string => {
    const found = Object.values(diagnoses).find((d) => d.code === code);
    return found ? found.name : '';
  };
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
                {dc} {findDiagnosis(dc)}
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
