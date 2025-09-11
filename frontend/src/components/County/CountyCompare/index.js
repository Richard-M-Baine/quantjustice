import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './countyCompare.css';

// thunks
import { fetchAllJudgesInCountyThunk } from '../../../store/judge';

import { Link, useParams } from 'react-router-dom';

function CountyCompare() {
  const dispatch = useDispatch();
  
    const { county, crimeId } = useParams();
  
  return (
    <div>
      <h1>ich mochte zu sterben</h1>
      <h2>{county}</h2>
      <h2>{crimeId}</h2>
    </div>
  );
}

export default CountyCompare;