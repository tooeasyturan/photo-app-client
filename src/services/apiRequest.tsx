/** @format */

import axios, { AxiosRequestConfig, Method } from "axios";
import { GetToken } from "./tokenService";
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
  const token = GetToken();
  const headers = {
    Authorization: `bearer ${token}`,
  };
  return apiRequest(url, method, data, headers);
};
