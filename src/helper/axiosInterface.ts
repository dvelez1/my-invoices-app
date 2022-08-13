import axios from 'axios';

export const axiosInterface= axios.create({
  baseURL: 'http://localhost:5000/Api/',
  timeout: 10000, // 10s
  headers: {
    "Content-type": "application/json"
  }
});




