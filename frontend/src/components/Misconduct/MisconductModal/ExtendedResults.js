// SignUpForm.js
import React from 'react';


const ExtendedResults = (misconduct) => {
  const filler = misconduct.misconduct;

  return (
    <div className="extendedResultsModal">
      <h2>Misconduct Details</h2>
      <div className="details-container">
        {Object.entries(filler).map(([key, value]) => (
          <div key={key} className="detail-row">
            <span className="detail-label">{key}:</span>
            <span className="detail-value">{value || 'N/A'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ExtendedResults;
