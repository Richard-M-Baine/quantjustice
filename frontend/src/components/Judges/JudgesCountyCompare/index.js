import { useSelector } from "react-redux";

function CompareJudgesSelection() {
  const selectedJudgesStore = useSelector(
    (state) => state.county.selectedJudgesStore
  );

  return (
    <div>
      <h2>Comparing Judges</h2>
      <ul>
        {selectedJudgesStore.map((j, i) => (
           <li key={i}>
  <pre>{JSON.stringify(j, null, 2)}</pre>
</li>
        ))}
      </ul>
    </div>
  );
}

export default CompareJudgesSelection;
