import Button from '../Buttons.jsx'
import { useNavigate } from "react-router-dom";

export const HomeCard = ({ data, title, subjCode, schedule, status, sections, onClickNav, onClickDel, onClickDupe }) => {

  return (
    <>
    <div className="grid-item"
    onClick={() => onClickNav(data.exam_id)}> {/*goes to the specific exam when div is clicked */}

      <div className="kebab-menu" >
        <i className="fas fa-ellipsis-v"></i>
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
      </div>
        
      <div className="exam-content">
        <i className="fas fa-folder"></i>
        <span>{title}</span>
      </div>

      <div className="taskbar">
        <div className="taskbar-left">None</div>
        <div className="taskbar-right">Status: <span className="done-text">{status}</span></div>
      </div>
      
    </div>
    </>
  );
};

function PublishedExams({ exams, onClickDel, onClickDupe, className }) {
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

export default PublishedExams;
