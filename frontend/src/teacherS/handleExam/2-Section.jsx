function SelectedSection({ exam, setExam }) {

  const sectionList = {
    '1': ['A', 'B', 'C'], //'First Year' are keys
    '2': ['A', 'B', 'C'], //['A', 'B', 'C', 'D'] are values
    // '3': ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'],
    // '4': ['A', 'B', 'C'],
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedSections;

    if (checked) {
      updatedSections = [...exam.sections, value];
    } else {
      updatedSections = (exam.sections.filter(item => item !== value));
    }

    setExam(prev=>({
      ...prev,
      sections: updatedSections
    }))
  };

  const savedSections = exam.sections
  console.log(`Section selected: ${savedSections}`);

  return (
    <div style={{ border: "1px solid black", padding: "10px", backgroundColor: "pink" }}>
      <h3>Select Section</h3>
      {/* Object.entries(sectionsByYear) ==== ['First Year', ['A', 'B', 'C', 'D']], */}
      {Object.entries(sectionList).map(([year, sectionList], index) => (
        <div key={index}>
          <h4>{year}</h4>
          {sectionList.map((section) => {
            const fullValue = `${year}-${section}`; //ex: 3-J
            return (
              <label key={fullValue} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  value={fullValue}
                  checked={exam.sections.includes(fullValue)}
                  onChange={handleCheckboxChange}
                />
                {section}
              </label>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default SelectedSection;