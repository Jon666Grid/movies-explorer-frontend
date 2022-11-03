import { useState, useEffect } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {

   const [checked, setChecked] = useState(JSON.parse(localStorage.getItem('itemChecked')) || false);
   localStorage.setItem('itemChecked', JSON.stringify(checked));

   const chengeCheckbox = () => {
      setChecked(!checked);
      checked ? props.checkout(true) : props.checkout(false);
   }

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