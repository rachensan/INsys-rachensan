import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";

import SelectField from "../../components/SelectFields";
import CheckboxDropdown from "../../components/Checkbox_Dropdown";
import Button from "../../components/Buttons";

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

//=====================================================//
function SelectedSection() {
  const [sectionData, setSectionData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSections, setSelectedSections] = useState([]); // IDs from form
  const [dbSections, setDbSections] = useState([]); // Fetched from DB
  const { accessToken } = useAuth();
  const { examId } = useParams();

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

  // Save/Add Section handler
  const handleSaveSections = async () => {
    if (!selectedCourse || !selectedYear || selectedSections.length === 0) {
      alert("Please select course, year, and at least one section.");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${accessToken}` }
      const config = { headers, withCredentials: true };

      const sectionTakers = sectionOptions
        .filter(s => selectedSections.some(sel => sel.id === s.section_id))
        .map(s => ({ id: s.section_id, name: s.section_name }));
console.log("sectionOptions:", sectionOptions);
console.log("selectedSections:", selectedSections);
console.log("sectionTakers:", sectionTakers);

      await axios.put(`/exams/${examId}/sections`, { sections: sectionTakers }, config);
      const updated = await axios.get(`/exams/${examId}/sections`, config);  
      setDbSections(updated.data); // Keep DB state separate

      alert("Sections saved successfully!");
    } catch (err) {
      if (err.response?.status === 404) {
        console.warn("No sections assigned yet");
        setDbSections([]);
      } else {
        console.error("Error fetching sections:", err);
      }
    }
  };

  return (
    <div>
      <SelectField
        name="course"
        value={selectedCourse}
        onChange={(e) => {
          setSelectedCourse(e.target.value);
          setSelectedYear("");
          setSelectedSections([]);
        }}
        options={courseOptions}
      />
      <SelectField
        name="year"
        value={selectedYear}
        onChange={(e) => {
          setSelectedYear(Number(e.target.value));
          setSelectedSections([]);
        }}
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

      <Button
        label="Save Sections"
        disabled={!selectedCourse || !selectedYear || selectedSections.length === 0}
        onClick={handleSaveSections}
      />
    </div>
  );
}


export default SelectedSection;