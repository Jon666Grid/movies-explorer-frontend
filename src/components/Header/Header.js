import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';

function Header() {
   return (
      <div className='header'>
         <Link to='/' className='header_link'>
            <img className='header_logo' src={logo} alt='лого' />
         </Link>
      </div>
   );
}

export default Header;