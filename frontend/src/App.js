import React from 'react';
import { Route, Routes } from 'react-router-dom';




// homepage stuff
import Landing from './components/Home';


function App() {







  return (
    <>


      <Routes>
        <Route path='/' element={<Landing />} />
    
      </Routes>


    </>
  );
}

export default App;
