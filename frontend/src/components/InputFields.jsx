import React from "react";

function InputField ({ label, type="text", name, value, onChange, placeholder, disabled=false }) {
  return (
    <>
    <div>
      <label>{label}</label>
      <input className="input-field"
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
    </>
  );
}

export default InputField;