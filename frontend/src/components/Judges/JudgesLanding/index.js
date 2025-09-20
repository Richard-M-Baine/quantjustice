import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJudgeSearchThunk } from '../../../store/judge';

import './JudgesLanding.css';

function JudgesLanding() {
  const dispatch = useDispatch();
  const judgeList = useSelector(state => state?.judge);


  const [lastName, setLastName] = useState('');
  const [county, setCounty] = useState('');
  const [offense, setOffense] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searched, setSearched] = useState(false);

  const resultsPerPage = 15;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchGroup = {

      lastName,
      county,
      offense
    };

    // dispatch thunk with the searchGroup payload
    await dispatch(fetchJudgeSearchThunk(searchGroup));
    setSearched(true);
    setCurrentPage(0); // reset page on new search
  };

  return (
    <div className="mainCountyLanding">
      <h1 className="JudgesLandingH1Div">Judge Search</h1>

      <form onSubmit={handleSubmit} className="judge-search-form">
     
     
        <div>
          <label>Last Name</label>
          <input 
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
          />
        </div>

        <div>
          <label>County</label>
          <input 
            type="text"
            value={county}
            onChange={(e) => setCounty(e.target.value)} 
          />
        </div>

        <div>
          <label>Offense</label>
          <input 
            type="text"
            value={offense}
            onChange={(e) => setOffense(e.target.value)} 
          />
        </div>

        <button type="submit">Search</button>
      </form>

      {searched && (
        <div className="results">
          {/* render your judgeList results here */}
          {judgeList && judgeList.length > 0 ? (
            <ul>
              {judgeList.map((judge, idx) => (
                <li key={idx}>
                 {judge.lastName} — {judge.county}
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default JudgesLanding;
