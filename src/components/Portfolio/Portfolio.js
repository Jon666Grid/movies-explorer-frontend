import './Portfolio.css'

function Portfolio() {
   return (
      <section className='portfolio'>
         <h2 className='portfolio__title'>Портфолио</h2>
         <ul className='portfolio__items'>
            <li className='portfolio__item'>
               <a className='portfolio__link' href='https://jon666grid.github.io/how-to-learn/' target="_blank" rel="noreferrer">
                  Статичный сайт
               </a>
            </li>
            <li className='portfolio__item'>
               <a className='portfolio__link' href='https://jon666grid.github.io/russian-travel/index.html' target="_blank" rel="noreferrer">
                  Адаптивный сайт
               </a>
            </li>
            <li className='portfolio__item'>
               <a className='portfolio__link' href='https://jon666grid.github.io/mesto-react/' target="_blank" rel="noreferrer">
                  Одностраничное приложение
               </a>
            </li>
         </ul>
      </section>
   );
}

export default Portfolio;