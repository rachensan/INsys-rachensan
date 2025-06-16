import React, { useRef, useState, useEffect } from 'react';

// TEACHER 2.1 - CREATE EXAM

function ExamTitle(props) {
// edit the title
// this one i let chatgpt make, understand it nalang, all it does is edit the title
  const titleRef = useRef();
  const [isEditable, setIsEditable] = useState(false); // default to false

  const { title, setTitle } = props;

  useEffect(() => {
    if (isEditable && titleRef.current) {
      titleRef.current.innerText = title; // sync title to editable <h1>
    }
  }, [isEditable, title]);

  const handleEditClick = () => {
    if (isEditable) {
      const newTitle = titleRef.current.innerText;
      setTitle(newTitle);
      console.log("Saved title:", newTitle);
      // save to backend/state/etc.
    }
    setIsEditable(!isEditable);
  };

  return (
    <>
    <div className='examTitleDiv'>
      <h1
        ref={titleRef}
        contentEditable={isEditable}
        suppressContentEditableWarning={true}
        spellCheck={false}
        draggable={false}
        style={{ 
          border: isEditable ? '1px dashed gray' : 'none', 
          padding: '4px',
          outline: 'none',
          userSelect: isEditable ? 'text' : 'none', // disables selection when not editing
          pointerEvents: isEditable ? 'auto' : 'none' // prevent accidental edits when disabled
        }}
        >
        {isEditable ? title : title}
      </h1>

      <button className='editTitleBTN' onClick={handleEditClick}>
        {isEditable ? 'Save' : 'Edit'}
      </button>

      <div className='sectionsToTakeTheExam'></div>
    </div>
    </>
  );
}

export default ExamTitle;
