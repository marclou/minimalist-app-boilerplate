import axios from 'axios';

import config from '../config';
import { store } from '../state';

const apiClient = axios.create({
  baseURL: config.apiUrl,
});

apiClient.interceptors.request.use(function (config) {
  const { auth } = store.getState();

  config.headers.authorization = auth.tokens && auth.tokens.access ? `Bearer ${auth.tokens.access.token}` : '';

  return config;
});

apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

    error.message = message;
    return Promise.reject(error);
  }
);

export default apiClient;
