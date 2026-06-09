import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/admin";

export const getDashboardStats = () =>
  axios.get(`${BASE}/dashboard/`).then((r) => r.data);

export const getProducts = () =>
  axios.get(`${BASE}/products/`).then((r) => r.data);

export const getOrders = () =>
  axios.get(`${BASE}/orders/`).then((r) => r.data);

export const getCustomers = () =>
  axios.get(`${BASE}/customers/`).then((r) => r.data);

export const createProduct = (data) =>
  axios.post(
    "http://127.0.0.1:8000/api/admin/products/create/",
    data
  );

export const addProduct = (data) =>
  axios.post(
    "http://127.0.0.1:8000/api/products/add/",
    data
  );

export const updateProduct = (id, data) =>
  axios.put(
    `http://127.0.0.1:8000/api/products/update/${id}/`,
    data
  );

export const deleteProduct = (id) =>
  axios.delete(
    `http://127.0.0.1:8000/api/products/delete/${id}/`
  );


  export const updateStock = async (id, stock) => {

  const products = await getProducts();

  const product = products.find(
    (p) => p.id === id
  );

  return axios.put(
    `http://127.0.0.1:8000/api/products/update/${id}/`,
    {
      ...product,
      stock,
    }
  );
};
