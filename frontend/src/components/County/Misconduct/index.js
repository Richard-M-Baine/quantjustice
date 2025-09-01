import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import './misconduct.css';

function MisconductSearch() {
  const [rank, setRank] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [stateAbbreviation, setStateAbbreviation] = useState('');
  const [stateError, setStateError] = useState('');
  const [agency, setAgency] = useState('')

  // A simple list of valid state abbreviations
  const validStateAbbreviations = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const handleStateChange = (e) => {
    const value = e.target.value.toUpperCase(); // Convert to uppercase for consistency
    setStateAbbreviation(value);

    if (value.length > 2) {
      setStateError('State abbreviation must be 2 characters.');
    } else if (value.length > 0 && !validStateAbbreviations.includes(value)) {
      // This will only show an error if the user has typed a full, but invalid, abbreviation
      setStateError('Invalid state abbreviation.');
    } else {
      setStateError('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Final check before submission
    const isValidState = stateAbbreviation === '' || validStateAbbreviations.includes(stateAbbreviation);

    if (stateAbbreviation && !isValidState) {
      setStateError('Please enter a valid state abbreviation.');
      return; // Stop form submission
    }

    // You can add your form submission logic here
    console.log('Form submitted with:', {
      rank,
      firstName,
      lastName,
      stateAbbreviation
    });
  };

  return (
    <div className="MisconductSearchMain">
      <h1>Search Misconduct Cases</h1>
      <form onSubmit={handleFormSubmit}>

        <div className="form-glump">
          <label>Rank</label>
          <input
            type="text"
            id="rank"
            name="rank"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
          />
        </div>



        <div className="form-glump">
          <label>Officer First Name:</label>
          <input
            type="text"
            id="officerFirstName"
            name="officerFirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

        </div>



        <div className="form-glump">

          <label htmlFor="officerName">Officer Last Name:</label>
          <input
            type="text"
            id="OfficerlastName"
            name="OfficerlastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-glump">
          <label htmlFor="stateAbbreviation">State (abbreviation)</label>
          <input
            type="text"
            id="stateAbbreviation"
            name="stateAbbreviation"
            value={stateAbbreviation}
            onChange={handleStateChange}
            maxLength="2" // Limit input to 2 characters
          />
          {stateError && <p className="error-message">{stateError}</p>}
        </div>

        <div className="form-glump">

          <label htmlFor="officerName">Department / Agency</label>
          <input
            type="text"
            id="agency"
            name="agency"
            value={agency}
            onChange={(e) => setAgency(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={!!stateError} // Disable button if there's an error
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default MisconductSearch;