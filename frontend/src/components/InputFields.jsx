import React from "react";

function InputField ({ label, type="text", name, value, onChange, placeholder, className="input-field", disabled=false }) {
  return (
    <>
    <div>
      <label>{label}</label>
      <input 
        required //works only in form submissions
        className={className}
        type={type}
        name={name}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
    </>
  );
}

export default InputField;

/*
  <InputField 
    label="OTP"
    name="code"
    value={code} <-- must be string or number
    onChange={(e) => setCode(e.target.value)}
    placeholder="Enter student id"
    disabled={isVerified}
  />
*/