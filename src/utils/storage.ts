import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getMoviesSave(key) {
  const myMovies = await AsyncStorage.getItem(key);

  let moviesSave = JSON.parse(String(myMovies)) || [];

  return moviesSave;
}

export async function saveMovie(key, movie) {
  let moviesStored = await getMoviesSave(key);

  const hasMovie = moviesStored.some((item) => item.id === movie.id);

  if (hasMovie) {
    return;
  }

  moviesStored.push(movie);

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored));
}

export async function deleteMovie(id) {
  let moviesStored = await getMoviesSave("@primereact");

  let myMovies = moviesStored.filter((item) => {
    return item.id !== id;
  });

  await AsyncStorage.setItem("@primereact", JSON.stringify(myMovies));
  return myMovies;
}

export async function hasMovie(movie) {
  let moviesStored = await getMoviesSave("@primereact");

  let hasMovie = moviesStored.find((item) => item.id === movie.id);

  if (hasMovie) return true;

  return false;
}
