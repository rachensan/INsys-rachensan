import React from "react";

function InputField ({ label, type="text", name, value, onChange, placeholder, id, className="input-field", divClassName="form-group", disabled=false }) {
  return (
    <>
              
    <div className={divClassName}>
      <label>{label}</label>
      <input 
        required //works only in form submissions
        id={id || name}
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
    className="ewan-ko"
    label="OTP"
    name="code"
    value={code} <-- must be string or number
    onChange={(e) => setCode(e.target.value)}
    placeholder="Enter student id"
    disabled={isVerified}
  />
*/