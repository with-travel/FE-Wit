import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_PUBLIC_SERVER_BASEURL,
});

axiosInstance.interceptors.request.use(
  (request) => {
    console.log("Axios Request:", request);
    return request;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", response);
    return response;
  },
  (error) => {
    console.error("Axios Response Error:", error);
    console.error(error.status);
    return Promise.reject(error);
  }
);
export { axiosInstance };
