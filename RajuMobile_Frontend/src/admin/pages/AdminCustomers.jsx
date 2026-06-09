import { useEffect, useState } from "react";
import { getCustomers } from "../../admin/api/adminApi";

export default function AdminCustomers() {

  const [customers, setCustomers] =
    useState([]);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black mb-6">
        Customers
      </h1>

      <div className="space-y-4">
        {customers.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl p-5 shadow"
          >
            <h3 className="font-bold">
              {c.name}
            </h3>

            <p>{c.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}