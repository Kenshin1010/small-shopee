import axios, { AxiosInstance } from "axios";

const httpRequest: AxiosInstance = axios.create({
  // baseURL: `http://localhost:5555/`,
  baseURL: `https://small-shopee-node-express.vercel.app/`,
});

export default httpRequest;
