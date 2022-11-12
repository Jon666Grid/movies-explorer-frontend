import './App.css';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
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
  const [disabled, setDisabled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (location.pathname) {
      setMessage('')
    }
  }, [location]);

  const onRegister = (data) => {
    setDisabled(true);
    mainApi
      .register(data)
      .then(() => {
        onLogin(data);
        setDisabled(false);
      })
      .catch(err => {
        setMessage(`Что-то пошло не так! ${err}`)
        setDisabled(false);
      })
  };

  const onLogin = (data) => {
    setDisabled(true);
    mainApi
      .login(data)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        navigate('/movies');
        mainApi
          .getUserInfo(res.token)
          .then((data) => {
            setCurrentUser(data);
          }).catch(err => {
            console.log(err)
          })
          setDisabled(false);
      })
      .catch(err => {
        setMessage(`Что-то пошло не так! ${err}`);
        setDisabled(false);
        setLoggedIn(false);
      })
  };

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    mainApi
      .getUserInfo(jwt)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          setCurrentUser(data);
          navigate(location.pathname);
        }
      })
      .catch(err => console.log(err));
  };

  const handleUpdateUser = (data) => {
    const jwt = localStorage.getItem('jwt');
    setLoggedIn(true);
    setDisabled(true);
    mainApi
      .updateUser(data, jwt).then((newUser) => {
        setCurrentUser(newUser);
        setMessage('Профиль успешно редактирован!')
        setDisabled(false);
      })
      .catch(err => {
        setMessage('Что-то пошло не так')
        setDisabled(false);
        setLoggedIn(false);
        console.log(err)
      })
  };

  const getMovies = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      handleSignOut();
      return;
    }
    setPreloader(true);
    setMovies([]);
    moviesApi()
      .then(res => {
        setMovies(res);
        getMyMovies();
        setPreloader(false);
        setErrorInfo(false)
      })
      .catch((err) => {
        console.log(err)
        setErrorInfo(true)
        setPreloader(false)
      })
  };

  const getMyMovies = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      handleSignOut();
      return;
    }
    setPreloader(true);
    mainApi.getMovies(jwt)
      .then((data) => {
        setMoviesSave(data)
        setPreloader(false);
      })
      .catch(err => {
        console.log(err)
        setPreloader(false);
      })
  };

  const handleSaveMovie = (data) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      handleSignOut();
      return;
    }
    mainApi
      .createMovie(data, jwt)
      .then((res) => {
        setMoviesSave((prev) => [...prev, res])
      }).catch(err => console.log(err));
  };

  const handleDeleteMovie = (data) => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      handleSignOut();
      return;
    }
    mainApi
      .deleteMovie(data._id, jwt)
      .then(() => {
        setMoviesSave((item) => item.filter((c) => c._id !== data._id));
      }).catch(err => console.log(err))
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
                handleDeleteMovie={handleDeleteMovie}
                movies={movies}
                moviesSave={moviesSave}
                preloader={preloader}
                errorInfo={errorInfo}
                loggedIn={loggedIn} />}
          />
          <Route path='/saved-movies'
            element={
              <SavedMovies
                getMyMovies={getMyMovies}
                handleDeleteMovie={handleDeleteMovie}
                moviesSave={moviesSave}
                preloader={preloader}
                loggedIn={loggedIn} />}
          />
          <Route path='/profile'
            element={
              <Profile
                handleUpdateUser={handleUpdateUser}
                message={message}
                signOut={handleSignOut}
                disabled={disabled} />}
          />
          <Route path='/signup'
            element={loggedIn ? <Navigate to='/' />
              : <Register
                onRegister={onRegister}
                message={message}
                disabled={disabled} />}
          />
          <Route path='/signin'
            element={loggedIn ? <Navigate to='/' />
              : <Login
                onLogin={onLogin}
                message={message}
                disabled={disabled} />}
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
