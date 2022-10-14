import './App.css';
import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className='app'>
    <Header />
    {!true ? <Main /> : <Movies />}
    <Footer />
    </div>
  );
}

export default App;
