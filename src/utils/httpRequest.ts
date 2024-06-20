import axios from "axios";

const httpRequest = axios.create({
  baseURL: `http://localhost:5555/`,
});

export const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
