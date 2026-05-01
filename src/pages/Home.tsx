import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies, searchMovies } from "../services/tmdb";
import type { Movie } from "../types/movie";
import { useDebounce } from "../hooks/useDebounce";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        if (debouncedQuery.trim() === "") {
          const data = await getTrendingMovies();
          setMovies(data);
        } else {
          const data = await searchMovies(debouncedQuery);
          setMovies(data);
        }
      } catch {
        setError("Something went wrong while loading movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [debouncedQuery]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-6 w-full rounded-xl bg-slate-900 p-3 text-white outline-none ring-1 ring-white/10 placeholder:text-slate-500 focus:ring-2 focus:ring-red-500"
        />

        <h2 className="mb-6 text-3xl font-bold">
          {query ? `Search results for "${query}"` : "Trending Movies 🔥"}
        </h2>

        {loading && <p className="text-slate-400">Loading movies...</p>}

        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && movies.length === 0 && (
          <p className="mt-10 text-center text-slate-400">No movies found 😢</p>
        )}

        {!loading && !error && movies.length > 0 && (
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

export default Home;