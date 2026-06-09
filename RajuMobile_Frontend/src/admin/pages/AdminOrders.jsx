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

      <div className="space-y-6">
  {orders.map((order) => (
    <div
      key={order.id}
      className="bg-white rounded-xl shadow p-6"
    >
      <div className="flex justify-between items-start flex-wrap gap-4">
        <div>
          <h3 className="text-xl font-bold">
            Order #{order.id}
          </h3>

          <p className="mt-2">
            <strong>Name:</strong>{" "}
            {order.customer_name}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {order.phone}
          </p>

          <p>
            <strong>Total:</strong> ₹
            {order.total_amount}
          </p>

          <p>
            <strong>Placed:</strong>{" "}
            {new Date(
              order.created_at
            ).toLocaleString()}
          </p>
        </div>

        <div className="flex flex-col gap-3">
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
            <option value="pending">
              Pending
            </option>

            <option value="confirmed">
              Confirmed
            </option>

            <option value="packed">
              Packed
            </option>

            <option value="shipped">
              Shipped
            </option>

            <option value="out_for_delivery">
              Out For Delivery
            </option>

            <option value="delivered">
              Delivered
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>

          <a
            href={`https://wa.me/91${order.phone}`}
            target="_blank"
            rel="noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-lg text-center"
          >
            WhatsApp Customer
          </a>
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h4 className="font-bold mb-2">
          Delivery Address
        </h4>

        <p>{order.address}</p>

        <p>
          {order.city},{" "}
          {order.state} -{" "}
          {order.pincode}
        </p>
      </div>

      <hr className="my-4" />

      <div>
        <h4 className="font-bold mb-3">
          Products
        </h4>

        <div className="space-y-3">
          {order.items?.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3"
            >
              <p className="font-semibold">
                {item.product_name}
              </p>

              <p>
                Qty: {item.quantity}
              </p>

              <p>
                Price: ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-4" />

      <div>
        <h4 className="font-bold mb-2">
          Tracking Status
        </h4>

        <div className="flex gap-3 flex-wrap">
          <span
            className={`px-3 py-1 rounded ${
              order.status ===
                "pending" ||
              order.status ===
                "confirmed" ||
              order.status ===
                "packed" ||
              order.status ===
                "shipped" ||
              order.status ===
                "out_for_delivery" ||
              order.status ===
                "delivered"
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            Pending
          </span>

          <span
            className={`px-3 py-1 rounded ${
              [
                "confirmed",
                "packed",
                "shipped",
                "out_for_delivery",
                "delivered",
              ].includes(
                order.status
              )
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            Confirmed
          </span>

          <span
            className={`px-3 py-1 rounded ${
              [
                "packed",
                "shipped",
                "out_for_delivery",
                "delivered",
              ].includes(
                order.status
              )
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            Packed
          </span>

          <span
            className={`px-3 py-1 rounded ${
              [
                "shipped",
                "out_for_delivery",
                "delivered",
              ].includes(
                order.status
              )
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            Shipped
          </span>

          <span
            className={`px-3 py-1 rounded ${
              [
                "out_for_delivery",
                "delivered",
              ].includes(
                order.status
              )
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            Out For Delivery
          </span>

          <span
            className={`px-3 py-1 rounded ${
              order.status ===
              "delivered"
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            Delivered
          </span>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
}