import React, { useState, userEffect } from 'react';
import { Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from './components/MovieList/MovieList';
import { Pagination } from '../index';
import FeatureMovie from '../FeatureMovie/FeatureMovie';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreOrCategoryName, page, searchQuery });

  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovie = lg ? 17 : 19;

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
      <FeatureMovie movie={data.results[0]} />
      <MovieList movies={data} numberOfMovie={numberOfMovie} excludeFirst />
      <Pagination currentPage={page} setPage={setPage} totalPages={data.total_pages} />
    </div>
  );
};

export default Movies;
