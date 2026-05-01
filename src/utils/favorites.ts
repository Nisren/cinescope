const KEY = "favorites";

export function getFavorites(): number[] {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
}

export function toggleFavorite(id: number) {
  const favorites = getFavorites();

  if (favorites.includes(id)) {
    const updated = favorites.filter((item) => item !== id);
    localStorage.setItem(KEY, JSON.stringify(updated));
    return false;
  } else {
    const updated = [...favorites, id];
    localStorage.setItem(KEY, JSON.stringify(updated));
    return true;
  }
}

export function isFavorite(id: number) {
  return getFavorites().includes(id);
}