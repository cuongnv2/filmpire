import React, { useState } from 'react';
import { Modal, Typography, Box, Button, ButtonGroup, Grid, CircularProgress, useMediaQuery, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, Remove, ArrowBack } from '@mui/icons-material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  const dispatch = useDispatch();
  const isFavorited = true;
  const isWishlist = true;
  const [open, setOpen] = useState(false);

  const addToFav = () => {

  };
  const addToWishlist = () => {

  };

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

  return (
    <Grid container className={classes.container}>
      <Grid item sm={12} md={6} lg={4}>
        <img className={classes.poster} src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`} alter={data?.title} />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>{data?.title} ({data.release_date.split('-')[0]}) </Typography>
        <Typography variant="h5" align="center" gutterBottom>{data?.tagline}</Typography>
        <Grid item className={classes.container}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average / 10}</Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>{data?.runtime}min / {data?.spoken_languages.length > 0 ? data?.spoken_languages[0].name : '' }</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))} className={classes.link} key={genre.name}>
              <img src={genreIcons[genre?.name.toLowerCase()]} className={classes.genreImage} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '15px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.overview}</Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits?.cast?.map((character, idx) => (
            character.profile_path && (
            <Grid item key={idx} xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">{character?.character.split('/')[0]}</Typography>
            </Grid>
            )
          )).slice(0, 6) }
          <Grid item container style={{ marginTop: '2rem' }}>
            <div className={classes.buttonContainer}>
              <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button target="_blank" href={data?.homepage} endIcon={<Language />}>Website</Button>
                  <Button target="_blank" href={`https://imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                  <Button onClick={() => { setOpen(true); }} href="#" endIcon={<Theaters />}>Trailers</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.buttonContainer}>
                <ButtonGroup size="small" variant="outlined">
                  <Button onClick={addToFav} endIcon={isFavorited ? <FavoriteBorderOutlinedIcon /> : <Favorite />}>
                    {isFavorited ? 'Unfavorite' : 'Favorite'}
                  </Button>
                  <Button onClick={addToWishlist} endIcon={isWishlist ? <Remove /> : <PlusOne />}>
                    WatchList
                  </Button>
                  <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                    <Typography component={Link} to="/" variant="subtitle2" style={{ textDecoration: 'none' }}>Back</Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>

        </Grid>
      </Grid>
      <Modal closeAfterTransition className={classes.modal} open={open} onClose={() => setOpen(false)}>
        {data?.videos?.results?.length > 0 && (
        <iframe
          autoPlay
          allow="autoplay"
          className={classes.video}
          frameBorder="0"
          title="Trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
        />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
