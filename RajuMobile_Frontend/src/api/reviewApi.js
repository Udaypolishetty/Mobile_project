import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/api/reviews`;

export const createReview = (data, token) =>
  axios.post(BASE + "/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getReviews = () =>
  axios.get(BASE + "/").then((res) => res.data);
