
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLandingSampleThunk } from '../../store/county.js';
import './home.css'

function Landing() {
 const dispatch = useDispatch();
 const counties = useSelector(state => state?.county);
const countyArray = Object.values(counties);
const offense = countyArray[0].Offense


    const [loaded, setLoaded] = useState(false);

      useEffect(() => {
        dispatch(fetchLandingSampleThunk()).then(() => setLoaded(true));
    }, [dispatch]);



    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }
    
    return (


        <div className='mainlanding'>

            <div className='headerlanding'>
                <h1>Objective Sentencing Data from the New Jersey Court System</h1>
                <h3>Explore sentencing trends by individual judges, counties, and crimes — built from scraped public records. Allowing individuals to do their own research and make up their own minds.</h3>
                <h3>Data from individual defense attornies / prosecutors in progress. Currently seeking seed funding / assistance to expand nationwide</h3>
            </div>


            <div className='randomCrime'></div>
            <h3>random crime spotlight {offense}</h3>
            {Object.values(counties).map(county => (
  <div key={county.id} className='countySampleLandingContainer'>
    <h4 className='countylandingHeader'>{county.County}</h4>
    <p>{county.Offense}</p>
  </div>
))}




        </div>








    )
}

export default Landing