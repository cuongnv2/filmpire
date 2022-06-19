import React, { useState } from 'react';
import { Grid, Typography, Box, CircularProgress, Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { useGetActorQuery, useGetMovieByActorIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import MovieList from '../Movies/components/MovieList/MovieList';
import Pagination from '../Pagination/Pagination';

const ActorInformation = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isFetching, error } = useGetActorQuery(id);
  const { data: movies, isFetching: fetchingMovie } = useGetMovieByActorIdQuery({ id, page });

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something went wrong</Link>
      </Box>
    );
  }

  console.log('data', data);

  return (
    <Grid container className={classes.container}>
      <Grid item sm={12} md={6} lg={4}>
        <img
          className={classes.picture}
          src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
          alt="actor"
        />
      </Grid>
      <Grid item container direction="column" lg={7} style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h3" color="inherit">{data.name}</Typography>
        <Typography variant="h5" color="inherit" className={classes.birthday}>
          Born: {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant="h7">{data?.biography} className={classes.biography}</Typography>
        <Box className={classes.buttons}>
          <Button variant="contained" color="primary">IMDB</Button>
          <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)}>Back</Button>
        </Box>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">Movies </Typography>
        <MovieList movies={movies} />
        <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
      </Box>
    </Grid>
  );
};

export default ActorInformation;
