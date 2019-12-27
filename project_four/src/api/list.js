import axios from 'axios';
import { getToken } from '../helpers';

export function create(name, sectionId) {
  return axios.post('/api/list', {name, sectionId}, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function getUserLists(sectionId) {
  return axios.get(`/api/list/section/${sectionId}`, {
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