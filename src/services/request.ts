import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import LocalStorage from '@utils/local-storage-utils';
import { USER_KEY } from '@src/common/constant/auth-constant';
import { BASEURL } from './config';

const httpRequest = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
});

httpRequest.interceptors.request.use((config:AxiosRequestConfig) => {
  // 'Authorization':
  const token = LocalStorage.readPermanentlyStoreData(USER_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, ((error) => Promise.reject(error)));

httpRequest.interceptors.response.use((response:AxiosResponse) => response, (error) => Promise.reject(error));

export default httpRequest;
