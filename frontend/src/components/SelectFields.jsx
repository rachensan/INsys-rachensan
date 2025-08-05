function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select id={name} 
        required
        name={name} 
        value={value} 
        onChange={onChange}>
        <option value="" disabled hidden>-- Select --</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}


export default SelectField;