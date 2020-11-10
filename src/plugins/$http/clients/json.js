import axios from 'axios';

const jsonAxios = axios.create({
  baseURL: 'http://127.0.0.1:8080/api',
  headers: {},
  json: true
});
jsonAxios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
jsonAxios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  window.alert(error.response.data.msg);
  return Promise.reject(error.response.data.msg);
});

export default jsonAxios;
