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
  const [timeDate, setTimeDate] = useState([]);

  const { examId } = useParams();
  const { accessToken } = useAuth();
  const headers = { Authorization: `Bearer ${accessToken}` }
  const config = { headers, withCredentials: true };

  //calculate end date/time whenever inputs change
  useEffect(() => {
    if (!startDate || !startTime) return;

    const [hours, minutes] = startTime.split(":").map(Number);
    const start = new Date(startDate); //start.toISOString()
    start.setHours(hours, minutes, 0, 0);

    setStartDateTime(start.toLocaleString()); 
    setStartDateTimeISO(start.toISOString()); 

    const end = new Date(start);
    end.setHours(end.getHours() + Number(durationHours));
    end.setMinutes(end.getMinutes() + Number(durationMinutes));
    
    setEndDateTime(end.toLocaleString());
    setEndDateTimeISO(end.toISOString());

    //for backend convertion hrs to mins 
    const totalMinutes = Number(durationHours) * 60 + Number(durationMinutes);


                    console.log({
                      scheduledDate: start.toISOString(),
                      addTimerQuestion: totalMinutes,
                    });

  }, [startDate, startTime, durationHours, durationMinutes, accessToken]);
  
  const handleSave = async () => {
    if (!startDate || !startTime) {
      console.error("Missing data to save schedule");
      return;
    }

    const [hours, minutes] = startTime.split(":").map(Number);
    const start = new Date(startDate);
    start.setHours(hours, minutes, 0, 0);

    const totalMinutes = Number(durationHours) * 60 + Number(durationMinutes);

    try {
      await axios.put(`/exams/${examId}/schedule`, {
        scheduledDate: start.toISOString(),
        addTimerQuestion: totalMinutes,
      }, config);
      console.log("Saved schedule!");
    } catch (err) {
      console.error("Error saving schedule:", err);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <button onClick={handleSave}>Save Schedule</button>
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