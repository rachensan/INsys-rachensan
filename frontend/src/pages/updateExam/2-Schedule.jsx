import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const TimePickerComponent = ({ value, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '120px' }}>
      <TimePicker
        value={value}
        onChange={onChange}
        disableClock={true}
        clearIcon={null}
      />
    </div>
  );
};


function ScheduledTakers() {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [durationHours, setDurationHours] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState(0);

  //LocaleString display-friendly version
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
    //toLocaleString() === 8/12/2025, 9:15:00 AM

  //ISO format for DB
  const [startDateTimeISO, setStartDateTimeISO] = useState("");
  const [endDateTimeISO, setEndDateTimeISO] = useState("");
    //.toISOString() === 2025-08-12T01:15:00.000Z

  //calculate end date/time whenever inputs change
  useEffect(() => {
    if (!startDate || !startTime) return;

    const [hours, minutes] = startTime.split(":").map(Number);
    const start = new Date(startDate);
    start.setHours(hours, minutes, 0, 0);

    setStartDateTime(start.toLocaleString()); 
    setStartDateTimeISO(start.toISOString()); 

    const end = new Date(start);
    end.setHours(end.getHours() + Number(durationHours));
    end.setMinutes(end.getMinutes() + Number(durationMinutes));
    
    setEndDateTime(end.toLocaleString());
    setEndDateTimeISO(end.toISOString());
  }, [startDate, startTime, durationHours, durationMinutes]);


  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ width: "140px" }}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <TimePickerComponent
            value={startTime}
            onChange={setStartTime}
            label="Start Time"
          />
        </div>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Duration:</label>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
          <input
            type="number"
            min="0"
            value={durationHours}
            onChange={(e) => setDurationHours(e.target.value)}
            style={{ width: "50px" }}
          />
          <span>h</span>
          <input
            type="number"
            min="0"
            max="59"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            style={{ width: "50px" }}
          />
          <span>m</span>
        </div>
      </div>





      <div className="scheduled-takers-div">
        <div>
          Start Date/Time: {startDateTime || "—"}
        </div>
        <div>
          End Date/Time: {endDateTime || "—"}
        </div>
      </div>
      
    </div>
  );
}

export default ScheduledTakers;