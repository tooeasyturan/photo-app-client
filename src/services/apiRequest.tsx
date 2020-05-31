/** @format */

import axios, { Method } from "axios";
import { getToken } from "./tokenService";
const baseUrl = "http://localhost:3004";

export const apiRequest = (
  url: string,
  method: Method,
  data: {},
  headers?: {}
) => {
  return axios({
    url: `${baseUrl}/${url}`,
    method: method,
    data: data,
    headers: headers,
  });
};

export const apiRequestWithToken = (url: string, method: Method, data: {}) => {
  const token = getToken();
  console.log("get token", token);
  const headers = {
    Authorization: `bearer ${token}`,
  };
  console.log("headers", headers);
  return apiRequest(url, method, data, headers);
};
