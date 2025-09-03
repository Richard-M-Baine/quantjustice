import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";

import './individual.css';
import { CompareOneCountyThunk } from '../../../store/county';

function CountyIndividual() {
  const { county } = useParams();
  const dispatch = useDispatch();
  
  // State for the three main features
  const [selectedCrime, setSelectedCrime] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(''); // 'counties' or 'judges'

  const [isLoading, setIsLoading] = useState(false);

  
  useEffect(() => {
    
  }, [county, dispatch]);

  const handleCrimeSearch = async (crimeType) => {
    setIsLoading(true);
    setSelectedCrime(crimeType);
    // Dispatch your search thunk here
    // const results = await dispatch(searchCrimeDataThunk(county, crimeType));
    // setSearchResults(results);
    setIsLoading(false);
  };

  const handleComparison = (mode) => {
    if (!selectedCrime) {
      alert('Please search for a crime first!');
      return;
    }
    setComparisonMode(mode);
    // Dispatch comparison thunk based on mode
    if (mode === 'counties') {
      // dispatch(compareCountiesThunk(county, selectedCrime));
    } else if (mode === 'judges') {
      // dispatch(compareJudgesThunk(county, selectedCrime));
    }
  };

  return (
    <div className="mainCountyLanding">
      <h1>All about {county}</h1>
      
      {/* Section 1: Crime Search */}
      <section className="crime-search-section">
        <h2>First Search for a specific crime.  Then you can compare the county with other counties and compare judge sentencing</h2>
        <div className="crime-buttons">
          <button onClick={() => handleCrimeSearch('theft')}>Theft</button>
          <button onClick={() => handleCrimeSearch('assault')}>Assault</button>
          <button onClick={() => handleCrimeSearch('drug')}>Drug Offenses</button>
          <button onClick={() => handleCrimeSearch('dui')}>DUI</button>
          {/* Add more crime types as needed */}
        </div>
        
        {isLoading && <div className="loading">Loading crime data...</div>}
        
        {searchResults && (
          <div className="search-results">
            <h3>Results for {selectedCrime} in {county}</h3>
            {/* Display your search results here */}
            <div className="results-summary">
              {/* Average sentence, case count, etc. */}
            </div>
          </div>
        )}
      </section>

      {/* Section 2: Comparison Tools */}
      {selectedCrime && (
        <section className="comparison-section">
          <h2>📊 Compare Sentencing Patterns</h2>
          <div className="comparison-buttons">
            <button 
              onClick={() => handleComparison('counties')}
              className={comparisonMode === 'counties' ? 'active' : ''}
            >
              Compare with Other Counties
            </button>
            <button 
              onClick={() => handleComparison('judges')}
              className={comparisonMode === 'judges' ? 'active' : ''}
            >
              Compare Judges in {county}
            </button>
          </div>
          
          {comparisonMode && (
            <div className="comparison-results">
              {comparisonMode === 'counties' ? (
                <div className="county-comparison">
                  <h3>{county} vs Other Counties - {selectedCrime}</h3>
                  {/* Charts, tables, or cards showing comparison */}
                </div>
              ) : (
                <div className="judge-comparison">
                  <h3>Judge Sentencing Patterns in {county} - {selectedCrime}</h3>
                  {/* Judge comparison data */}
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* Section 3: Judges List */}
      <section className="judges-section">
        <h2>⚖️ Judges in {county}</h2>
        <div className="judges-grid">
          {judges.length > 0 ? (
            judges.map(judge => (
              <div key={judge.id} className="judge-card">
                <h4>{judge.name}</h4>
                <p>{judge.court}</p>
                <p>Cases handled: {judge.caseCount}</p>
                <Link to={`/judges/${judge.id}`} className="judge-link">
                  View Judge Profile →
                </Link>
              </div>
            ))
          ) : (
            <div className="no-judges">
              <p>Loading judges data...</p>
              {/* Or show placeholder cards */}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default CountyIndividual;