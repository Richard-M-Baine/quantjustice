import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLandingSampleThunk } from '../../store/county.js';
import './home.css'

function Landing() {
    const dispatch = useDispatch();
    const [loaded, setLoaded] = useState(false);

    // Get the county data object from the Redux store
    const counties = useSelector(state => state?.county);
    const county1 = counties[0]



    useEffect(() => {
        dispatch(fetchLandingSampleThunk()).then(() => setLoaded(true));
    }, [dispatch]);

    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }

    // Convert the counties object into an array of values


    return (
        <div className='mainlanding'>
            <div className='headerlanding'>
                <h1>Objective Sentencing Data from the New Jersey Court System</h1>
                <h3>Explore sentencing trends by individual judges, counties, and crimes — built from scraped public records. Allowing individuals to do their own research and make up their own minds.</h3>
                <h3>Data from individual defense attornies / prosecutors in progress. Currently seeking seed funding / assistance to expand nationwide</h3>
            </div>

            <div className='randomCrimeSection'>
            <h3 className='randomcrimeheader'>random crime spotlight {county1.Offense}</h3>
               {counties.map((county, i) => (
    <div key={i} className="county-card">
      <h3>{county.County}</h3>
      <h4>total cases {county.TotalCasesYear}</h4> 
      <h4>average incarceration (in days) {county.AverageIncarcerationLength}</h4>
      <h4>average probation (in months) {county.AverageProbation}</h4>    
    </div>
  ))}

            </div>

        </div>
    );
}

export default Landing;