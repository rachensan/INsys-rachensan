import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Title = ({ examData: { title }, setExam }) => {
  return (
    <>
      <form>
        <input type='text'
          placeholder='Exam Title'
          value={title}
          onChange={(e)=>setExam(prev =>({...prev, title: e.target.value}))}
          required
        ></input>
      </form>
    </>
  )
}
