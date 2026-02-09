import React from "react";
import { useError } from "../context/ErrorContext";

export default function GlobalError() {
  const { error, clearError } = useError();

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow z-50">
      <p>{error.message || "Something went wrong!"}</p>
      <button
        className="ml-2 underline"
        onClick={clearError}
      >
        Dismiss
      </button>
    </div>
  );
}
