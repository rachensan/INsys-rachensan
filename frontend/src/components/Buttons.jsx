import React from "react";

function Button({ label = "Submit", type = "button", disabled = false, onClick, className = "" }) {
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={className}>
      {label}
    </button>
  );
}

export default Button;

//TYPES OF BUTTON
//"BUTTON" = <Button label="Click Me" onClick={sumFunction} />
//"SUBMIT" = <Button label="Register" type="submit" />
//"RESET" = <Button label="Reset Form" type="reset" />
