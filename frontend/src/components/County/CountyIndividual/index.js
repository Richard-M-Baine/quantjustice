
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";

import './individual.css';
import { fetchIndividualCountyJudgesThunk } from '../../../store/county';
import { fetchAllJudgesInCountyThunk } from '../../../store/judge';

function CountyIndividual() {
  const { county } = useParams();
  const dispatch = useDispatch();

  const compareData = useSelector(state => state.county?.[0]?.countyData || []);
  const totalCrimeLanding = useSelector(state => state.county?.[1]?.totalCrime || {});
  const judges = useSelector(state => state.judge || []);

  const [loaded, setLoaded] = useState(false);
  const [judgesVisible, setJudgesVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchIndividualCountyJudgesThunk(county));
      await dispatch(fetchAllJudgesInCountyThunk(county));
      setLoaded(true);
    }
    fetchData();
  }, [county, dispatch]);

  const toggleJudges = () => {
    setJudgesVisible(!judgesVisible);
  };

  if (!loaded) {
    return <div className="loading">Loading {county} County data...</div>;
  }

  return (
    <div className="mainCountyLanding">
      {/* Main Content Area */}
      <div className="content-left">
        <h1>All About {county} County</h1>

           {/* Hero Section with Call-to-Action */}
        <section className="county-hero">
          <div className="hero-content">
            <h2>Search Specific County Data</h2>
            <p>
              Compare sentencing patterns from {county} county with other ccounties.  Explore 
              how different judges handle cases in {county} County.
            </p>
            
            <Link 
              to={`/county/${county}/compare`} 
              className="cta-button"
            >
              🔍 Compare Crimes & Judges
            </Link>
          </div>
          </section>

        {/* Section 1: CompareOneCountyDataThunk */}
        <section className="compare-one-county">
          <h2>Featured Crime Analysis</h2>
          {compareData ? (
            <div className="crime-block">
              <h4>Random Spotlight</h4>
              <h3>{totalCrimeLanding.Offense}</h3>
              <p><strong>Average Sentence Statewide (in days): </strong> {totalCrimeLanding.AverageIncarcerationDays}</p>
              <p><strong>Average probation Sentence Statewide (in months):</strong> {totalCrimeLanding.AverageProbationMonth}</p>
              <p><strong>Total Cases Statewide:</strong> {totalCrimeLanding.TotalCasesDays}</p>
              <div className="judge-cards">
                {compareData?.map(judge => (
                  <div key={judge.id} className="judge-card">
                    <h5>{judge.Judge}</h5>
                    <p>Average Incarceration (in days) {judge.AverageIncarcerationYear}</p>
                    <p>total sentences by judge {judge.TotalCasesYear}</p>
                    <p>average probation for crime (in months) {judge.AverageProbationMonth}</p>
                    <Link to={`/judges/${judge.id}`} className="judge-link">
                      View Judge Profile →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No crime data available for {county} County at this time.</p>
          )}
        </section>
      </div>

      {/* Sidebar positioned outside content-left to align with the right edge */}
      <aside className="judges-sidebar">
        <button
          className="judges-toggle-btn"
          onClick={toggleJudges}
          aria-expanded={judgesVisible}
        >
          {judgesVisible ? '← Hide' : `⚖️ Display All Judges in ${county}`}
          {judgesVisible ? '' : ' County'}
        </button>
        <div className={`judges-content ${judgesVisible ? '' : 'collapsed'}`}>
          <h2>List of Judges</h2>
          <div className="judges-grid">
            {judges.length > 0 ? (
              judges.map(judge => (
                <div key={judge.id} className="judge-card">
                  <h4>{judge.Judge}</h4>
                  <Link to={`/judges/${judge.Judge}`} className="judge-link">
                    Search Judge's sentencing data →
                  </Link>
                </div>
              ))
            ) : (
              <p>No judges found for {county} County.</p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

export default CountyIndividual;
