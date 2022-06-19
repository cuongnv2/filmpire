/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.genreOrCategoryName = action.payload;
    },
    searchMovie: (state, action) => {
      console.log('searchQuery', action.payload);
      state.searchQuery = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;
export default genreOrCategory.reducer;

