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
import CountyCompare from './components/County/CountyCompare/index.js'
import CompareCountiesSelection from './components/County/CountyCompareSelection/index.js'

// navbar stuff
import NavBar from './components/NavBar/index.js'

// judge stuff

import CompareJudgesSelection from './components/Judges/JudgesCountyCompare/index.js'

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
        <Route path='/county/compare/:county/:crimeId' element={<CountyCompare/>} />
        <Route path='/county/compare/selection' element={<CompareCountiesSelection />} />
        <Route path='/misconduct' element={<MisconductSearch/>} />
        <Route path='/judges/compare/selection' element={<CompareJudgesSelection />} />
    
      </Routes>


    </>
  );
}

export default App;
