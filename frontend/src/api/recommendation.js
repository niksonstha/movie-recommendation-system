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

export const fetchTimeAwareRecommendation = async (id) => {
  try {
    const response = await instance.get(
      `/recommendation/getTimeAwareRecommendations/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchMatrixFactorRecommendation = async (id) => {
  try {
    const response = await instance.get(
      `/recommendation/getMatrixRecommendations/${id}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchKnnrecommendRecommendation = async (id) => {
  try {
    const response = await instance.get(`/recommendation/knnrecommend/${id}`);
    return response;
  } catch (error) {
    return error;
  }
};
