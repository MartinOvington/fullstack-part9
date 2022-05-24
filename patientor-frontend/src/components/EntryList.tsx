import { Entry } from '../types';
import { Box, Typography } from '@material-ui/core';
import EntryDetails from './Entry';

const EntryList = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box style={{ marginTop: '1em' }}>
      <Typography variant="h6">entries</Typography>
      {entries.map((entry: Entry) => (
        <Box key={entry.id}>
          <EntryDetails entry={entry} />
        </Box>
      ))}
    </Box>
  );
};

export default EntryList;
