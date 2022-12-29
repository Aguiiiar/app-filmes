import axios from "axios";

export const key = "dc3630a39018e1c69a86f1693ce91468";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
