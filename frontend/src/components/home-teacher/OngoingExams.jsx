import Button from '../../components/Buttons.jsx'
import { useNavigate } from "react-router-dom";

export const HomeCard = ({ data, title, subjCode, schedule, status, sections, onClickNav, onClickDel, onClickDupe }) => {

  return (
    <div
    onClick={() => onClickNav(data.exam_id)}   //goes to the specific exam when div is clicked
    style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>

    <Button 
        label="Delete" 
        type="button" 
        onClick={(e) => { 
          e.stopPropagation(); 
          onClickDel(data.exam_id); 
        }} 
      />
      <Button 
        label="Duplicate" 
        type="button" 
        onClick={(e) => { 
          e.stopPropagation(); 
          onClickDupe(data.exam_id); 
        }} 
      />

      <h2>{title}</h2>
      <p>{subjCode}</p>
      <p>{schedule}</p>
      <p>{sections}</p>
      <p>{status}</p>
    </div>
  );
};

function OngoingExams({ exams, onClickDel, onClickDupe }) {
  const navigate = useNavigate();
  return (
    <>
      {exams.map((e) => (
        <HomeCard //these from the database so use snake_case
          key={e.exam_id}
          title={e.title}
          subjCode={e.subj_code}
          schedule={e.schedule}
          status={e.status}
          sections={e.sections}
          data={e}
          onClickDel={onClickDel} //send to: const handleDeleteExam = (examId)=>{}
          onClickDupe={onClickDupe}
          onClickNav={() => navigate(`/update-exam/${e.exam_id}`)}
        />
      ))}
    </>
  )
}

export default OngoingExams;
