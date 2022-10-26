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