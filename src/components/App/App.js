import './App.css';
import React, { useState } from 'react';
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

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  

  const onRegister = async (data) => {
    try {
      await mainApi
        .register(data);
      navigate('/signin');
      setErrorMessage('')
    } catch (err) {
      setErrorMessage(`Что-то пошло не так! ${err}`)
      console.log(err);
    }
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
            <Header />
            <Movies />
            <Footer />
          </>}
        />
        <Route path='/saved-movies' element={
          <>
            <Header  />
            <SavedMovies />
            <Footer />
          </>
        } />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signup' element={
        <Register
        onRegister={onRegister}
        errorMessage={errorMessage}
        />} />
        <Route path='/signin' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
