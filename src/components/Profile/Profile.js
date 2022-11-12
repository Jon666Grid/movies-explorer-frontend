import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useInput, messageError } from '../../hook/useInput.js'
import './Profile.css';


function Profile({ disabled, handleUpdateUser, message, signOut}) {

   const user = useContext(CurrentUserContext);
   const name = useInput(user.name || '', { isEmpty: true, minLength: 2, isName: true });
   const email = useInput(user.email || '', { isEmpty: true, minLength: 3, maxLength: 30, isEmail: true });

   const disabledButton = (user.email === email.value && user.name === name.value) || !email.inputValid || !name.inputValid || disabled;

   const handleSubmit = (e) => {
      e.preventDefault()
      handleUpdateUser({
         name: name.value,
         email: email.value
      });
   }

   return (
      <section className='profile'>
         <form className='profile__form'
            onSubmit={handleSubmit}>
            <h3 className='profile__title'>Привет, {user.name}!</h3>
            <label className='profile__item'>
               <div className='profile__wrapper'>
                  <p className='profile__text'>Имя</p>
                  <input className='profile__input'
                     value={name.value}
                     onChange={(e) => name.onChange(e)}
                     onBlur={(e) => name.onBlur(e)}
                     type='name'
                     disabled={disabled} />
               </div>
               <p className='profile__error'>{messageError(name)}</p>
            </label>
            <label className='profile__item'>
               <div className='profile__wrapper'>
                  <p className='profile__text'>E-mail</p>
                  <input className='profile__input'
                     value={email.value}
                     onChange={(e) => email.onChange(e)}
                     onBlur={(e) => email.onBlur(e)}
                     type='email'
                     disabled={disabled} />
               </div>
               <p className="profile__error">{messageError(email)}</p>
            </label>
            <div className='profile__container-action'>
               <p className="profile__message">{message}</p>
               <button className={`profile__button-edit  ${disabledButton && 'profile__button-edit_disabled'}`} type='submit'
                  disabled={disabledButton}>
                  Редактировать</button>
               <button className='profile__button-exit'
                  type='button'
                  onClick={() => signOut()}
               >
                  Выйти из аккаунта
               </button>
            </div>
         </form>
      </section>
   );
}

export default Profile;