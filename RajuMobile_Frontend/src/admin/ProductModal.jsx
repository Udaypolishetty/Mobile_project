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

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);

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

    setImageFiles([]);
  }, [product, show]);

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

      // Ensure numeric fields are numbers
      const productData = {
        name: form.name.trim(),
        brand: form.brand.trim(),
        category: form.category.trim(),
        price: parseFloat(form.price) || 0,
        original_price: parseFloat(form.original_price) || 0,
        description: form.description.trim(),
        badge: form.badge.trim(),
        stock: parseInt(form.stock) || 0,
      };

      console.log("Submitting product data:", productData);
      console.log("Images count:", imageFiles.length);

      if (product) {
        console.log("Updating product ID:", product.id);
        await updateProduct(product.id, productData, imageFiles);
      } else {
        console.log("Adding new product");
        await addProduct(productData, imageFiles);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error("Product submission error:", err);
      const errorMsg = err.response?.data?.error ||
        err.response?.data?.detail ||
        err.message ||
        "Something went wrong";
      alert(`Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7">
        <h2 className="mb-6 text-2xl font-bold">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="original_price"
            placeholder="Original Price"
            value={form.original_price}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="rounded-xl border p-3"
          />

          <input
            name="badge"
            placeholder="Badge"
            value={form.badge}
            onChange={handleChange}
            className="rounded-xl border p-3 md:col-span-2"
          />

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="rounded-xl border p-3 md:col-span-2"
          />

          <div className="md:col-span-2">
            <label className="mb-2 block font-semibold">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
              className="w-full rounded-xl border p-3"
            />

            {imageFiles.length > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                {imageFiles.length} image(s) selected
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-3"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 disabled:opacity-60"
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