import './Login.css';
import { Link } from 'react-router-dom';
import { useInput, messageError } from '../../hook/useInput.js'
import logo from '../../images/logo.svg';

function Login({ disabled, onLogin, message }) {

   const email = useInput('', { isEmpty: true, minLength: 3, maxLength: 30, isEmail: true });
   const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 30, });

   const disabledButton = !email.inputValid || !password.inputValid || disabled;

   const handleSubmit = (e) => {
      e.preventDefault()
      onLogin({
         email: email.value,
         password: password.value
      });
   }

   return (
      <section className='login'>
         <form className='login__form'
         onSubmit={handleSubmit}>
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
                  value={email.value}
                  onChange={(e) => email.onChange(e)}
                  onBlur={(e) => email.onBlur(e)}
                  required 
                  disabled={disabled} />
               <p className="login__error">{messageError(email)}</p>
            </label>
            <label className='login__item'>
               <p className='login__text'>Пароль</p>
               <input autoComplete="on"
                  className='login__input'
                  placeholder="Пароль"
                  type='password'
                  value={password.value}
                  onChange={(e) => password.onChange(e)}
                  onBlur={(e) => password.onBlur(e)}
                  required 
                  disabled={disabled} />
               <p className='login__error'>{messageError(password)}</p>
            </label>
            </div>
            <p className="login__message">{message}</p>
            <button type='submit'
               className={`login__button  ${disabledButton && 'login__button_disabled'}`}
               disabled={disabledButton}
            >Войти</button>
            <p className='login__link-text'>
            Ещё не зарегистрированы?
               <Link to='/signup' className='login__link'>Регистрация</Link>
            </p>
         </form>
      </section>
   );
}

export default Login;