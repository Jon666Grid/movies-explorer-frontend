import './Profile.css';

function Profile() {
   return (
      <section className='profile'>
         <form className='profile__form'>
            <h3 className='profile__title'>Привет, Евгений!</h3>
            <div className='profile__wrapper'>
               <p className='profile__text'>Имя</p>
               <input className='profile__input' value={'Евгений'} type='name'/>
            </div>
            <div className='profile__wrapper'>
               <p className='profile__text'>E-mail</p>
               <input className='profile__input' value={'jon666grid@yandex.ru'} type='email'/>
            </div>
            <button className='profile__button-edit' type='submit'>
               Редактировать</button>
            <button className='profile__button-exit' type='button' to='/'>
               Выйти из аккаунта
            </button>
         </form>
      </section>
   );
}

export default Profile;