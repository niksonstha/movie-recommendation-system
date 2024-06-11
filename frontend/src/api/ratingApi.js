import { instance } from "../axios/axios";

export const addRating = async (movieId, userId, rating) => {
  console.log(movieId, userId, rating);
  try {
    const response = await instance.post("/rating/addRating", {
      movieId,
      userId,
      rating,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserRating = async (movieId, userId) => {
  try {
    const response = await instance.get(
      `/rating/getUserRating/${movieId}/${userId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
