import { instance } from "../axios/axios";

export const addWatchlist = async (
  id,
  userId,
  title,
  release_date,
  runtime,
  poster_path,
  genres
) => {
  try {
    const response = await instance.post("/watchlist", {
      id,
      userId,
      title,
      runtime,
      release_date,
      poster_path,
      genres,
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const fetchWatchlist = async (userId) => {
  try {
    const response = await instance.get(`/watchlist/getWatchlist/${userId}`);
    return response;
  } catch (error) {
    return error;
  }
};
export const deleteWatchlist = async (id) => {
  console.log(id);
  try {
    const response = await instance.delete(`/watchlist/deleteWatchlist/${id}`);

    return response;
  } catch (error) {
    return error;
  }
};
