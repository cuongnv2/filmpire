import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';

import useStyles from './styles';

const FeatureMovie = ({ movie }) => {
  const classes = useStyles();
  if (!movie) return null;
  console.log('', `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`);

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className={classes.featureCardContainer}>
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie.title}
          title={movie.title}
          className={classes.cardMedia}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        />
        <Box padding="20px">
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>{movie?.title}</Typography>
            <Typography variant="body2" gutterBottom>{movie?.overview}</Typography>
          </CardContent>
        </Box>
      </Card>

    </Box>
  );
};

export default FeatureMovie;
