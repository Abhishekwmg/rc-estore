import { TriangleAlert } from "lucide-react";

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
  label = "",
  error = "",
}) {
  const baseStyles = `
    w-full 
    border 
    rounded 
    p-2 
    transition-all 
    focus:outline-none 
    focus:ring-2 
    focus:ring-blue-400
  `;
  return (
    <div className="flex flex-col">
      {/* {label && (
        <label
          htmlFor={name}
          className="mb-1 font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )} */}

      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoFocus={autoFocus}
          disabled={disabled}
          className={`${baseStyles} ${className}`}
          style={{
            backgroundColor: "var(--input-bg)",
            color: "var(--input-text)",
            borderColor: "var(--input-border)",
            placeholderColor: "var(--input-text)",
          }}
        />
      ) : (
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
      )}

      {error && (
        <div>
          <TriangleAlert size={15} className="inline text-red-500 mx-1" />
          <p className="text-red-500 text-sm mt-1 inline">{error}</p>
        </div>
      )}
    </div>
  );
}
