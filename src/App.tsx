import React from 'react';
import Header from "./components/Header";
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage'
import Gamepage from './pages/Gamepage'


function App() {
  return (
      <>
        <Header></Header>
          <Routes>
              <Route path='/' element={<Homepage/>}/>
              <Route path="/game/:id" element={<Gamepage/>} />
          </Routes>
      </>
  );
}

export default App;
