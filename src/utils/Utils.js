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

function checkMovies(data) {
   return data.filter(n => n.duration < 40);
}

export const filter = (data, search, check) => {
   const userMovies = (data).filter(n => {
      const movieRu = String(n.nameRU).toLowerCase().trim();
      const movieEn = String(n.nameEN).toLowerCase().trim();
      return movieRu.includes(search.toLowerCase()) || movieEn.includes(search.toLowerCase());
   });
   if (check) {
      return checkMovies(userMovies);
   } else {
      return userMovies;
   }
};