import axios from 'axios';

export const movieApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: process.env.REACT_APP_TMDB_KEY,
  },
});

export const fetchToken = async () => {
  try {
    const { data } = await movieApi.get('/authentication/token/new');
    const token = data.request_token;
    if (data.success) {
      localStorage.setItem('request_token', token);
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    console.log('error fetchToken', error);
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem('request_token');
  if (token) {
    try {
      const { data: { session_id } } = await movieApi.post('authentication/session/new', {
        request_token: token,
      });
      localStorage.setItem('session_id', session_id);
      return session_id;
    } catch (error) {
      console.log('error createSessionId', error);
    }
  }
};

const buildPostUrl = (userId, urlType) => {
  const sessionId = localStorage.getItem('session_id');
  return `https://api.themoviedb.org/3/account/${userId}/${urlType}?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${sessionId}`;
};

export const toggleFavorite = async (userId, videoId, isFavorited) => {
  const url = buildPostUrl(userId, 'favorite');
  await axios.post(
    url,
    { media_type: 'movie', media_id: videoId, favorite: !isFavorited },
  );
};

export const toggleWatchlist = async (userId, videoId, isWatchlist) => {
  const url = buildPostUrl(userId, 'watchlist');
  await axios.post(
    url,
    { media_type: 'movie', media_id: videoId, watchlist: !isWatchlist },
  );
};

