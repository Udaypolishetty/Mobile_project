import { useEffect, useState } from "react";
import { getDashboardStats } from "../adminApi";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats().then(setStats);
  }, []);

  if (!stats) return <div>Loading...</div>;

  const cards = [
    {
      title: "Products",
      value: stats.products,
    },
    {
      title: "Customers",
      value: stats.customers,
    },
    {
      title: "Orders",
      value: stats.orders,
    },
    {
      title: "Pending Orders",
      value: stats.pending_orders,
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-black text-gray-800 mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-5">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <p className="text-gray-500 text-sm">
              {card.title}
            </p>

            <h2 className="text-3xl font-black text-[#0a0f1e] mt-2">
              {card.value}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
}