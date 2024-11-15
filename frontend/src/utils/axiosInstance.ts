import axios, { AxiosInstance } from "axios";

const secureAxios: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export default secureAxios;
