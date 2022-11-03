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
  const [message, setMessage] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(loggedIn)

  useEffect(() => {
    tokenCheck();
  }, [loggedIn])

  useEffect(() => {
    if (location.pathname) {
      setMessage('')}
  }, [location])

  const tokenCheck = async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      return;
    }
    try {
      mainApi
        .getUserInfo(jwt)
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
        })
    } catch (err) { console.log(err) };
  };

  const onRegister = async (data) => {
    try {
      await mainApi
        .register(data)
        .then(() => {
        onLogin(data)})
    } catch (err) {
      setMessage(`Что-то пошло не так! ${err}`)
      console.log(err);
    }
  }

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
      setMessage(`Что-то пошло не так! ${err}`)
      console.log(err);
    }
    finally { setLoggedIn(false)};
  }

  const handleUpdateUser = async (data,) => {
    const jwt = localStorage.getItem('jwt');
    setLoggedIn(true);
    try {
      await mainApi
        .updateUser(data, jwt).then((newUser) => {
          setCurrentUser(newUser);
          setMessage('Профиль успешно редактирован!')
        })
    } catch (err) {
      setMessage(`Что-то пошло не так! ${err}`)
      console.log(err)
    }
    finally { setLoggedIn(false)};
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/' element={
            <>
              <Header />
              <Main />
              <Footer />
            </>}
          />
          <Route path='/movies' element={
            <>
              <Header
                loggedIn={loggedIn}
              />
              <Movies />
              <Footer />
            </>}
          />
          <Route path='/saved-movies' element={
            <>
              <Header />
              <SavedMovies />
              <Footer />
            </>
          } />
          <Route path='/profile' element={
            <>
              <Header
                loggedIn={loggedIn} />
              <Profile
                updateUser={handleUpdateUser}
                message={message} />
            </>
          } />
          <Route path='/signup' element={
            <Register
              onRegister={onRegister}
              message={message}
            />} />
          <Route path='/signin' element={
            <Login
              onLogin={onLogin}
              message={message}
            />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
