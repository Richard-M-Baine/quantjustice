import { useSelector } from "react-redux";

function CompareCountiesSelection() {
  const selectedCountiesStore = useSelector(
    (state) => state.county.selectedCountiesStore || []
  );

  return (
  <div className="compare-containerSelection">
    <h2>Comparing Counties</h2>
    {selectedCountiesStore.length === 0 ? (
      <p>No counties selected yet.</p>
    ) : (
      <div className="counties-gridCompare">
        {selectedCountiesStore.map((c, i) => (
          <div key={i} className="county-cardCompare">
            <h3>{c.County}</h3>
            <p><strong>Offense:</strong> {c.Offense}</p>
            <p><strong>Avg Incarceration:</strong> {c.AverageIncarcerationLength}</p>
            <p><strong>Total Cases:</strong> {c.TotalCasesYear}</p>
            <p><strong>Median Sentence:</strong> {c.MedianSentence}</p>
            <p><strong>Avg Probation:</strong> {c.AverageProbation}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default CompareCountiesSelection;
