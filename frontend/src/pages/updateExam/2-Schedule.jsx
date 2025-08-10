import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'

import axios from "../../utils/axiosConfig";
import { useAuth } from "../../context/AuthContext";

import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const TimePickerComponent = () => {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  return (
    <div>
      <label>Start Time:</label>
      <TimePicker onChange={setStartTime} value={startTime} disableClock={true}/>
      <br/> <br/>
      <label>End Time:</label>
      <TimePicker onChange={setEndTime} value={endTime} disableClock={true}/>
    </div>
  );
};

const DatePicker = () => {
  return (
    <>
      <input type="date" />
    </>
  )
}

const DurationPicker = () => {
  return (
    <>
      d
    </>
  )
}


function ScheduledTakers () {
  return (
    <>
      <div className="scheduled-takers-div">
        <DatePicker />
        <br/>
        <TimePickerComponent />
      </div>
    
    
    
    </>
  )
}

export default ScheduledTakers;