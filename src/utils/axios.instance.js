import axios from 'axios';

const axiosInstance = axios.create();

const requestInterceptor = async (config) => {
  const isOptionRequest = (config.method || '').toUpperCase() === 'OPTIONS';
  if (!isOptionRequest && !config.headers.Authorization) {
    config.headers.Authorization = "dummy_token";
  }
  if (!isOptionRequest && !config.headers.Accept) {
    config.headers.Accept = 'application/json';
  }
  if (!isOptionRequest && !config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
};

const requestRefuser = (err) => (new Promise((resolve, reject) => reject(err)));

axiosInstance.interceptors.request.use(requestInterceptor, requestRefuser);

export default axiosInstance;
