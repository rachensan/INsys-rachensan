import { useState, useEffect } from "react";
import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";

import SelectField from "../../components/SelectFields";

export const SectionCard = () => {
  const [courseData, setCourseData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [yearLevel, setYearLevel] = useState("");

  const [formRegister, setFormRegister] = useState({});

  const { accessToken } = useAuth();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${accessToken}` }
    const config = {
      headers,
      withCredentials: true
    };

    //COURSE TABLE
    axios.get('/course/details', config) 
    // { course_id, course_code, course_name }
      .then((res) => {
        setCourseData(res.data)
      })
      .catch((err) => console.error("Failed to fetch sections:", err));

    //YEAR_LEVELS TABLE
    axios.get('/year-level/details', config) 
    // { year_level_id, year_number }
      .then((res) => {
        setYearData(res.data)
      })
      .catch((err) => console.error("Failed to fetch sections:", err));

  }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  return (
    <>
      <div className="section-card">
        {courseData.map((sd) => (
          <div key={sd.course_id}> 
            <p>{sd.course_code}:</p>

            <SelectField
              name="yearLevel"
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              options={yearData.map((yr) => ({
                label: `${yr.year_number} Year`,
                value: String(yr.year_number)
              }))}
            />


          </div>
        ))}
      </div>
    </>
  )
}



function SelectedSection() {
  const [sectionData, setSectionData] = useState({});
  const [year, setYear] = useState(""); //1, 2, 3, 4
  const [sections, setSections] = useState([]); //ABCD++
  const [addedSelections, setAddedSelections] = useState([]); 

  const { accessToken } = useAuth();


  return (
    <SectionCard />


    /* 
    <div>

      <div>
        <label>Course:</label>
        <select
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            setYear("");
            setSelectedSections([]);
          }}
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {course && (
        <div>
          <label>Year:</label>
          <select
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setSelectedSections([]);
            }}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y} Year</option>
            ))}
          </select>
        </div>
      )}

      {course && year && (
        <div>
          <label>Sections:</label>
          <div>
            {sections.map((section) => (
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

      {addedSelections.length > 0 && (
        <div>
          <h4>Selected:</h4>
          <ul>
            {addedSelections.map((item, idx) => (
              <li key={idx}>
                {item.course} {item.year} {item.section}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    */
  );
}

export default SelectedSection;