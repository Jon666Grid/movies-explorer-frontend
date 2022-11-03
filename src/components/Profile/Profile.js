import { useContext } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useInput, messageError } from '../../hook/useInput.js'
import './Profile.css';


function Profile(props) {

   const user = useContext(CurrentUserContext);
   const name = useInput('', { isEmpty: true, minLength: 2, isName: true });
   const email = useInput('', { isEmpty: true, minLength: 3, maxLength: 30, isEmail: true });

   const disabledButton = (user.email === email.value && user.name === name.value) || !email.inputValid || !name.inputValid;

   const handleSubmit = (e) => {
      e.preventDefault()
      props.updateUser({
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
                     type='name' />
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
                     type='email' />
               </div>
               <p className="profile__error">{messageError(email)}</p>
            </label>
            <div className='profile__container-action'>
               <p className="profile__message">{props.message}</p>
               <button className={`profile__button-edit  ${disabledButton && 'profile__button-edit_disabled'}`} type='submit'
                  disabled={disabledButton}>
                  Редактировать</button>
               <button className='profile__button-exit' type='button'>
                  Выйти из аккаунта
               </button>
            </div>
         </form>
      </section>
   );
}

export default Profile;