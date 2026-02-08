// src/components/UI/Button.jsx
import React from "react";

export default function Button({
  type = "button",
  children,
  onClick,
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded text-white transition 
        ${disabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"} 
        ${className}`}
    >
      {children}
    </button>
  );
}
