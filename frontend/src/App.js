import React from 'react';
import { Route, Routes } from 'react-router-dom';




// homepage stuff
import Landing from './components/Home';

// test stuff
import LandingTest from './components/Test';


function App() {







  return (
    <>


      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/test' element={<LandingTest/>} />
    
      </Routes>


    </>
  );
}

export default App;
