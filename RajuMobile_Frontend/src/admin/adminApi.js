import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/admin";

export const getDashboardStats = () =>
    axios.get(`${BASE}/dashboard/`).then((r) => r.data);

export const getProducts = () =>
    axios.get(`${BASE}/products/`).then((r) => r.data);

export const getOrders = () =>
    axios.get(`${BASE}/orders/`).then((r) => r.data);

export const getCustomers = () =>
    axios.get(`${BASE}/customers/`).then((r) => r.data);

export const createProduct = (data) =>
    axios.post(
        "http://127.0.0.1:8000/api/admin/products/create/",
        data
    );

export const addProduct = (data, imageFiles = []) => {
    const formData = new FormData();

    // Add form fields
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("original_price", data.original_price);
    formData.append("description", data.description);
    formData.append("badge", data.badge);
    formData.append("stock", data.stock);

    // Add images
    imageFiles.forEach((file) => {
        formData.append("images", file);
    });

    return axios.post(
        "http://127.0.0.1:8000/api/products/add/",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    ).then((r) => r.data);
};

export const updateProduct = (id, data, imageFiles = []) => {
    const formData = new FormData();

    // Add form fields
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("original_price", data.original_price);
    formData.append("description", data.description);
    formData.append("badge", data.badge);
    formData.append("stock", data.stock);

    // Add images only if new ones are provided
    imageFiles.forEach((file) => {
        formData.append("images", file);
    });

    return axios.put(
        `http://127.0.0.1:8000/api/products/update/${id}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    ).then((r) => r.data);
};

export const deleteProduct = (id) =>
    axios.delete(
        `http://127.0.0.1:8000/api/products/delete/${id}/`
    );


export const updateStock = (id, product, stock) => {
    return axios.put(
        `http://127.0.0.1:8000/api/products/update/${id}/`,
        {
            ...product,
            stock,
        }
    );
};
