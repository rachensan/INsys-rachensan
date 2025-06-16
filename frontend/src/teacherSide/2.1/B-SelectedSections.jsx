import React from 'react';
import { useState } from 'react';

/* //THIS IS FOR LISTING ONE-BY-ONE
function ListSections() {

    const [sectionList, setSectionList] = useState([]);

    const getSection = ()=> {
        const value = document.getElementById("myInputSection").value;
        setSectionList([...sectionList, value]);

        console.log("Input value:", value); //lagay nalang din sa list and database
        document.getElementById("myInputSection").value = ""; //clear the input holder
}

  return (
    <>
    <div>
        <input id={'myInputSection'} placeholder='INPUT ALL SECTIONS TO TAKE EXAMS HERE'></input>
        <button onClick={getSection}>Add Section</button>
    </div>
    <ul>
        {sectionList.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
    </>
  )
}

export default ListSections;

*/

function SelectedSections(props) {
  const sections = ["BSIT 3A", "BSIT 3B", "BSIT 2C"];

  const { selectedSections, setSelectedSections } = props;

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedSections(prev => [...prev, value]);
    } else {
      setSelectedSections(prev => prev.filter(section => section !== value));
    }
  };
  const savedSection = selectedSections;
  console.log(`Section selected: ${savedSection}`); //this is the data kung alin section na-select

  return (
    <>
    <div className='selectedSectionsDiv'>
      <h3>Select Sections:</h3>
      {sections.map((section, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              value={section}
              onChange={handleCheckboxChange}
              checked={selectedSections.includes(section)}
            />
            {section}
          </label>
        </div>
      ))}
      <div>
        <strong>Selected Sections:</strong>
        <ul>
          {selectedSections.map((section, i) => (
            <li key={i}>{section}</li>
          ))}
        </ul>
      </div>
    </div>
    </>
    
  );
}

export default SelectedSections;