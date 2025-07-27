import React from "react";

function RadioButton({ label, name, value, onChange, options }) {
  return (
    <div>
      <p>{label}</p>
      {options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default RadioButton;
