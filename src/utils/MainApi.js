const BASE_URL = 'http://localhost:3000';

const checkResponse = (response) => {
   return response.ok ? response.json() : Promise.reject((`Ошибка ${response.status} : ${response.statusText}`));
};

const headers = {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
};

export const register = ({ email, password, name }) => {
   return fetch(`${BASE_URL}/signup`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ email, password, name })
   })
      .then(res => checkResponse(res));
      
};

export const login = ({ email, password }) => {
   return fetch(`${BASE_URL}/signin`, {
      headers,
      method: 'POST',
      body: JSON.stringify({ email, password })
   })
      .then(res => checkResponse(res));
      
};

export const getUserInfo = (token) => {
   return fetch(`${BASE_URL}/users/me`, {
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
   }).then(res => checkResponse(res));
}

export const updateUser = (data, token) => {
   return fetch(`${BASE_URL}/users/me`, {
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
   return fetch(`${BASE_URL}/movies`, {
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
   }).then(res => checkResponse(res));
}

export const createMovie = (data, token) => {
   return fetch(`${BASE_URL}/movies`, {
      method: "POST",
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data),
   }).then(res => checkResponse(res));
}

export const deleteMovie = (movieId, token) => {
   return fetch(`${BASE_URL}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
         ...headers,
         'Authorization': `Bearer ${token}`
      },
   }).then(res => checkResponse(res));
}