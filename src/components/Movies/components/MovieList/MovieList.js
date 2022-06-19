import React from 'react';
import { Grid } from '@mui/material';

import useStyles from './styles';
import Movie from '../Movie/Movie';

const MovieList = ({ movies }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.movieContainer}>
      {movies.results.map((movie, idx) => (<Movie key={idx} movie={movie} i={idx} />))}
    </Grid>
  );
};

export default MovieList;
