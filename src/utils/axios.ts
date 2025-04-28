import { BASE_URL } from '~/constants/api';
import axios from 'axios';

export const http = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
