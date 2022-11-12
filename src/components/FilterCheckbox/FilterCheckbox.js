import { useState, useEffect } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox({check , checkMovies}) {

   const [checked, setChecked] = useState(false);

   const chengeCheckbox = () => {
      setChecked(!checked);
      checked ? check(false) : check(true);
   }

   useEffect (() => {
      setChecked(checkMovies)
   },[checkMovies])

   return (
      <div className='filter-checkbox'>
         <div className='filter-checkbox__container'>
            <label className='filter-checkbox_switch'>
               <input type='checkbox' 
               checked={checked}
               onChange={chengeCheckbox}
               />
               <span className='filter-checkbox__slider' />
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
         </div>
      </div>

   );
}

export default FilterCheckbox;