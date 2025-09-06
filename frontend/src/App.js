import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';




// homepage stuff
import Landing from './components/Home';

// test stuff
import LandingTest from './components/Test';

// county stuff
import CountyLanding from './components/County/CountyLanding';
import MisconductSearch from './components/Misconduct/Misconduct/index.js';
import CountyIndividual from './components/County/CountyIndividual/index.js'
import CountySearch from './components/County/CountySearch/index.js'

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
        <Route path='/county/:county' element={<CountyIndividual/>} />
        <Route path='/county/:county/compare' element={<CountySearch/>} />
        <Route path='/misconduct' element={<MisconductSearch/>} />
    
      </Routes>


    </>
  );
}

export default App;
