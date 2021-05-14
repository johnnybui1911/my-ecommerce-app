import axios from 'axios';
import {Platform} from 'react-native';

// const uatBaseURL = 'http://d4b0a68c360a.ngrok.io';
const local =
  Platform.OS === 'ios' ? 'http://localhost:3000/' : 'http://10.0.2.2:3000/';

const baseAxios = axios.create({
  baseURL: local,
});

export default function apiRequest(config) {
  return baseAxios.request(config);
}
