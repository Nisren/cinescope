import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies, searchMovies } from "../services/tmdb";
import type { Movie } from "../types/movie";
import { useDebounce } from "../hooks/useDebounce";
import MovieCardSkeleton from "../components/MovieCardSkeleton";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        setError(null);

        if (debouncedQuery.trim() === "") {
          const data = await getTrendingMovies(page);

          if (page === 1) {
            setMovies(data);
          } else {
            setMovies((prev) => [...prev, ...data]);
          }
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
  }, [debouncedQuery, page]);

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

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="text-red-300">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-full bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="mt-12 rounded-2xl border border-white/10 bg-slate-900 p-10 text-center">
            <p className="text-5xl">🎬</p>
            <h3 className="mt-4 text-2xl font-bold">No movies found</h3>
            <p className="mt-2 text-slate-400">
              Try searching for another movie title.
            </p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}

        {!loading && !error && movies.length > 0 && !debouncedQuery && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-full bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-500"
            >
              Load More
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;