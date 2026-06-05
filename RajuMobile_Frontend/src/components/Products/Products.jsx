import { useNavigate } from "react-router-dom";
import OurService from "../HomeFiles/OurService.jsx";

function Products() {
  const navigate = useNavigate();

  const categories = [
    "Mobiles111",
    "Cases & Covers",
    "Chargers",
    "Earphones",
    "Smart Watches",
    "Power Banks",
    "Accessories",
  ];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8">Shop By Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() =>
              navigate(`/catalog?category=${encodeURIComponent(cat)}`)
            }
            className="bg-white shadow-md rounded-lg p-8 text-center cursor-pointer hover:shadow-xl transition"
          >
            {cat}
          </div>
        ))}

      </div>
      <div className="bg-red-500 text-white p-4">
        Test Component
      </div>
    </div>

  );
}

export default Products;