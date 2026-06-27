// import { useEffect, useState } from "react";
// import { addProduct, updateProduct } from "./api/adminApi";

// export default function ProductModal({
//   show,
//   onClose,
//   product = null,
//   onSuccess,
// }) {
//   const [form, setForm] = useState({
//     name: "",
//     brand: "",
//     category: "",
//     price: "",
//     original_price: "",
//     badge: "",
//     description: "",
//     stock: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [imageFiles, setImageFiles] = useState([]);

//   useEffect(() => {
//     if (product) {
//       setForm({
//         name: product.name || "",
//         brand: product.brand || "",
//         category: product.category || "",
//         price: product.price || "",
//         original_price: product.original_price || "",
//         badge: product.badge || "",
//         description: product.description || "",
//         stock: product.stock || "",
//       });
//     } else {
//       setForm({
//         name: "",
//         brand: "",
//         category: "",
//         price: "",
//         original_price: "",
//         badge: "",
//         description: "",
//         stock: "",
//       });
//     }

//     setImageFiles([]);
//   }, [product, show]);

//   if (!show) return null;

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async () => {
//     try {
//       setLoading(true);

//       // Ensure numeric fields are numbers
//       const productData = {
//         name: form.name.trim(),
//         brand: form.brand.trim(),
//         category: form.category.trim(),
//         price: parseFloat(form.price) || 0,
//         original_price: parseFloat(form.original_price) || 0,
//         description: form.description.trim(),
//         badge: form.badge.trim(),
//         stock: parseInt(form.stock) || 0,
//       };

//       console.log("Submitting product data:", productData);
//       console.log("Images count:", imageFiles.length);
// let response;

// if (product) {
//   response = await updateProduct(
//     product.id,
//     productData,
//     imageFiles
//   );
// } else {
//   response = await addProduct(
//     productData,
//     imageFiles
//   );
// }

// if (onSuccess) {
//   onSuccess(response);
// }
//       onClose();
//     } catch (err) {
//       console.error("Product submission error:", err);
//       const errorMsg = err.response?.data?.error ||
//         err.response?.data?.detail ||
//         err.message ||
//         "Something went wrong";
//       alert(`Error: ${errorMsg}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//       <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-7">
//         <h2 className="mb-6 text-2xl font-bold">
//           {product ? "Edit Product" : "Add Product"}
//         </h2>

//         <div className="grid gap-4 md:grid-cols-2">
//           <input
//             name="name"
//             placeholder="Product Name"
//             value={form.name}
//             onChange={handleChange}
//             className="rounded-xl border p-3"
//           />

//           <input
//             name="brand"
//             placeholder="Brand"
//             value={form.brand}
//             onChange={handleChange}
//             className="rounded-xl border p-3"
//           />

//           <input
//             name="category"
//             placeholder="Category"
//             value={form.category}
//             onChange={handleChange}
//             className="rounded-xl border p-3"
//           />

//           <input
//             name="price"
//             placeholder="Price"
//             value={form.price}
//             onChange={handleChange}
//             className="rounded-xl border p-3"
//           />

//           <input
//             name="original_price"
//             placeholder="Original Price"
//             value={form.original_price}
//             onChange={handleChange}
//             className="rounded-xl border p-3"
//           />

//           <input
//             name="stock"
//             placeholder="Stock"
//             value={form.stock}
//             onChange={handleChange}
//             className="rounded-xl border p-3"
//           />

//           <input
//             name="badge"
//             placeholder="Badge"
//             value={form.badge}
//             onChange={handleChange}
//             className="rounded-xl border p-3 md:col-span-2"
//           />

//           <textarea
//             name="description"
//             placeholder="Description"
//             rows="4"
//             value={form.description}
//             onChange={handleChange}
//             className="rounded-xl border p-3 md:col-span-2"
//           />

//           <div className="md:col-span-2">
//             <label className="mb-2 block font-semibold">Upload Images</label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
//               className="w-full rounded-xl border p-3"
//             />

//             {imageFiles.length > 0 && (
//               <p className="mt-2 text-sm text-gray-600">
//                 {imageFiles.length} image(s) selected
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="mt-8 flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="rounded-xl border px-5 py-3"
//           >
//             Cancel
//           </button>

//           <button
//             disabled={loading}
//             onClick={handleSubmit}
//             className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-black hover:bg-cyan-400 disabled:opacity-60"
//           >
//             {loading
//               ? "Saving..."
//               : product
//                 ? "Update Product"
//                 : "Add Product"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

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

      let response;
      if (product) {
        response = await updateProduct(product.id, productData, imageFiles);
      } else {
        response = await addProduct(productData, imageFiles);
      }

      if (onSuccess) {
        onSuccess(response);
      }
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4">
      <style>{`
        .premium-input {
          background-color: #ffffff;
          border: 1.5px solid #e2e8f0;
          color: #0f172a;
          font-size: 14px;
          transition: all 0.2s ease;
          outline: none;
        }
        .premium-input:focus {
          border-color: #00F7FF;
          box-shadow: 0 0 0 4px rgba(0, 247, 255, 0.12);
        }
        .premium-input::placeholder {
          color: #94a3b8;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 99px;
        }
      `}</style>

      <div className="custom-scrollbar max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100 flex flex-col transform transition-all">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 pt-6 pb-4 border-b border-slate-100 z-10 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#00F7FF]">Management</span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
              {product ? "Edit Product Details" : "Create New Product"}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 space-y-5">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Product Title</label>
              <input
                name="name"
                placeholder="e.g. iPhone 15 Pro Max"
                value={form.name}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Brand Name</label>
              <input
                name="brand"
                placeholder="e.g. Apple"
                value={form.brand}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Category</label>
              <input
                name="category"
                placeholder="e.g. Smartphones"
                value={form.category}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Current Deal Price (₹)</label>
              <input
                name="price"
                placeholder="e.g. 14999"
                value={form.price}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5 font-semibold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Original List Price (₹)</label>
              <input
                name="original_price"
                placeholder="e.g. 15999"
                value={form.original_price}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5 font-medium text-slate-500"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Available Stock Units</label>
              <input
                name="stock"
                placeholder="e.g. 25"
                value={form.stock}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5 font-medium"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Product Ribbon Tag / Badge</label>
              <input
                name="badge"
                placeholder="e.g. Trending, 10% OFF, Limited Edition"
                value={form.badge}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5 text-xs tracking-wider"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Product Description</label>
              <textarea
                name="description"
                placeholder="Provide a detailed item overview..."
                rows="3"
                value={form.description}
                onChange={handleChange}
                className="premium-input rounded-xl p-3.5 resize-none custom-scrollbar"
              />
            </div>

            {/* Media Upload Box Layout */}
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-700 tracking-wide">Product Showcase Media</label>
              <div className="relative border-2 border-dashed border-slate-200 hover:border-[#00F7FF]/50 bg-slate-50/50 rounded-2xl p-5 transition-colors text-center group flex flex-col items-center justify-center cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#00F7FF] shadow-sm transition-colors mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-700">Click to select files or drop here</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Supports PNG, JPG or WEBP formats</p>
              </div>

              {imageFiles.length > 0 && (
                <div className="flex items-center gap-2 mt-1 px-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-xs font-bold text-slate-600">
                    {imageFiles.length} item{imageFiles.length > 1 ? "s" : ""} selected ready to upload
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Modal Sticky Footer Actions */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-slate-100 mt-auto flex items-center justify-end gap-3 z-10">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs tracking-wide hover:bg-slate-50 active:scale-95 transition-all"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs tracking-wide shadow-lg shadow-slate-900/10 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                <span>Saving Changes...</span>
              </>
            ) : product ? (
              "Save Modifications"
            ) : (
              "Publish Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
