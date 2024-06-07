import { instance } from "../axios/axios";

export const addWatchlist = async (id, userId, title, genres) => {
  try {
    const response = await instance.post("/watchlist", {
      id,
      userId,
      title,
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
