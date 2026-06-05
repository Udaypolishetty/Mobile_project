import axios from "axios";

const BASE = "http://127.0.0.1:8000/api/auth";

// ── Attach token to every request if present ──────────────────
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auto-refresh on 401 ────────────────────────────────────────
axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = localStorage.getItem("refresh_token");
      if (refresh) {
        try {
          const { data } = await axios.post(`${BASE}/token/refresh/`, { refresh });
          localStorage.setItem("access_token", data.access);
          original.headers.Authorization = `Bearer ${data.access}`;
          return axios(original);
        } catch {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(err);
  }
);

// ── Auth API calls ─────────────────────────────────────────────
export const registerUser = (data) =>
  axios.post(`${BASE}/register/`, data).then((r) => r.data);

export const loginUser = (email, password) =>
  axios.post(`${BASE}/login/`, { email, password }).then((r) => r.data);

export const getMe = () =>
  axios.get(`${BASE}/me/`).then((r) => r.data);

export const updateProfile = (data) =>
  axios.patch(`${BASE}/me/update/`, data).then((r) => r.data);

export const logoutUser = (refresh) =>
  axios.post(`${BASE}/logout/`, { refresh }).then((r) => r.data);
