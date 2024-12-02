import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://lambdabackend-production.up.railway.app/api"
});
