import axios from "axios";

export const BASE_URL = "https://eximindiaonline.in:4000";   
// export const BASE_URL = "http://10.108.1.244:4040";
// export const BASE_URL = "http://192.168.164.244:4010";

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, 
    headers: {
        "Content-Type": "application/json", // Default content type
    },
});


API.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API Response Error:", error.response || error.message);
        return Promise.reject(error.response?.data || error.message);
    }
);

export default API;
