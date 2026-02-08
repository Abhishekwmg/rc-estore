// src/pages/Contact.jsx
// import { useState } from "react";
// export default function Contact() {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Validate form fields
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Invalid email format";
//     if (formData.phone && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone))
//       newErrors.phone = "Invalid phone number";
//     if (!formData.subject.trim()) newErrors.subject = "Subject is required";
//     if (!formData.message.trim()) newErrors.message = "Message is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMsg("");
//     if (!validate()) return;

//     setSubmitting(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       setSubmitting(false);
//       setSuccess(true);
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//     } catch (err) {
//       setSubmitting(false);
//       setErrorMsg("Something went wrong. Please try again later.");
//     }
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

//       {success && (
//         <div className="p-4 mb-6 bg-green-100 text-green-700 rounded shadow">
//           <h3 className="font-bold text-lg mb-1">Message Sent!</h3>
//           <p>Thank you for reaching out. We'll get back to you soon.</p>
//         </div>
//       )}

//       {errorMsg && (
//         <div className="p-4 mb-6 bg-red-100 text-red-700 rounded shadow">
//           {errorMsg}
//         </div>
//       )}

//       <form
//         className="flex flex-col gap-4 border p-4 rounded shadow"
//         onSubmit={handleSubmit}
//       >
//         <div>
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={formData.fullName}
//             onChange={handleChange}
//             className="p-2 border rounded w-full"
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//           )}
//         </div>

//         <div>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             className="p-2 border rounded w-full"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         <div>
//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number (optional)"
//             value={formData.phone}
//             onChange={handleChange}
//             className="p-2 border rounded w-full"
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//           )}
//         </div>

//         <div>
//           <input
//             type="text"
//             name="subject"
//             placeholder="Subject"
//             value={formData.subject}
//             onChange={handleChange}
//             className="p-2 border rounded w-full"
//           />
//           {errors.subject && (
//             <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
//           )}
//         </div>

//         <div>
//           <textarea
//             name="message"
//             placeholder="Your Message"
//             value={formData.message}
//             onChange={handleChange}
//             className="p-2 border rounded w-full h-32"
//           />
//           {errors.message && (
//             <p className="text-red-500 text-sm mt-1">{errors.message}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={submitting}
//           className={`mt-2 px-4 py-2 rounded text-white ${
//             submitting
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-indigo-500 hover:bg-indigo-600"
//           }`}
//         >
//           {submitting ? "Sending..." : "Send Message"}
//         </button>
//       </form>
//     </div>
//   );
// }

// src/pages/Contact.jsx
import { useState } from "react";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Alert from "../components/ui/Alert";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (formData.phone && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!validate()) return;

    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitting(false);
      setSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      setSubmitting(false);
      setErrorMsg(err.message, "Something went wrong. Please try again later.");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      {/* Success and Error Alerts */}
      {success && (
        <Alert type="success" className="mb-6">
          <h3 className="font-bold text-lg mb-1">Message Sent!</h3>
          <p>Thank you for reaching out. We'll get back to you soon.</p>
        </Alert>
      )}

      {errorMsg && (
        <Alert type="error" className="mb-6">
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input Fields */}
        <InputField
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          name="phone"
          placeholder="Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <InputField
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
        />

        <InputField
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          type="textarea"
        />

        {/* Submit Button */}
        <Button type="submit" disabled={submitting} className="mt-2 w-full">
          {submitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}
