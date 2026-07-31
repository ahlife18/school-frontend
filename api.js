import axios from 'axios';

const api = axios.create({
  baseURL: 'https://school-api.onrender.com', // ⚠️ NO TRAILING SLASH!
});

export default api;