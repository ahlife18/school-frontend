import axios from 'axios';

const api = axios.create({
    baseURL: 'https://school-api.onrender.com', 
});

export default api;