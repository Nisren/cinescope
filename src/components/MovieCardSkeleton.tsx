function MovieCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900">
      <div className="aspect-[2/3] animate-pulse bg-slate-800" />

      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-800" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-800" />
      </div>
    </div>
  );
}

export default MovieCardSkeleton;