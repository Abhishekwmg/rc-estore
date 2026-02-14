export const validateLogin = (formData) => {
  const newErrors = {};
  if (!formData.email.trim()) return (newErrors.email = "Email is required");
  if (!formData.password)
    return (newErrors.password = "Password must be valid");
  if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Invalid email format";
};
