import { Link } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";
import type { Movie } from "../types/movie";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  const [fav, setFav] = useState(isFavorite(movie.id));

  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <article className="group overflow-hidden rounded-2xl bg-slate-900 transition duration-300 hover:-translate-y-1 hover:bg-slate-800">
        
        {/* Image Container */}
        <div className="relative aspect-[2/3] overflow-hidden">

          {/* ❤️ Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              const result = toggleFavorite(movie.id);
              setFav(result);
            }}
            className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur transition hover:scale-110"
          >
            {fav ? "❤️" : "🤍"}
          </button>

          {/* Image */}
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://placehold.co/500x750?text=No+Image"
            }
            alt={movie.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="line-clamp-1 text-sm font-semibold text-white">
            {movie.title}
          </h3>

          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span>
              {movie.release_date?.slice(0, 4) || "N/A"}
            </span>

            <span className="text-yellow-400">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>

      </article>
    </Link>
  );
}

export default MovieCard;