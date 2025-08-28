import React from 'react'


import './home.css'

function Landing() {





    return (


        <div className='mainlanding'>

            <div className='headerlanding'>
                <h1>Objective Sentencing Data from the New Jersey Court System</h1>
                <h3>Explore sentencing trends by individual judges, counties, and crimes — built from scraped public records. Allowing individuals to do their own research and make up their own minds.</h3>
                <h3>Data from individual defense attornies / prosecutors in progress. Currently seeking seed funding / assistance to expand nationwide</h3>
            </div>


            <div className='randomCrime'></div>
            <h3>random crime spotlight</h3>
            <div className='countySampleLandingContainer'>
                <h4 className='countylandingHeader'>county1</h4>

            </div>
            <div className='countySampleLandingContainer'>
                <h4 className='countylandingHeader'>county2</h4>

            </div>
            <div className='countySampleLandingContainer'>
                <h4 className='countylandingHeader'>county3</h4>

            </div>



        </div>








    )
}

export default Landing