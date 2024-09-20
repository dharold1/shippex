import axios from "axios";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 60000,
});

// Request interceptors for API calls
http.interceptors.request.use(
  async (request) => {
    // console.log("req",request);

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (response) => {
    // console.log("res", response);
    return response;
  },
  (error) => {
    // console.log("err", error);

    return Promise.reject(error);
  }
);
