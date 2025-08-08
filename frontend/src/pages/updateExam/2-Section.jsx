import { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";

import SelectField from "../../components/SelectFields";
import CheckboxDropdown from "../../components/Checkbox_Dropdown";

export const SectionCard = ({ sd, yearLevel, addedSelections, setAddedSelections }) => {
  const [sections, setSections] = useState([]);

  // Fetch all sections once
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await axios.get("/api/sections/year-section");
        setSections(res.data); // assumes [{section_id, section_name, course_id, year_number}, ...]
      } catch (err) {
        console.error("Error fetching sections:", err);
      }
    };
    fetchSections();
  }, []);

  // Handler for checkbox toggle
  const handleCheckbox = (sectionId) => {
    setAddedSelections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId) // remove
        : [...prev, sectionId] // add
    );
  };

  return (
    <div className="section-card">
      {sections
        .filter(
          (sec) =>
            sec.course_id === sd.course_id &&
            sec.year_number === Number(yearLevel)
        )
        .map((sec) => (
          <label key={sec.section_id}>
            <input
              type="checkbox"
              checked={addedSelections.includes(sec.section_id)}
              onChange={() => handleCheckbox(sec.section_id)}
            />
            {sec.section_name}
          </label>
        ))}
    </div>
  );
}


function SelectedSection() {
  const [sectionData, setSectionData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSections, setSelectedSections] = useState([]); // now an array
  const { accessToken } = useAuth();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${accessToken}` };
    axios
      .get("/sections/year-section", { headers, withCredentials: true })
      .then((res) => setSectionData(res.data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, [accessToken]);

  const courseOptions = [...new Set(sectionData.map(d => d.course_code))]
    .map(c => ({ label: c, value: c }));

  const yearOptions = [...new Set(sectionData
    .filter(d => d.course_code === selectedCourse)
    .map(d => d.year_number)
  )].map(y => ({ label: `${y} Year`, value: y }));

  const sectionOptions = sectionData
    .filter(d => d.course_code === selectedCourse && d.year_number === selectedYear);

  const handleCheckbox = (sectionId) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div>
      <SelectField
        name="course"
        value={selectedCourse}
        onChange={(e) => { setSelectedCourse(e.target.value); setSelectedYear(""); setSelectedSections([]); }}
        options={courseOptions}
      />
      <SelectField
        name="year"
        value={selectedYear}
        onChange={(e) => { setSelectedYear(Number(e.target.value)); setSelectedSections([]); }}
        options={yearOptions}
        disabled={!selectedCourse}
      />

      <CheckboxDropdown
        options={sectionOptions.map((s) => ({
          value: s.section_id,
          label: s.section_name,
        }))}
        selected={selectedSections}
        onChange={setSelectedSections}
        placeholder="Select sections"
        disabled={!selectedYear}
      />
    </div>
  );
}

export default SelectedSection;