const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const moviesApi = () => {
   return fetch(`${MOVIE_URL}`, {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
   })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
};