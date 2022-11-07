import { useState, useEffect } from 'react';

const useValidation = (value, validations) => {
   const [minLength, setMinLength] = useState(false);
   const [maxLength, setMaxLength] = useState(false);
   const [isEmpty, setEmpty] = useState(false);
   const [isEmail, setEmail] = useState(false);
   const [isName, setName] = useState(false);
   const [inputValid, setInputValid] = useState(false)

   useEffect(() => {
      for (const validation in validations) {
         switch (validation) {
            case 'minLength':
               value.length < validations[validation] ? setMinLength(true) : setMinLength(false)
               break;
            case 'isEmpty':
               value ? setEmpty(false) : setEmpty(true)
               break;
            case 'maxLength':
               value.length > validations[validation] ? setMaxLength(true) : setMaxLength(false)
               break;
            case 'isEmail':
               const res = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
               res.test(String(value).toLowerCase()) ? setEmail(false) : setEmail(true)
               break;
               case 'isName':
                  const rez = /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
                  rez.test(String(value).toLowerCase()) ? setName(false) : setName(true)
                  break;
            default:
               break;
         }
      }
   }, [value, validations])

   useEffect(() => {
      if (isEmpty || minLength || maxLength || isEmail) {
         setInputValid(false)
      } else {
         setInputValid(true)
      }
   }, [isEmpty, minLength, maxLength, isEmail])

   return {
      isEmpty,
      minLength,
      maxLength,
      isEmail,
      inputValid,
      isName
   }
}

export const useInput = (initialValue, validations) => {
   const [value, setValue] = useState(initialValue);
   const [isDirty, setDirty] = useState(false);
   const valid = useValidation(value, validations)

   const onChange = (e) => {
      setValue(e.target.value)
   }

   const onBlur = () => {
      setDirty(true)
   }

   return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid
   }
}

export const messageError = (item) => {
   if ((item).isDirty && (item).isEmpty) return 'Поле не может быть пустым';
   if ((item).isDirty && (item).minLength) return 'Некорректная длина';
   if ((item).isDirty && (item).maxLength) return 'Некорректная длина';
   if ((item).isDirty && (item).isName) return 'Некорректное Имя';
   if ((item).isDirty && (item).isEmail) return 'Некорректный емайл';
}
