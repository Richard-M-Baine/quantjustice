import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountyCrimeSearchThunk } from '../../../store/county';
import './countySearch.css';

function CountySearch({ county, redirect = false }) {
  const dispatch = useDispatch();

  const countyList = useSelector(state => state?.county.countyCrimeResults ?? []);


  const [crime, setCrime] = useState('');
  const [sentence, setSentence] = useState('');
  const [probation, setProbation] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searched, setSearched] = useState(false);
  const resultsPerPage = 15;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const searchCrimeGroup = { county, crime, sentence, probation };

    try {
      await dispatch(fetchCountyCrimeSearchThunk(searchCrimeGroup));
      setSearched(true);
      setCurrentPage(0);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleReset = () => {
    setCrime('');
    setSentence('');
    setProbation('');
    setCurrentPage(0);
    setSearched(false);
  };

  const totalResults = countyList.length
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = currentPage * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = countyList.slice(startIndex, endIndex);

  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

  return (
    <div>
      <form className="countySearchForm" onSubmit={handleFormSubmit}>
        <div className="countySearchFormDiv">
          <label>Crime</label>
          <input type="text" value={crime} onChange={e => setCrime(e.target.value)} />
        </div>

        <div className="countySearchFormDiv">
          <label>Average Incarceration Length (days) above:</label>
          <input type="text" value={sentence} onChange={e => setSentence(e.target.value)} />
        </div>

        <div className="countySearchFormDiv">
          <label>Average probation sentence above:</label>
          <input type="text" value={probation} onChange={e => setProbation(e.target.value)} />
        </div>

        <div className="button-group">
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      <div className='results-section'>
        {!searched ? (
          <p>Enter search criteria above to find misconduct cases.</p>
        ) : totalResults === 0 ? (
          <p>No misconduct cases found matching your search criteria.</p>
        ) : (
          <>
            <div className="results-header">
              <p>
                Showing {startIndex + 1}-{Math.min(endIndex, totalResults)} of {totalResults} results
              </p>
            </div>

            <div className='groupsAllPart'>
              {currentResults.map((UniqueCrimeList, index) => (
                <div key={index}>{JSON.stringify(UniqueCrimeList)}</div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-controls">
                <button onClick={goToPrevPage} disabled={currentPage === 0}>Previous {resultsPerPage}</button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage >= totalPages - 1}>Next {resultsPerPage}</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default CountySearch;
