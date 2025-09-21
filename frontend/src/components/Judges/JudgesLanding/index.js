import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJudgeSearchThunk } from '../../../store/judge';

import './JudgesLanding.css';

function JudgesLanding() {
  const dispatch = useDispatch();
  const judgeList = useSelector(state => state?.judge);
  const blah = judgeList[0]?.County
  console.log(blah, ' i am blah')
  console.log('i am judgeList ', judgeList)

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

    };

    // dispatch thunk with the searchGroup payload
    await dispatch(fetchJudgeSearchThunk(searchGroup));
    setSearched(true);
    setCurrentPage(0); // reset page on new search
  };

  const handleOffenseSubmit = async (e) => {
    e.preventDefault();

    const searchGroup = {

      offense

    };

    // dispatch thunk with the searchGroup payload
    await dispatch(fetchJudgeSearchThunk(searchGroup));
    setSearched(true);
    setCurrentPage(0); // reset page on new search
  };


  return (
    <div className="mainCountyLanding">


      <div>
        <h1 className="JudgesLandingH1Div">Search by name of judge </h1>
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


          <button type="submit">Search</button>
        </form>
      </div>

      <div>
        <form onSubmit={handleOffenseSubmit} className="judge-search-form">
          <div>
            <label>offense</label>
            <input
              type="text"
              value={offense}
              onChange={(e) => setOffense(e.target.value)}
            />
            <button type="submit">Search</button>
          </div>
        </form>
      </div>

      {searched && (
        <div className="results">
          {judgeList && judgeList.length > 0 ? (
            <ul>
              {judgeList.map((judge, idx) => (
                <li key={idx}>
                  {judge.Judge} — {judge.County}
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
