import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './countySearch.css'

function CountySearch() {

  const handleFormSubmit = () => {
    return null
  }

  return (
    <div className="MisconductSearchMain">
      <h1>First search for a crime or related attributes. Then you can compare the county to other counties and specific judges in county with each other</h1>
      <form onSubmit={handleFormSubmit}>

        <div className="form-glump">
          <label>Rank</label>
          <input
          // type="text"
          // id="rank"
          // name="rank"
          // value={rank}
          // onChange={(e) => setRank(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label>Officer First Name:</label>
          <input
          // type="text"
          // id="officerFirstName"
          // name="officerFirstName"
          // value={firstName}
          // onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label htmlFor="officerName">Officer Last Name:</label>
          <input
          // type="text"
          // id="OfficerlastName"
          // name="OfficerlastName"
          // value={lastName}
          // onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label htmlFor="stateAbbreviation">State (abbreviation)</label>
          <input
          // type="text"
          // id="stateAbbreviation"
          // name="stateAbbreviation"
          // value={stateAbbreviation}
          // onChange={handleStateChange}
          // maxLength="2" // Limit input to 2 characters
          />
      
        </div>

        <div className="form-glump">
          <label htmlFor="officerName">Department / Agency</label>
          <input
          // type="text"
          // id="agency"
          // name="agency"
          // value={agency}
          // onChange={(e) => setAgency(e.target.value)}
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