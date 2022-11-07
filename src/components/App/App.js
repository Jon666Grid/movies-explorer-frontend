import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi.js';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import { useLocation } from 'react-router-dom';

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [moviesSave, setMoviesSave] = useState([]);
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (location.pathname) {
      setMessage('')
    }
  }, [location])

  const onRegister = async (data) => {
    try {
      await mainApi
        .register(data)
        .then((res) => {
          onLogin(data)
        })
    } catch (err) {
      setMessage(`Ошибка: ${err.message.slice(12, -2)}`)
      console.log(err);
    }
  };

  const onLogin = async (data) => {
    try {
      await mainApi
        .login(data)
        .then((res) => {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token);
          navigate('/movies');
        });
    } catch (err) {
      setMessage(`Ошибка: ${err.message.slice(12, -2)}`);
      setLoggedIn(false);
      console.log(err);
    }
  };

  const tokenCheck = async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    try {
      mainApi
        .getUserInfo(jwt)
        .then((data) => {
          setLoggedIn(true);
          setCurrentUser(data);
        })
    } catch (err) { console.log(err) };
  };

  const handleUpdateUser = async (data) => {
    const jwt = localStorage.getItem('jwt');
    setLoggedIn(true);
    try {
      await mainApi
        .updateUser(data, jwt).then((newUser) => {
          setCurrentUser(newUser);
          setMessage('Профиль успешно редактирован!')
        })
    } catch (err) {
      setMessage('Что-то пошло не так!')
      setLoggedIn(false);
      console.log(err)
    }
  };

  const handleSaveMovie = async (data) => {
    const jwt = localStorage.getItem('jwt');
    try {
      await mainApi.getMovies(jwt).then((data) =>
        setMoviesSave(data));
    } catch (err) { console.log(err) };
    const isLiked = moviesSave.some(i => {
      return i.movieId === data.id
    });
    try {
      if (!isLiked) {
        await mainApi.createMovie(data, jwt)
        await mainApi.getMovies(jwt).then((data) =>
          setMoviesSave(data))
      }
    } catch (err) { console.log(err) }
  };


  const handleSignOut = () => {
    localStorage.clear();
    setCurrentUser({});
    setMoviesSave([])
    setLoggedIn(false);
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {(location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies' ||
          location.pathname === '/profile') &&
          <Header loggedIn={loggedIn} />}
        <Routes>
          <Route path='/'
            element={
              <Main />}
          />
          <Route path='/movies'
            element={
              <Movies 
              handleSaveMovie={handleSaveMovie}/>}
          />
          <Route path='/saved-movies'
            element={
              <SavedMovies 
              moviesSave={moviesSave}/>}
          />
          <Route path='/profile'
            element={
              <Profile
                handleUpdateUser={handleUpdateUser}
                message={message}
                signOut={handleSignOut} />}
          />
          <Route path='/signup'
            element={
              <Register
                onRegister={onRegister}
                message={message} />}
          />
          <Route path='/signin'
            element={
              <Login
                onLogin={onLogin}
                message={message} />}
          />
          <Route path='*'
            element={<PageNotFound />}
          />
        </Routes>
        {(location.pathname === '/' ||
          location.pathname === '/movies' ||
          location.pathname === '/saved-movies') &&
          <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
