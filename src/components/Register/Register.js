import './Register.css';
import { Link } from 'react-router-dom';
import { useInput } from '../../hook/useInput.js'
import logo from '../../images/logo.svg';

function Register(props) {

   const name = useInput('', { isEmpty: true, minLength: 2 });
   const email = useInput('', { isEmpty: true, minLength: 3, maxLength: 30, isEmail: true });
   const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 30, });

   const messageError = (item) => {
      if ((item).isDirty && (item).isEmpty) return 'Поле не может быть пустым';
      if ((item).isDirty && (item).minLength) return 'Некорректная длина';
      if ((item).isDirty && (item).maxLength) return 'Некорректная длина';
      if ((item).isDirty && (item).isEmail) return 'Некорректный емайл';
   }

   const disabledButton = !name.inputValid || !email.inputValid || !password.inputValid;

   const handleSubmit = (e) => {
      e.preventDefault()
      props.onRegister({
         name: name.value,
         email: email.value,
         password: password.value
      });
   }

   return (
      <section className='register'>
         <form className='register__form'
            onSubmit={handleSubmit}>
            <Link to='/' className='register__link'>
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
                     value={name.value}
                     onChange={(e) => name.onChange(e)}
                     onBlur={(e) => name.onBlur(e)}
                     required
                  />
                  <p className='register__error'>{messageError(name)}</p>
               </label>
               <label className='register__item'>
                  <p className='register__text'>E-mail</p>
                  <input autoComplete='on'
                     className='register__input'
                     placeholder='Email'
                     type='email'
                     value={email.value}
                     onChange={(e) => email.onChange(e)}
                     onBlur={(e) => email.onBlur(e)}
                     required
                  />
                  <p className="register__error">{messageError(email)}</p>
               </label>
               <label className='register__item'>
                  <p className='register__text'>Пароль</p>
                  <input autoComplete="on"
                     className='register__input'
                     placeholder="Пароль"
                     type='password'
                     value={password.value}
                     onChange={(e) => password.onChange(e)}
                     onBlur={(e) => password.onBlur(e)}
                     required
                  />
                  <p className='register__error'>{messageError(password)}</p>
               </label>
            </div>
            <p className="register__error">{props.errorMessage}</p>
            <button type='submit'
               className={`register__button  ${disabledButton && 'register__button_disabled'}`}
               disabled={disabledButton}
            >Зарегистрироваться</button>
            <p className='register__link-text'>
               Уже зарегистрированы?
               <Link to='/signin' className='register__link'>Войти</Link>
            </p>
         </form>
      </section>
   );
}

export default Register;