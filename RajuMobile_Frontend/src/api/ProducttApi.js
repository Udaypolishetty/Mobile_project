import axios from "axios";

const PRODUCT_URL = '${import.meta.env.VITE_API_URL}/api/products/';

export const getProducts = async () => {
  const response = await axios.get(PRODUCT_URL);
  return response.data;
};
