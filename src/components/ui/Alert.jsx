// // src/components/UI/Alert.jsx
// import React from "react";

// const Alert = ({ type = "info", message, className = "" }) => {
//   // Determine colors based on type
//   const baseClasses = "p-4 rounded shadow mb-4";
//   let typeClasses = "";

//   switch (type) {
//     case "success":
//       typeClasses = "bg-green-100 text-green-700";
//       break;
//     case "error":
//       typeClasses = "bg-red-100 text-red-700";
//       break;
//     case "warning":
//       typeClasses = "bg-yellow-100 text-yellow-800";
//       break;
//     default:
//       typeClasses = "bg-blue-100 text-blue-700";
//   }

//   return (
//     <div className={`${baseClasses} ${typeClasses} ${className}`}>
//       {message}
//     </div>
//   );
// };

// export default Alert;


// src/components/UI/Alert.jsx
import React from "react";

const Alert = ({ type = "info", message, children, className = "" }) => {
  const baseClasses = "p-4 rounded shadow mb-4";
  let typeClasses = "";

  switch (type) {
    case "success":
      typeClasses = "bg-green-100 text-green-700";
      break;
    case "error":
      typeClasses = "bg-red-100 text-red-700";
      break;
    case "warning":
      typeClasses = "bg-yellow-100 text-yellow-800";
      break;
    default:
      typeClasses = "bg-blue-100 text-blue-700";
  }

  return (
    <div className={`${baseClasses} ${typeClasses} ${className}`}>
      {children || message}
    </div>
  );
};

export default Alert;