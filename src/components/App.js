import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { MovieInformation, ActorInformation, Movies, ProfileInformation, Navbar } from './index';

import useStyles from './styles';

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <div className={classes.content}>
        <div className={classes.navbar} />
        <Routes>
          <Route exact path="/movie/:id" element={<MovieInformation />} />
          <Route exact path="/actors/:id" element={<ActorInformation />} />
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/profile/:id" element={<ProfileInformation />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
