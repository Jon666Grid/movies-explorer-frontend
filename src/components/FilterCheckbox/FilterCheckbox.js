import { useState, useEffect } from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {

   const [checked, setChecked] = useState(false);
   const [items, setItems] = useState(JSON.parse(localStorage.getItem('itemChecked')));
   localStorage.setItem('itemChecked', JSON.stringify(items));

   const chengeCheckbox = () => {
      setChecked(!checked);
      setItems(!checked);
      checked ? props.checkout(true) : props.checkout(false);
   }

   useEffect(() => {
      setChecked(items);
   }, [items])

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