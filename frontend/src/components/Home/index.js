import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLandingSampleThunk } from '../../store/county.js';
import './home.css'

import image1 from '../../assets/counties.png';
import image2 from '../../assets/judgeLanding.png';
import image3 from '../../assets/slimeyLawyers.png';

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
                <h1>Why Quantitative Justice?</h1>
                <h3>Explore objective sentencing trends by individual judges, counties, and crimes — built from scraped public records. Allowing individuals to do their own research and make up their own minds.</h3>
                <h3>Data from individual defense attornies / prosecutors in progress. Instead of 3 vs 4.5 stars hire your attorney based on their outcomes compared to the state average.</h3>
            </div>

            <div className='meatlandingone'>
                <h2>Do certain counties over prosecute or have aberrations in sentencing?</h2>
                <h2>Do Public Defenders actually get worse outcomes compared to Private attornies?</h2>
                <p>using public records and scrapped data from open source background sites.  Quantitative Justice is interested in answering these questions with objective statistical data</p>
                <p>all data sets are free to download although names of defendents and identifying information of victims have both been anonymized.  We are not a background check site.</p>
            </div>

            <div className='outerDivRandomCrimeLanding'>
                <h3 className='randomcrimeheader'>random crime spotlight {county1.Offense}</h3>
                <div className='randomCrimeSectionLanding'>

                    {counties.map((county, i) => (
                        <div key={i} className="countyRandomCrimeLanding">
                            <h3>{county.County}</h3>
                            <h4>total cases {county.TotalCasesYear}</h4>
                            <h4>average incarceration (in days) {county.AverageIncarcerationLength}</h4>
                            <h4>average probation (in months) {county.AverageProbation}</h4>
                            <h4>percentage involving incarceration (in progress) and probation (in progress)</h4>
                        </div>
                    ))}

                </div>
            </div>

            <div className='linkSectionLandingDivMain'>
                <div className='countyLandingDiv'>
                    <h3>compare county sentencing with others.  Search prosecutorial and police misconduct records</h3>
                    <img src={image1} alt="two faced judge" style={{ width: '200px', height: 'auto' }} />
                </div>

                <div className='judgeLandingDiv'>
                    <h3>Compare individual judges sentencing data with each other</h3>
                    <img src={image2} alt="two faced judge" style={{ width: '200px', height: 'auto' }} />
                </div>

                <div className='attorneyLandingDiv'>
                    <h3>compare prosecutors / defense attorneys outcomes </h3>
                     <img src={image3} alt="two faced judge" style={{ width: '200px', height: 'auto' }} />
                </div>
            </div>

        </div>
    );
}

export default Landing;