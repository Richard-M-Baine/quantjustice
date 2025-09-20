import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { fetchCountyLandingSampleThunk } from '../../store/county.js';
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
        dispatch(fetchCountyLandingSampleThunk()).then(() => setLoaded(true));
    }, [dispatch]);

    if (!loaded) {
        return <p>wait a bloody minute...</p>;
    }

    // Convert the counties object into an array of values


    return (
        <div className='mainlanding'>

            <h1 >
                Why Quantitative Justice?
            </h1>

            <p >
                Explore objective sentencing trends by individual judges, counties, and crimes — built from scraped public records.
            </p>

            <p >
                Allowing individuals to do their own research and make up their own minds.
            </p>

            <div >
                <p >
                    📊 Outcomes of individual defense attorneys & prosecutors compared to their peers
                </p>
                <p >
                    Instead of 4 vs 4.5 stars, or word of mouth, hire your attorney based on their prior results.
                </p>


                {/* Key Questions Section */}
                <div >
                    <div >
                        <div>
                            <h2 >
                                Critical Questions We Answer
                            </h2>

                            <div >
                                <div >
                                    <div >

                                    </div>
                                    <div>
                                        <h3 >
                                            Do certain counties over-prosecute or have aberrations in sentencing?
                                        </h3>
                                    </div>
                                </div>

                                <div >
                                    <div >

                                    </div>
                                    <div>
                                        <h3 >
                                            Do Public Defenders actually get worse outcomes compared to Private attorneys?
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div >
                            <div >

                                <h3 >Our Methodology</h3>
                            </div>

                            <div >
                                <p>Using public records and scraped data from verified records, Quantitative Justice answers these questions with objective statistical data.</p>

                                <div >
                                    <p >🔓 Open Data Policy</p>
                                    <p >
                                        All datasets are free to download. Names of defendants and identifying information of victims have been anonymized. We are not a background check site.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='outerDivRandomCrimeLanding'>
                    <h3 className='randomcrimeheader'>random crime spotlight {county1.Offense}</h3>
                    <div className='randomCrimeSectionLanding'>

                        {counties.map((county, i) => (
                            <div key={i} className="countyRandomCrimeLanding">
                                <h3>{county.County}</h3>
                                <h4>total cases {county.TotalCasesYear}</h4>
                                <h4>
                                    average incarceration (in days) {Number(county.AverageIncarcerationLength).toFixed(2)}
                                </h4>
                                <h4>
                                    average probation (in months) {Number(county.AverageProbation).toFixed(2)}
                                </h4>
                                <h4>
                                    percentage involving incarceration (in progress) and probation (in progress)
                                </h4>
                            </div>

                        ))}

                    </div>
                </div>

                <div className="linkSectionLandingDivMain">
                    <Link to="/county" className="linkSectionLandingDiv">
                        <h3>Compare county sentencing with others.  Search misconduct records.</h3>

                        <img src={image1} alt="two faced judge" />
                    </Link>

                    <Link to="/judges" className="linkSectionLandingDiv">
                        <h3>Compare individual judges sentencing data</h3>
                        <img src={image2} alt="two faced judge" />
                    </Link>

                    <Link to="/attorney-comparison" className="linkSectionLandingDiv">
                        <h3>Compare prosecutors / defense attorneys outcomes</h3>
                        <img src={image3} alt="two faced judge" />
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Landing;