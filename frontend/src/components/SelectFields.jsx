function SelectField({ label, name, value, onChange, options, disabled }) {
  const safeValue = value ?? 'draft';
  //default to "draft" if nothing is set
  
  return (
    <div>
      <label htmlFor={name}> {label} </label>
      <select id={name} 
        required
        name={name} 
        value={safeValue} 
        disabled={disabled}
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

/*
<SelectField 
  label={label || 'edi wow'}
  name={name || 'gender'}
  value={selectedGender}
  onChange={(e) => setSelectedGender(e.target.value)}
  options={optionsArray}
  disabled={isValid}
/>
*/