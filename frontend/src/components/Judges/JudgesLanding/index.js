import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";


import './JudgesLanding.css';

function JudgesLanding() {
  const dispatch = useDispatch();
  const judgeList = useSelector(state => state?.judge)


 const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [county, setCounty] = useState('');
  const [offense, setOffense] = useState('')
  const [currentPage, setCurrentPage] = useState(0);
  const [searched, setSearched] = useState(false);
  const resultsPerPage = 15;

  return (
    <div className="mainCountyLanding">
        <h1 className='JudgesLandingH1Div'>ich mochte zu sterben</h1>
    </div>
  );
}

export default JudgesLanding;
