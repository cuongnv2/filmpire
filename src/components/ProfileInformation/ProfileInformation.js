import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import RatedCard from '../RatedCard/RatedCard';

const ProfileInformation = () => {
  const { user } = useSelector(userSelector);
  const sessionId = localStorage.getItem('session_id');
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId, page: 1 });
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId, page: 1 });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>MyProfile</Typography>
        <Button color="inherit" onClick={logout}>Logout &nbsp; <ExitToApp /></Button>
      </Box>
      {!favoriteMovies?.results?.length ? <Typography variant="h5">Add favorites</Typography>
        : (
          <Box>
            <RatedCard title="Favorite Movies" data={favoriteMovies} />
            <RatedCard title="Watchlist Movies" data={watchlistMovies} />
          </Box>
        )}
    </Box>
  );
};

export default ProfileInformation;
