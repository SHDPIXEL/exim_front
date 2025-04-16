import axios from "axios";

export const BASE_URL = "https://eximback.demo.shdpixel.com";
//export const BASE_URL = "http://192.168.1.9:4010";

const API = axios.create({
    baseURL: BASE_URL,
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
