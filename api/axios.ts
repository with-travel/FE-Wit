import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.EXPO_BASE_URL,
});

export { axiosInstance };
