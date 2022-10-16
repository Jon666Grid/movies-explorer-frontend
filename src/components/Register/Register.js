import './Register.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Register() {
   return (
      <section className='register'>
         <form className='register__form'>
            <Link to='/' className='form__link'>
               <img className='register__form-logo' src={logo} alt="Логотип"></img>
            </Link>
            <h2 className='register__title'>Добро пожаловать!</h2>
            <div className='register__container'>
            <label className='register__item'>
               <p className='register__text'>Имя</p>
               <input autoComplete='on'
                  className='register__input'
                  placeholder='Имя'
                  type='name'
               />
               <p className='register__error'>Что-то пошло не так...</p>
            </label>
            <label className='register__item'>
               <p className='register__text'>E-mail</p>
               <input autoComplete='on'
                  className='register__input'
                  placeholder='Email'
                  type='email'
                  minLength='2'
                  maxLength='40'
                  required />
               <p className="register__error">Что-то пошло не так...</p>
            </label>
            <label className='register__item'>
               <p className='register__text'>Пароль</p>
               <input autoComplete="on"
                  className='register__input'
                  placeholder="Пароль"
                  type='password'
                  minLength='2'
                  maxLength='40'
                  required />
               <p className='register__error'>Что-то пошло не так...</p>
            </label>
            </div>
            <button type='submit'
               className='register__button'>Зарегистрироваться</button>
            <p className='register__link-text'>
               Уже зарегистрированы?
               <Link to='/signin' className='register__link'>Войти</Link>
            </p>
         </form>
      </section>
   );
}

export default Register;