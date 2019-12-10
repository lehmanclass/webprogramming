import axios from 'axios';
import { getToken } from '../helpers';

export function create(name) {
  return axios.post('/api/list', {name}, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function getUserLists() {
  return axios.get('http://localhost:3000/api/list', {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function rename(name, listId) {
  return axios.put('/api/list', {name, listId}, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function remove(listId) {
  return axios.delete('/api/list', {
    data: {listId},
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}