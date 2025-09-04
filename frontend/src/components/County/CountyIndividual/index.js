import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";

import './individual.css';
import { fetchIndividualCountyJudgesThunk } from '../../../store/county';
import { fetchAllJudgesInCountyThunk } from '../../../store/judge';

function CountyIndividual() {
  const { county } = useParams();
  const dispatch = useDispatch();

  const compareData = useSelector(state => state.county.compareOneCountyData);
  const judges = useSelector(state => state.judges);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await dispatch(fetchIndividualCountyJudgesThunk(county));
      await dispatch(fetchAllJudgesInCountyThunk(county));
      setLoaded(true);
    }
    fetchData();
  }, [county, dispatch]);

  if (!loaded) {
    return <div className="loading">Loading {county} data...</div>;
  }

  return (
    <div className="mainCountyLanding">
      <h1>All about {county}</h1>

      {/* Section 1: CompareOneCountyDataThunk */}
      <section className="compare-one-county">
        <h2>Random Crime in {county}</h2>
        {compareData ? (
          <div className="crime-block">
            <h3>{compareData.randomCrime?.crimeName}</h3>
            <p>Average Sentence: {compareData.randomCrime?.average}</p>
            <p>Case Count: {compareData.randomCrime?.caseCount}</p>

            <h4>Judges Sentencing This Crime</h4>
            <div className="judge-cards">
              {compareData.judges?.map(judge => (
                <div key={judge.id} className="judge-card">
                  <h5>{judge.name}</h5>
                  <p>{judge.court}</p>
                  <Link to={`/judges/${judge.id}`} className="judge-link">
                    View Judge Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No crime data available for this county.</p>
        )}
      </section>

      {/* Section 2: List of Judges */}
      <section className="all-judges-section">
        <h2>⚖️ All Judges in {county}</h2>
        <div className="judges-grid">
          {judges.length > 0 ? (
            judges.map(judge => (
              <div key={judge.id} className="judge-card">
                <h4>{judge.name}</h4>
                <p>{judge.court}</p>
                <Link to={`/judges/${judge.id}`} className="judge-link">
                  View Judge Profile →
                </Link>
              </div>
            ))
          ) : (
            <p>No judges found for this county.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default CountyIndividual;
