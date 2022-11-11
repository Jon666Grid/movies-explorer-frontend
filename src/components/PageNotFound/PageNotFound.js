import './PageNotFound.css';
import { useNavigate } from "react-router-dom";

function PageNotFound() {

   const navigate = useNavigate();

   return (
      <div className='not-found'>
         <h2 className='not-found__title'>404</h2>
         <p className='not-found__text'>Страница не найдена</p>
         <button className='not-found__button'
            onClick={() => navigate(-2)}
         >Назад</button>
      </div>
   );
}

export default PageNotFound;