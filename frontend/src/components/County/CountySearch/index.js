import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';


import './countySearch.css'
import { fetchCountyCrimeSearchThunk } from '../../../store/county';

function CountySearch() {
  const dispatch = useDispatch()
  const {county} = useParams()

  const [crime, setCrime] = useState('')
  const [sentence, setSentence] = useState('')
  const [probation, setProbation] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const searchCrimeGroup = {
      county: county,
      crime: crime,
      sentence: sentence,
      probation: probation
    }
    console.log('look at me inside function')
    await dispatch(fetchCountyCrimeSearchThunk(searchCrimeGroup))
  }

  return (
    <div className="CountySearchMain">
      <h1>First search for a specifc crime or other criteria. Then you can compare the county to other counties and specific judges in county with each other</h1>
      <form className="countySearchForm" onSubmit={handleFormSubmit}>

        <div className="countySearchFormDiv">
          <label>Crime</label>
          <input
            type="text"
            id="CountycrimeSearch"
            name="CountycrimeSearch"
            value={crime}
            onChange={(e) => setCrime(e.target.value)}
          />
        </div>

        <div className="countySearchFormDiv">
          <label>Average Incarceration Length (days) above:</label>
          <input
            type="text"
            id="CountyCrimeDays"
            name="CountyCrimeDays"
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label htmlFor="officerName">Average probation sentence above:</label>
          <input
            type="text"
            id="CountyCrimeProbation"
            name="CountyCrimeProbation"
            value={probation}
            onChange={(e) => setProbation(e.target.value)}
          />
        </div>



        <div className="button-group">
          <button
            type="submit"

          >
            Search
          </button>

        </div>
      </form>


    </div>

  );
}

export default CountySearch;