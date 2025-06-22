function Title({ exam, setExam }) {
  return (
    <>
        <input type='text'
          placeholder='Exam Title'
          value={exam.title}
          onChange={(e)=>setExam(prev =>({...prev, title: e.target.value}))}
          required
        ></input>
    </>
  )
}
export default Title;
