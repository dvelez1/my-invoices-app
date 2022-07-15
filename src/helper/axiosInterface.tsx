import axios from 'axios';

export const axiosInterface= axios.create({
  baseURL: 'http://localhost:5000/Api/',
  headers: {
    "Content-type": "application/json"
  }
});




