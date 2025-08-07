import { useState } from "react";

const sectionData = {
  BSIT: {
    1: ["A", "B", "C", "D"],
    2: ["A", "B", "C"],
    3: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
    4: ["A", "B", "C"],
  },
  BSIS: {
    1: ["A", "B"],
    2: ["A", "B", "C"],
    3: ["A", "B", "C"],
    4: ["A"],
  },
  BSCS: {
    1: ["A"],
    2: ["A", "B"],
    3: ["A"],
    4: ["A"],
  },
};


function SelectedSection() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSections, setSelectedSections] = useState([]);
  const [addedSections, setAddedSections] = useState([]);

  const years = ["1", "2", "3", "4"];

  const handleAdd = () => {
    const newItems = selectedSections.map((section) => ({
      course: selectedCourse,
      year: selectedYear,
      section,
    }));
    setAddedSections((prev) => [...prev, ...newItems]);
    // Reset selections
    setSelectedCourse("");
    setSelectedYear("");
    setSelectedSections([]);
  };

  return (
    <div>
      <div>
        <label>Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => {
            setSelectedCourse(e.target.value);
            setSelectedYear("");
            setSelectedSections([]);
          }}
        >
          <option value="">Select Course</option>
          {Object.keys(sectionData).map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>

      {selectedCourse && (
        <div>
          <label>Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setSelectedSections([]);
            }}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year} Year
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCourse && selectedYear && (
        <div>
          <label>Sections:</label>
          <div>
            {sectionData[selectedCourse][selectedYear].map((section) => (
              <label key={section} style={{ marginRight: "1em" }}>
                <input
                  type="checkbox"
                  value={section}
                  checked={selectedSections.includes(section)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSections((prev) => [...prev, section]);
                    } else {
                      setSelectedSections((prev) =>
                        prev.filter((s) => s !== section)
                      );
                    }
                  }}
                />
                {section}
              </label>
            ))}
          </div>
          <button onClick={handleAdd}>Add Selection</button>
        </div>
      )}

      {addedSections.length > 0 && (
        <div>
          <h4>Selected:</h4>
          <ul>
            {addedSections.map((item, index) => (
              <li key={index}>
                {item.course} {item.year} {item.section}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


export default SelectedSection;