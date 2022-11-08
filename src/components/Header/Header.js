import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

   return (
      <header className='header'>
         <Link to='/' className='header__logo-link'>
            <img className='header__logo' src={logo} alt='лого' />
         </Link>
         {loggedIn ? <Navigation /> :
         <div className='header__auth-link'>
            <Link to='/signup' className='header__auth'>Регистрация</Link>
            <Link to='/signin' className='header__auth header__auth_color'>Войти</Link>
         </div> }
      </header>
      
   );
}

export default Header;