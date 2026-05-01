import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../services/tmdb";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMovie() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const data = await getMovieDetails(id);
        setMovie(data);
        const videos = await getMovieVideos(id);

const trailer = videos.find(
  (video: any) => video.type === "Trailer" && video.site === "YouTube"
);

setTrailerKey(trailer?.key || null);
      } catch {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-6xl px-6 pt-28">
          <p className="text-slate-400">Loading movie...</p>
        </section>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-6xl px-6 pt-28">
          <p className="text-red-400">{error || "Movie not found."}</p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-red-600 px-6 py-3 font-semibold hover:bg-red-500"
          >
            Back Home
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 pt-28 pb-16">
        <Link
          to="/"
          className="mb-8 inline-block text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to movies
        </Link>

        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/500x750?text=No+Image"
            }
            alt={movie.title}
            className="w-full rounded-2xl object-cover shadow-2xl"
          />

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-400">
              Movie Details
            </p>

            <h1 className="text-4xl font-bold md:text-6xl">{movie.title}</h1>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-slate-900 px-4 py-2">
                ⭐ {movie.vote_average?.toFixed(1)}
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                {movie.release_date || "N/A"}
              </span>

              <span className="rounded-full bg-slate-900 px-4 py-2">
                {movie.runtime ? `${movie.runtime} min` : "Runtime N/A"}
              </span>
            </div>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {movie.overview || "No overview available."}
            </p>
            {trailerKey && (
  <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
    <iframe
      src={`https://www.youtube.com/embed/${trailerKey}`}
      title={`${movie.title} Trailer`}
      className="h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </div>
)}

            {movie.genres?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {movie.genres.map((genre: { id: number; name: string }) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;