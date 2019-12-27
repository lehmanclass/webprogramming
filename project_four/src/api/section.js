import axios from 'axios';
import { getToken } from '../helpers';

export function getSections() {
  return axios.get('/api/section', {
    headers: {
      Authorization: `JWT ${getToken()}`
    }
  })
    .then((resp) => resp.data)
    .catch(({response}) => response.data);
}