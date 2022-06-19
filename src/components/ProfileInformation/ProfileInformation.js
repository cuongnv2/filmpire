import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';

const ProfileInformation = () => {
  const { user } = useSelector(userSelector);
  const favoriteMovies = [];
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>MyProfile</Typography>
        <Button color="inherit" onClick={logout}>Login &nbsp; <ExitToApp /></Button>
      </Box>
      {!favoriteMovies.length ? <Typography variant="h5">Add favorites</Typography>
        : <Box>Favorite Movies</Box>}
    </Box>
  );
};

export default ProfileInformation;
