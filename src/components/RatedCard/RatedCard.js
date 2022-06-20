import React from 'react';
import { Typography, Box } from '@mui/material';

import useStyles from './styles';
import Movie from '../Movies/components/Movie/Movie';

const RatedCard = ({ title, data }) => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box display="flex" flexWrap="wrap" className={classes.container}>
        {data?.results.map((movie, idx) => <Movie key={movie.id} movie={movie} i={idx} />)}
      </Box>
    </Box>
  );
};

export default RatedCard;
