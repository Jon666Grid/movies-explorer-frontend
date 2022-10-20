import './AboutMe.css'
import user_foto from '../../images/user_foto.jpeg';

function AboutMe() {
   return (
      <section className='about-me' id='about-me'>
         <h2 className='about-me__title'>Студент</h2>
         <div className='about-me__container'>
            <div className='about-me__wrapper-info'>
               <h3 className='about-me__name'>Евгений</h3>
               <p className='about-me__job'>Фронтенд-разработчик, 39 лет</p>
               <p className='about-me__description'>15&nbsp;лет работал категорийным менеджером в&nbsp;крупной торговой компании, имею опыт работать с&nbsp;большим количеством поставщиков и&nbsp;коллективом.
                  Решил сменить род деятельности и&nbsp;попробовать что-то новое, что мне интересно.
                  В&nbsp;данный момент заканчиваю обучение в&nbsp;Яндекс Практикуме по&nbsp;специальности Frontend разработка.</p>
                  <ul className='about-me__links'>
                     <li><a className="about-me__link" href="https://www.linkedin.com/in/evgeny-gridin-2aaba9249/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                     <li><a className="about-me__link" href="https://github.com/Jon666Grid/" target="_blank" rel="noreferrer">Github</a></li>
                     <li><a className="about-me__link" href="https://t.me/jon666Grid/" target="_blank" rel="noreferrer">Telegram</a></li>
                  </ul>
            </div>
            <img className='about-me__image' src={user_foto} alt='фото студента' />
         </div>
      </section>


   );
}

export default AboutMe;
