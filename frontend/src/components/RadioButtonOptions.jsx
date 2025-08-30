import React from "react";

function RadioButtonOptions({ label, name, value, onChange, options, divClassName = "form-group"
}) {
  return (
    <div className={divClassName}>
      {label && <label>{label}</label>}
      <div className="radio-group">
        {options.map((option, index) => {
          const id = `${name}-${index}`
          return (
            <React.Fragment key={index}>
              <input
                type="radio"
                id={id}
                name={name} 
                value={option}
                checked={value === option}
                onChange={onChange}
                required={index === 0} // only first one has required
              />
              <label htmlFor={id}>{option}</label>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default RadioButtonOptions;

/*
  <RadioButtonOptions
    name={name}
    value={value}
    onChange={onChange} //(e) => setCode(e.target.value)
    options={mcqOptions}
    divClassName={divClassName}
  />




*/
