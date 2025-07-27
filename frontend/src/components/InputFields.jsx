import React from "react";

function InputField ({ label, type="text", name, value, onChange, placeholder }) {
  return (
    <>
    <div>
      <label>{label}</label>
      <input className="input-field"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
    </>
  );
}

export default InputField;