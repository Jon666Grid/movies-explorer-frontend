import './Footer.css'

function Footer() {
   return (
<footer className='footer'>
   <h3 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
   <div className='footer__container'>
      <div className="footer__copyright">&copy; 2022</div>
      <nav className='footer__nav'>
         <ul className='footer__nav-items'>
            <li>
            <a className="footer__link" href='https://practicum.yandex.ru/web/' target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            </li>
            <li>
            <a className='footer__link' href='https://github.com/Jon666Grid/' target="_blank" rel="noreferrer">Github</a>
            </li>
         </ul>
      </nav>
   </div>
</footer>
   );
}

export default Footer;