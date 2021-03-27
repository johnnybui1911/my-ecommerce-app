import axios from 'axios';

// const uatBaseURL = 'http://c50843c7397e.ngrok.io/';

const baseAxios = axios.create({
  baseURL: 'http://localhost:3000/',
});

export default function apiRequest(config) {
  return baseAxios.request(config);
}
