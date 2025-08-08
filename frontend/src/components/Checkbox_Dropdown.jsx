import React, { useState } from "react";

export default function CheckboxDropdown({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select options",
  disabled = false,
  maxHeight = "150px",
}) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div style={{ position: "relative", width: "200px" }}>
      {/* Dropdown Trigger */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: "3px",
          background: disabled ? "#eee" : "#fff",
          cursor: disabled ? "not-allowed" : "pointer",
          borderRadius: "4px",
          userSelect: "none",
        }}
        onClick={() => !disabled && setOpen((prev) => !prev)}
      >
        {selected.length > 0
          ? `${selected.length} selected`
          : placeholder}
      </div>

      {/* Dropdown List */}
      {open && !disabled && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "4px 8px",
            cursor: "pointer",
            position: "absolute",
            top: "100%",
            left: 0,
            border: "1px solid #ccc",
            background: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 10,
            width: "100%",
            maxHeight,
            overflowY: "auto",
            borderRadius: "4px",
            marginTop: "2px",
          }}
        >
          {options.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "4px 8px",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleOption(opt.value)}
                style={{
                  width: "14px",
                  height: "14px",
                  transform: "scale(0.9)", // fine-tune size
                }}
              />
              <span style={{ marginLeft: "5px" }}>{opt.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
