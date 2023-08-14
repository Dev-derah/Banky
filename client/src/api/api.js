// api.js

import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1"; // Change this to your API base URL

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/users/login`,
  // Add more endpoints here as needed
};

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default api;
