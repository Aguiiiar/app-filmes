export function getListMovies(size: number, movies: any[]) {
  let listMovies = [];

  for (let i = 0, l = size; i < l; i++) {
    listMovies.push(movies[i]);
  }

  return listMovies;
}

export function randomBanner(movies: any[]) {
  return Math.floor(Math.random() * movies.length);
}
