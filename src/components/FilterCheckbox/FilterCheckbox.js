import './FilterCheckbox.css';

function FilterCheckbox() {
   return (
      <div className='filter-checkbox'>
         <div className='filter-checkbox__container'>
            <label className='filter-checkbox_switch'>
               <input type='checkbox' />
               <span className='filter-checkbox__slider' />
            </label>
            <p className='filter-checkbox__text'>Короткометражки</p>
         </div>
      </div>

   );
}

export default FilterCheckbox;