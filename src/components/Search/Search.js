import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import useStyles from './styles';
import { searchMovie } from '../../features/currentGenreOrCategory';

const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
      navigate('/');
    }
  };
  return (
    <div className={classes.container}>
      <TextField
        onKeyPress={handleKeyPress}
        InputProps={{
          className: classes.input,
          startAdornment: (
            <InputAdornment position="start"><SearchIcon /></InputAdornment>
          ),

        }}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
      />
    </div>
  );
};

export default Search;
