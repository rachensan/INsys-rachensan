function Title({ exam, setExam }) {
  return (
    <>
    <div className="examTitleDiv ">
      <input type='text'
          placeholder='Exam Title'
          value={exam.title}
          onChange={(e)=>setExam(prev =>({...prev, title: e.target.value}))}
          required
        ></input>
    </div>
    </>
  )
}
export default Title;
