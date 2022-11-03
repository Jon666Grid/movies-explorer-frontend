import { useState, useEffect } from 'react';

const useValidation = (value, validations) => {
   const [minLength, setMinLength] = useState(false);
   const [maxLength, setMaxLength] = useState(false);
   const [isEmpty, setEmpty] = useState(false);
   const [isEmail, setEmail] = useState(false);
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
               const re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm
               re.test(String(value).toLowerCase()) ? setEmail(false) : setEmail(true)
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
      inputValid
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
