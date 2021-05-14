import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASEURL } from './config';

const httpRequest = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
});

httpRequest.interceptors.request.use((config:AxiosRequestConfig) => config, ((error) => Promise.reject(error)));

httpRequest.interceptors.response.use((response:AxiosResponse) => response, (error) => Promise.reject(error));

export default httpRequest;
