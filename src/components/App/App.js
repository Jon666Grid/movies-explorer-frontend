import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { moviesApi } from '../../utils/MoviesApi.js';
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
  const [movies, setMovies] = useState([]);
  const [moviesSave, setMoviesSave] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [errorInfo, setErrorInfo] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [message, setMessage] = useState('');
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

  const onRegister = (data) => {
    mainApi
      .register(data)
      .then((res) => {
        onLogin(data)
      })
      .catch(err => {
        setMessage(`Ошибка: ${err.message.slice(12, -2)}`)
        console.log(err)
      });
};

  const onLogin = (data) => {
    mainApi
      .login(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
      })
      .catch(err => {
        setMessage(`Ошибка: ${err.message.slice(12, -2)}`);
        setLoggedIn(false);
        console.log(err)
      });
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    mainApi
      .getUserInfo(jwt)
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data);
      })
      .catch(err => console.log(err));
  };

  const handleUpdateUser = (data) => {
    const jwt = localStorage.getItem('jwt');
    setLoggedIn(true);
    mainApi
      .updateUser(data, jwt).then((newUser) => {
        setCurrentUser(newUser);
        setMessage('Профиль успешно редактирован!')
      })
      .catch(err => {
        setMessage('Что-то пошло не так!')
        setLoggedIn(false);
        console.log(err)
      })
  };

  const getMovies = () => {
    setPreloader(true);
    setMovies([]);
    moviesApi()
      .then(res => {
        setMovies(res);
        setPreloader(false);
        setErrorInfo(false)
      })
      .catch((err) => {
        console.log(err)
        setErrorInfo(true)
        setPreloader(false)
      })
  }

  const getMyMovies = () => {
    setPreloader(true);
    const jwt = localStorage.getItem('jwt');
    mainApi.getMovies(jwt)
      .then((data) => {
        setMoviesSave(data)
        setPreloader(false);
      })
      .catch(err => {
        console.log(err)
        setPreloader(false);
      })
  }

  const handleSaveMovie = (data) => {
    const jwt = localStorage.getItem('jwt');
    const isLiked = moviesSave.some(i => {
      return i.movieId === data.id
    });
    setLiked(isLiked);
    if (!isLiked) {
      mainApi
        .createMovie(data, jwt)
        .catch(err => console.log(err));
    }
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
              getMovies={getMovies}
              handleSaveMovie={handleSaveMovie}
              movies={movies}
              isLiked={isLiked}
              preloader={preloader}
              errorInfo={errorInfo}/>}
          />
          <Route path='/saved-movies'
            element={
              <SavedMovies
              getMyMovies={getMyMovies}
              moviesSave={moviesSave}
              preloader={preloader}/>}
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
