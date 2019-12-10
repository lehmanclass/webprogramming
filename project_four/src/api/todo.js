import axios from 'axios';
import { getToken } from '../helpers';

export function create(todo, listId) {
  return axios.post('/api/todo', {todo, listId}, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function rename(todo, todoId) {
  return axios.put('/api/todo', {todo, todoId}, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function remove(todoId) {
  return axios.delete('/api/todo', {
    data: {todoId},
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function getTodoList(listId) {
  return axios.get(`/api/todo/list/${listId}`, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}

export function toggle(todoId) {
  return axios.put('/api/todo/toggle', {todoId}, {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}