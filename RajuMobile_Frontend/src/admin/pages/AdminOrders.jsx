import { useEffect, useState } from "react";
import { getOrders } from "../adminApi";
import { updateOrderStatus } from "../../api/orderApi";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);
const handleStatusChange = async (
  id,
  status
) => {

  await updateOrderStatus(
    id,
    status
  );

  setOrders((prev) =>
    prev.map((o) =>
      o.id === id
        ? { ...o, status }
        : o
    )
  );
};
  return (
    <div>
      <h1 className="text-3xl font-black mb-6">
        Orders
      </h1>

      <div className="space-y-4">
        {orders.map((order) => (
<div
  key={order.id}
  className="bg-white rounded-xl p-5 shadow flex justify-between items-center"
>
  <div>
    <h3 className="font-bold">
      Order #{order.id}
    </h3>

    <p>{order.customer_name}</p>
    <p>{order.phone}</p>

    <p className="font-semibold text-red-600">
      ₹{order.total_amount}
    </p>
  </div>

  <div className="flex gap-3">
    <select
      value={order.status}
      onChange={(e) =>
        handleStatusChange(
          order.id,
          e.target.value
        )
      }
      className="border rounded-lg px-3 py-2"
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="packed">Packed</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>

    <a
      href={`https://wa.me/91${order.phone}`}
      target="_blank"
      rel="noreferrer"
      className="bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      WhatsApp
    </a>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}