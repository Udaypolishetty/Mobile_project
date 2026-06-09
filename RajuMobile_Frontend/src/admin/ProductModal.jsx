import { useEffect, useState } from "react";
import { addProduct, updateProduct } from "./api/adminApi";

export default function ProductModal({
  show,
  onClose,
  product = null,
  onSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    original_price: "",
    badge: "",
    description: "",
    stock: "",
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "",
        price: product.price || "",
        original_price: product.original_price || "",
        badge: product.badge || "",
        description: product.description || "",
        stock: product.stock || "",
      });
    } else {
      setForm({
        name: "",
        brand: "",
        category: "",
        price: "",
        original_price: "",
        badge: "",
        description: "",
        stock: "",
      });
    }

    setImages([]);
  }, [product]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await addProduct(formData);
      }

      if (onSuccess) onSuccess();

      onClose();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl w-full max-w-2xl p-7 overflow-y-auto max-h-[90vh]">

        <h2 className="text-2xl font-bold mb-6">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="original_price"
            placeholder="Original Price"
            value={form.original_price}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border rounded-xl p-3"
          />

          <input
            name="badge"
            placeholder="Badge"
            value={form.badge}
            onChange={handleChange}
            className="border rounded-xl p-3 md:col-span-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="border rounded-xl p-3 md:col-span-2"
          />

          <div className="md:col-span-2">
            <label className="font-semibold">
              Upload Images
            </label>

            <input
              type="file"
              multiple
              className="mt-2"
              onChange={(e) =>
                setImages(Array.from(e.target.files))
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold px-6 py-3 rounded-xl"
          >
            {loading
              ? "Saving..."
              : product
              ? "Update Product"
              : "Add Product"}
          </button>

        </div>
      </div>
    </div>
  );
}