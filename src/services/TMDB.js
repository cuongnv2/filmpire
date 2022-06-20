import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: ({ genreOrCategoryName, page, searchQuery }) => {
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        if (genreOrCategoryName && typeof genreOrCategoryName === 'string') {
          return `movie/${genreOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        if (genreOrCategoryName && typeof genreOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    getMovie: builder.query({
      query: (id) => `/movie/${id}?api_key=${tmdbApiKey}&append_to_response=videos,credits`,
    }),
    getRecommendationMovies: builder.query({
      query: ({ movieId, list }) => `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),
    getActor: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}&append_to_response=videos`,
    }),
    getMovieByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetRecommendationMoviesQuery,
  useGetActorQuery,
  useGetMovieByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
