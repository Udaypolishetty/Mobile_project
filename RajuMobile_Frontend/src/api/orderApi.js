import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/orders";

export const createOrder = (data) =>
  axios.post(`${BASE}/create/`, data).then((r) => r.data);



export const getAllOrders = () =>
  axios.get(`${BASE}/all/`).then((r) => r.data);

export const updateOrderStatus = (id, status) =>
  axios.patch(`${BASE}/${id}/status/`, { status });



export const getMyOrders = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    "http://127.0.0.1:8000/api/orders/my-orders/",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load orders");
  }

  return await response.json();
};


export const getOrder = async (id) => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    `http://127.0.0.1:8000/api/orders/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Order not found");
  }

  return await response.json();
};