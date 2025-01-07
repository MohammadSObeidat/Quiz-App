import axios from "axios"

const baseURL = 'https://upskilling-egypt.com:3005'
export const imgBaseURL = 'https://upskilling-egypt.com:3005'

// Public URL
export const axiosInstanceURL = axios.create({baseURL: baseURL})

// Privite URL
export const axiosInstance = axios.create({baseURL: baseURL})

axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("token");
  
    return config;
});


// Auth Endpoints
export const AUTH_URL = {
    LOGIN: `/api/auth/login`,
    // FORGET_PASSWORD: `/Users/Reset/Request`,
    // RESET_PASSWORD: `/Users/Reset`,
    // REGISTER: `/Users/Register`,
}