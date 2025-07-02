import axios from "axios";

const API = axios.create({
  baseURL: "https://dummyjson.com",
});

API.interceptors.request.use((config) => ({
  ...config,
  headers: {
    "Content-Type": "application/json", 
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
}));

API.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(err); 
  }
);

export default API;
