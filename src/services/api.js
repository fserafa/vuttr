import axios from 'axios';

const api = axios.create({
    baseURL: 'https://5e1da426f846e500144d5de0.mockapi.io/api'
});

export default api;