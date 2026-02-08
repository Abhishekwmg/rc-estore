// src/components/UI/Select.jsx
import React from "react";

const Select = ({ label, value, onChange, children, className = "" }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <label className="mb-1 font-medium">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="p-2 border rounded w-full"
      >
        {children}
      </select>
    </div>
  );
};

export default Select;
