// src/components/UI/InputField.jsx
import React from "react";

export default function InputField({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  autoFocus = false,
  disabled = false,
  className = "",
  label = "", // optional label
}) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        className={`p-2 border rounded w-full dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 ${className}`}
      />
    </div>
  );
}
