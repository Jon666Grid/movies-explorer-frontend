import { MY_MOVIES_API } from '../utils/constants.js';

const checkResponse = (response) => {
   return response.ok ? response.json() : response.text().then(text => { throw new Error(text) });
};

const headers = {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
};

export const register = ({ email, password, name }) => {
   return fetch(`${MY_MOVIES_API}/signup`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ email, password, name })
   })
      .then(res => checkResponse(res));
};

export const login = ({ email, password }) => {
   return fetch(`${MY_MOVIES_API}/signin`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ email, password })
   })
      .then(res => checkResponse(res));
};

export const getUserInfo = (token) => {
   return fetch(`${MY_MOVIES_API}/users/me`, {
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
   }).then(res => checkResponse(res));
}

export const updateUser = (data, token) => {
   return fetch(`${MY_MOVIES_API}/users/me`, {
      method: "PATCH",
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
         name: data.name,
         email: data.email,
      }),
   }).then(res => checkResponse(res));
}

export const getMovies = (token) => {
   return fetch(`${MY_MOVIES_API}/movies`, {
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
   }).then(res => checkResponse(res));
}

export const createMovie = (data, token) => {
   return fetch(`${MY_MOVIES_API}/movies`, {
      method: 'POST',
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
         country: data.country,
         director: data.director,
         duration: data.duration,
         year: data.year,
         description: data.description,
         image: 'https://api.nomoreparties.co/' + data.image.url,
         trailerLink: data.trailerLink,
         thumbnail: 'https://api.nomoreparties.co/' + data.image.formats.thumbnail.url,
         movieId: data.id,
         nameRU: data.nameRU,
         nameEN: data.nameEN,
      }),
   }).then(res => checkResponse(res));
}

export const deleteMovie = (movieId, token) => {
   return fetch(`${MY_MOVIES_API}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
   }).then(res => checkResponse(res));
}