export const getTimeFromMins = (mins) => {
   let hours = Math.trunc(mins / 60);
   let minutes = mins % 60;
   if (hours === 0) {
      return minutes + 'м ';
   } else if (minutes === 0) {
      return hours + 'ч ';
   } else {
      return hours + 'ч ' + minutes + 'м ';
   }
};

export const filter = (data, item) => { 
   return (data).filter(n => {
   const movieRu = String(n.nameRU).toLowerCase().trim();
   const movieEn = String(n.nameEN).toLowerCase().trim();
   return movieRu.includes(item.toLowerCase()) || movieEn.includes(item.toLowerCase());
})};