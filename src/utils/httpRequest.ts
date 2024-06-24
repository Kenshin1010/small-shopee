import axios, { AxiosInstance } from "axios";

const httpRequest: AxiosInstance = axios.create({
  baseURL: `http://localhost:5555/`,
});

export default httpRequest;
