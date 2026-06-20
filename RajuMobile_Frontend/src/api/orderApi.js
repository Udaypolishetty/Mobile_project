import axios from "axios";

const BASE = `${import.meta.env.VITE_API_URL}/api/orders`;


console.log("API URL:", import.meta.env.VITE_API_URL);
console.log("ORDER URL:", `${BASE}/create/`);
export const createOrder = (data) =>
  axios.post(`${BASE}/create/`, data).then((r) => r.data);



export const getAllOrders = () =>
  axios.get(`${BASE}/all/`).then((r) => r.data);

export const updateOrderStatus = (id, status) =>
  axios.patch(`${BASE}/${id}/status/`, { status });



export const getMyOrders = async () => {
  const token = localStorage.getItem("access_token");

  const response = await fetch(
    `${BASE}/my-orders/`,
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
    `${BASE}/${id}/`,
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
