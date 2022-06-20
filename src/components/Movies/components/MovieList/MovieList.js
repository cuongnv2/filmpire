import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies, numberOfMovie, excludeFirst }) => {
  const classes = useStyles();
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <Grid container className={classes.movieContainer}>
      {movies?.results.slice(startFrom, numberOfMovie).map((movie, idx) => (<Movie key={idx} movie={movie} i={idx} />))}
    </Grid>
  );
};

export default MovieList;
