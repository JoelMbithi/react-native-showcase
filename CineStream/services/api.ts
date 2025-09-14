
export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
  const endPoint =
    query && query.trim().length > 0
      ? `/search/movie?query=${encodeURIComponent(query)}`
      : "/discover/movie?sort_by=popularity.desc";

  const response = await fetch(`${TMDB_CONFIG.BASE_URL}${endPoint}`, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  return data.results; // always return an array
};



export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?language=en-US`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers, 
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`);
    }

    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};


/* const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTYxNTZhODg0Y2YzMWNiYjdlMGNiY2FjYzhiYTk1ZCIsIm5iZiI6MTc1NzY3ODkzNC42MjEsInN1YiI6IjY4YzQwZDU2YzNmOGYzOGQ5ODNiZTFiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MMUGd-w9nLz5QgHSckSQ078pafoMGskmTjb1S52K1t4'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error(err)); */