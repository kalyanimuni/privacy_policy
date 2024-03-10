import React, { useState } from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';
import Report2 from '../../components/Reports2';
import SearchBar from '../../components/SearchBar';
import { tokens } from '../../theme';

const AdminGrievances = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Simulate data loading
  setTimeout(() => {
    setLoading(false);
    // setError(new Error('Failed to load data')); // Uncomment to simulate an error
  }, 2000);

  return (
    <div>
      <Box my={2}>
        <SearchBar />
        <Box display="flex" justifyContent="center" alignItems="center">
          {loading ? (
            <CircularProgress sx={{color: colors.blueAccent[800]}} />
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <Report2 />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AdminGrievances;
