import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { getMovieDetails } from "../services/tmdb";
import { getFavorites } from "../utils/favorites";

function Favorites() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const ids = getFavorites();

      const results = await Promise.all(
        ids.map((id) => getMovieDetails(String(id)))
      );

      setMovies(results);
    };

    fetchFavorites();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-28">
        <h1 className="mb-6 text-3xl font-bold">Your Favorites ❤️</h1>

        {movies.length === 0 ? (
  <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900 p-10 text-center">
    <p className="text-5xl">❤️</p>
    <h3 className="mt-4 text-2xl font-bold">No favorites yet</h3>
    <p className="mt-2 text-slate-400">
      Start adding movies to your favorites.
    </p>
  </div>
) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Favorites;