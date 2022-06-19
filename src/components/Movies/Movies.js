import React, { useState, userEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from './components/MovieList/MovieList';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreOrCategoryName, page, searchQuery });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }
  if (!data || !data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">No movie that match that name</Typography>
        <br />
        Please search another name
      </Box>
    );
  }
  if (error) return 'An error occured';
  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};

export default Movies;
