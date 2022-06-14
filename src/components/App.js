import React from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

import { MovieInformation, ActorInformation, Movies, ProfileInformation } from './index';

const App = () => (
  <div>
    <CssBaseline />
    <div>
      <Routes>
        <Route exact path="/movie/:id" element={<MovieInformation />} />
        <Route exact path="/actors/:id" element={<ActorInformation />} />
        <Route exact path="/" element={<Movies />} />
        <Route exact path="/profile/:id" element={<ProfileInformation />} />
      </Routes>
    </div>
  </div>
);

export default App;
