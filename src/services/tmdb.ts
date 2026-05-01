const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

// 🔥 Trending Movies (مع pagination)
export async function getTrendingMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?page=${page}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
}

// 🔍 Search
export async function searchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`,
    {
      headers,
    }
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data = await response.json();
  return data.results;
}

// 🎬 Details
export async function getMovieDetails(id: string) {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}

// 🎥 Videos (Trailer)
export async function getMovieVideos(id: string) {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie videos");
  }

  const data = await response.json();
  return data.results;
}