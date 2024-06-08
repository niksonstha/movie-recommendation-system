import { instance } from "../axios/axios";

export const fetchHybridRecommendation = async (id) => {
  try {
    const response = await instance.get(
      `/recommendation/recommendations/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};
