import { useEffect, useCallback, useState } from 'react';

export default function useWidth() {

const getSize = useCallback(() => window.innerWidth, []);
const [size, setSize] = useState(getSize());

useEffect(() => {
   const hanleResize = () => {
      setSize(getSize)
   };
   window.addEventListener('resize', resizeThrottler, false)
   let resizeTimeout;
   function resizeThrottler() {
      if (!resizeTimeout) {
         resizeTimeout = setTimeout(() => {
            resizeTimeout = null;
            hanleResize();
         }, 1000);
      }
   }
   return () => {
      window.removeEventListener('resize', hanleResize)
   };
}, [getSize]);

return size;
}