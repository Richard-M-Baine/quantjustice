import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './countyCompare.css';

// thunks
import { fetchAllJudgesInCountyThunk } from '../../../store/judge';
import { fetchCountyCrimeDataThunk } from '../../../store/county'
import { Link, useParams } from 'react-router-dom';

function CountyCompare() {
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false)
  
    const { county, crimeId } = useParams();

      useEffect(() => {
        async function fetchData() {
          await dispatch(fetchCountyCrimeDataThunk(county, crimeId));
          await dispatch(fetchAllJudgesInCountyThunk(county));
          setLoaded(true);
        }
        fetchData();
      }, [county, crimeId, dispatch]);
  
  return loaded && (
    <div>
      <h1>ich mochte zu sterben</h1>
      <h2>{county}</h2>
      <h2>{crimeId}</h2>
    </div>
  );
}

export default CountyCompare;