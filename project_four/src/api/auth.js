import axios from 'axios';
import { getToken } from '../helpers';

export function signin(email, password) {
  return axios.post('/api/auth', {
    email,
    password
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function signup(formValues) {
  return axios.post('/api/auth/register', formValues)
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function loadUser() {
  return axios.get('/api/auth/load', {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => {
      localStorage.removeItem('token');
      return response.data
    });
}