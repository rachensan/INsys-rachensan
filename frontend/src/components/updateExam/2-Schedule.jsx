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
        class="time_picker"
      />
    </div>
  );
};


function ScheduledTakers({ setStartDateTime, setEndDateTime }) { //nasa UpdateExam yuing dalawang to, so i can get it out here
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("06:45");
  const [durationHours, setDurationHours] = useState(1);
  const [durationMinutes, setDurationMinutes] = useState(0);

  //LocaleString display-friendly version
  // const [startDateTime, setStartDateTime] = useState("");
  // const [endDateTime, setEndDateTime] = useState("");
    //toLocaleString() === 8/12/2025, 9:15:00 AM

  //ISO format for DB
  const [startDateTimeISO, setStartDateTimeISO] = useState("");
  const [endDateTimeISO, setEndDateTimeISO] = useState("");
    //.toISOString() === 2025-08-12T01:15:00.000Z

  const { examId } = useParams();
  const { accessToken } = useAuth();
  const headers = { Authorization: `Bearer ${accessToken}` }
  const config = { headers, withCredentials: true };

/* =========== FETCH AND RENDER THE DATE ========== */
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await axios.get(`/exams/${examId}/schedule`, config); 

        //convert UTC to local time
        const utcDate = new Date(res.data.start_datetime);
        const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
        setStartDate(localDate.toISOString().split("T")[0]);
        setStartTime(localDate.toISOString().split("T")[1].slice(0, 5));

        if (res.data.exam_duration !== undefined) {
          const totalMinutes = Number(res.data.exam_duration);
          setDurationHours(Math.floor(totalMinutes / 60));
          setDurationMinutes(totalMinutes % 60);
        }
      } catch (err) {
        console.error("Error fetching saved date", err);
      }
    };
    if (examId) fetchSchedule();
  }, [accessToken, examId])

/* ====== CALCULATE END DATE/TIME (INPUT CHANGE) ====== */
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
    const totalMinutes = Number(durationHours) * 60 + Number(durationMinutes); //1hr = 60mins


                    console.log({
                      scheduledDate: start.toISOString(),
                      addExamDuration: totalMinutes,
                    });

  }, [startDate, startTime, durationHours, durationMinutes, accessToken]);

/* =========== SAVE DATE ========== */
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
        addExamDuration: totalMinutes,
      }, config);
      console.log("Saved schedule!");
    } catch (err) {
      console.error("Error saving schedule:", err);
    }
  };

  return (
    <>
      <label className="select-label">Set Duration / Time and Date</label>
      {/* ========================= DURATION ========================= */}
      <div className="duration-container">
        <label className="duration-label">Duration:</label>
        <div className="duration-inner-container">
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
        <button className="save-duration-button" onClick={handleSave}>Save S</button>
      </div>
      {/* ======= TIME-PICKER COMPONENT ======= */}        
      <div className="time-container">
        <label className="time-label">Set Time:</label>
        <TimePickerComponent
          value={startTime}
          onChange={setStartTime}
          label="Start Time"
        />
      </div>
      {/* ==== DATE ==== */}  
      <div className="date-container">
        <label className="date-label">Set Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
    </>
  );
}

export default ScheduledTakers;