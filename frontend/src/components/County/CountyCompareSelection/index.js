import { useSelector } from "react-redux";

function CompareCountiesSelection() {
  const selectedCountiesStore = useSelector(
    (state) => state.county.selectedCountiesStore
  );

  return (
    <div>
      <h2>Comparing Counties</h2>
      <ul>
        {selectedCountiesStore.map((c, i) => (
        <li key={i}>
  <pre>{JSON.stringify(c, null, 2)}</pre>
</li>

        ))}
      </ul>
    </div>
  );
}

export default CompareCountiesSelection;
