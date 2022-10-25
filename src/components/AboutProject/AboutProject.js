import './AboutProject.css';

function AboutProject() {
   return (
      <section className='about-project' id='about-project'>
         <h2 className='about-project__title'>О проекте</h2>
         <div className='about-project__container'>
            <div className='about-project__wrapper'>
               <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
               <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
            </div>
            <div className='about-project__wrapper'>
               <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
               <p className='about-project__text'>У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            </div>
            <div className='about-project__time'>
               <div className='about-project__time-info'>
                  <h4 className='about-project__time-title'>1 неделя</h4>
                  <p className='about-project__time-subtitle'>Back-end</p>
               </div>
               <div className='about-project__time-info'>
                  <h4 className='about-project__time-title about-project__time-title_color'>4 недели</h4>
                  <p className='about-project__time-subtitle'>Front-end</p>
               </div>
            </div>
      </section>
   );
}

export default AboutProject;
