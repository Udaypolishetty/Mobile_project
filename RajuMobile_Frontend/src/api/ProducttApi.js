import axios from "axios";

const PRODUCT_URL = "http://127.0.0.1:8000/api/products/";

export const getProducts = async () => {
  const response = await axios.get(PRODUCT_URL);
  return response.data;
};