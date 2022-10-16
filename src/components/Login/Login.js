import './Login.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Login() {
   return (
      <section className='login'>
         <form className='login__form'>
            <Link to='/' className='form__link'>
               <img className='login__form-logo' src={logo} alt='Логотип'></img>
            </Link>
            <h2 className='login__title'>Рады видеть!</h2>
            <div className='login__container'>
            <label className='login__item'>
               <p className='login__text'>E-mail</p>
               <input autoComplete='on'
                  className='login__input'
                  placeholder='Email'
                  type='email'
                  minLength='2'
                  maxLength='40'
                  required />
               <p className="login__error">Что-то пошло не так...</p>
            </label>
            <label className='login__item'>
               <p className='login__text'>Пароль</p>
               <input autoComplete="on"
                  className='login__input'
                  placeholder="Пароль"
                  type='password'
                  minLength='2'
                  maxLength='40'
                  required />
               <p className='login__error'>Что-то пошло не так...</p>
            </label>
            </div>
            <button type='submit'
               className='login__button'>Войти</button>
            <p className='login__link-text'>
            Ещё не зарегистрированы?
               <Link to='/signup' className='login__link'>Регистрация</Link>
            </p>
         </form>
      </section>
   );
}

export default Login;