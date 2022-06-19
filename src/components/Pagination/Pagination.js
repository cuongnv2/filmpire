import React from 'react';
import { Typography, Button } from '@mui/material';

import useStyles from './styles';

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const classes = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) { setPage((prevPage) => prevPage - 1); }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) { setPage((prevPage) => prevPage + 1); }
  };

  if (totalPages === 0) return null;

  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="button"
        onClick={handlePrev}
      >Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>{currentPage}/{totalPages}</Typography>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        type="button"
        onClick={handleNext}
      >Next
      </Button>
    </div>
  );
};

export default Pagination;
