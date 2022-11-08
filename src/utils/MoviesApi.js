import { MOVIES_API } from '../utils/constants.js';

export const moviesApi = () => {
   return fetch(`${MOVIES_API}`, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
   })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};