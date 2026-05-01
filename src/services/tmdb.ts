const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
console.log("TOKEN:", TOKEN);

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Content-Type": "application/json",
};

export async function getTrendingMovies() {
  const response = await fetch(`${BASE_URL}/trending/movie/week`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = await response.json();
  return data.results;
}

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

export async function getMovieDetails(id: string) {
  const response = await fetch(`${BASE_URL}/movie/${id}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return response.json();
}
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