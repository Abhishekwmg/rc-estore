export const validateContactForm = (formData) => {
  const errors = {};

  if (!formData.fullName.trim())
    errors.fullName = "Full Name is required";

  if (!formData.email.trim())
    errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    errors.email = "Invalid email format";

  if (formData.phone && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone))
    errors.phone = "Invalid phone number";

  if (!formData.subject.trim())
    errors.subject = "Subject is required";

  if (!formData.message.trim())
    errors.message = "Message is required";

  return errors;
};
