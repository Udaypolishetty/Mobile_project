import axios from "axios";

const BASE        = "VITE_API_URL/api/admin";
const PRODUCTS    = "VITE_API_URL/api/products";

// ── Auth header ───────────────────────────────────────────────────
const auth = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

// ── Dashboard ─────────────────────────────────────────────────────
export const getDashboardStats = () =>
  axios.get(`${BASE}/dashboard/`, { headers: auth() }).then((r) => r.data);

// ── Customers ─────────────────────────────────────────────────────
export const getCustomers = () =>
  axios.get(`${BASE}/customers/`, { headers: auth() }).then((r) => r.data);

// ── Orders ────────────────────────────────────────────────────────
export const getOrders = () =>
  axios.get(`${BASE}/orders/`, { headers: auth() }).then((r) => r.data);

// ── Products ──────────────────────────────────────────────────────
export const getProducts = () =>
  axios.get(`${PRODUCTS}/`).then((r) => r.data);

// ── ADD PRODUCT ───────────────────────────────────────────────────
// Pass a plain JS object {name, brand, price, ...} + imageFiles array
export const addProduct = (fields, imageFiles = []) => {
  const fd = buildFormData(fields, imageFiles);
  return axios.post(`${PRODUCTS}/add/`, fd, {
    headers: {
      ...auth(),
    //   "Content-Type": "multipart/form-data",   // required for file upload
    },
  }).then((r) => r.data);
};

// ── UPDATE PRODUCT ────────────────────────────────────────────────
// imageFiles is optional — pass [] if not changing images
export const updateProduct = (id, fields, imageFiles = []) => {
  const fd = buildFormData(fields, imageFiles);
  return axios.put(`${PRODUCTS}/update/${id}/`, fd, {
    headers: {
      ...auth(),
    //   "Content-Type": "multipart/form-data",
    },
  }).then((r) => r.data);
};

// ── DELETE PRODUCT ────────────────────────────────────────────────
export const deleteProduct = (id) =>
  axios.delete(`${PRODUCTS}/delete/${id}/`, { headers: auth() })
    .then((r) => r.data);

// ── UPDATE STOCK ──────────────────────────────────────────────────
// Efficient: only sends the stock field, no need to re-fetch all products
export const updateStock = (id, stock) =>
  axios.put(
    `${PRODUCTS}/update/${id}/`,
    { stock },
    { headers: { ...auth(), "Content-Type": "application/json" } }
  ).then((r) => r.data);


// ── Helper: build FormData from a plain object + files ────────────
function buildFormData(fields, imageFiles = []) {
  const fd = new FormData();

  // Append all text fields
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      fd.append(key, value);
    }
  });

  // Append each image file under the key "images"
  imageFiles.forEach((file) => {
    fd.append("images", file);
  });

  return fd;
}


// ── HOW TO USE IN ProductModal.jsx ────────────────────────────────
//
// ADD:
//   const [imageFiles, setImageFiles] = useState([]);
//
//   // In your file input:
//   <input
//     type="file"
//     multiple
//     accept="image/*"
//     onChange={(e) => setImageFiles(Array.from(e.target.files))}
//   />
//
//   // On submit:
//   if (isEdit) {
//     await updateProduct(product.id, {
//       name, brand, category, price, original_price,
//       description, badge, stock,
//     }, imageFiles);
//   } else {
//     await addProduct({
//       name, brand, category, price, original_price,
//       description, badge, stock,
//     }, imageFiles);
//   }
