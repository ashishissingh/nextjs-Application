import axios from 'axios';

export const setAxiosHeaders = (token?: string) => {
  axios.defaults.headers.common['X-Domain'] = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  
  if (token) {
    axios.defaults.headers.common['Token'] = token;
  }
};
