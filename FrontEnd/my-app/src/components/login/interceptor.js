import axios from 'axios';

// Create an Axios instance that you can use throughout your app
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // Your API base URL here
    // You can add other default settings here
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // If the token exists, add it to the request's Authorization header
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Optionally, you can add a response interceptor as well
axiosInstance.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosInstance;
