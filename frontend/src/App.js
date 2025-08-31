import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';




// homepage stuff
import Landing from './components/Home';

// test stuff
import LandingTest from './components/Test';

// county stuff
import CountyLanding from './components/County/CountyLanding';

// navbar stuff
import NavBar from './components/NavBar/index.js'

function App() {

const location = useLocation()





  return (
    <>

     {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/test' element={<LandingTest/>} />
        <Route path='/county' element={<CountyLanding/>} />
    
      </Routes>


    </>
  );
}

export default App;
