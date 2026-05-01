import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          Cine<span className="text-red-500">Scope</span>
        </Link>

        <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
          <Link to="/" className="transition hover:text-white">
            Movies
          </Link>

          <Link to="/" className="transition hover:text-white">
            Trending
          </Link>

          <Link to="/favorites" className="transition hover:text-white">
            Favorites
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;