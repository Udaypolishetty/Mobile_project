
import axios from "axios";

const API = axios.create({
  baseURL: "VITE_API_URL/api/products/",
});

export const getProducts = () => API.get("/");