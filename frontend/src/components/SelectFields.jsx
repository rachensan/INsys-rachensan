function SelectField({ label, name, value, onChange, options, disabled, divClassName, className }) {
  const safeValue = value ?? 'draft';
  //default to "draft" if nothing is set
  
  return (
    <div className={divClassName}>
      <label htmlFor={name}> {label} </label>
      <select id={name} 
        className={className}
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