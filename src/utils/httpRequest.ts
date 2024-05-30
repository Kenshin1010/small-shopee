import axios from "axios";

const httpRequest = axios.create({
  baseURL: `https://api.itbook.store/1.0/`,
});

export const get = async (path: string, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
