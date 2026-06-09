import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/orders";

export const createOrder = (data) =>
  axios.post(`${BASE}/create/`, data).then((r) => r.data);

export const getMyOrders = () =>
  axios.get(`${BASE}/my-orders/`).then((r) => r.data);

export const getAllOrders = () =>
  axios.get(`${BASE}/all/`).then((r) => r.data);

export const updateOrderStatus = (id, status) =>
  axios.patch(`${BASE}/${id}/status/`, { status });