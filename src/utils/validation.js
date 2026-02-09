
export const validateForm = (formData) => {
  const newErrors = {};
  if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
  if (!formData.email.trim()) newErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    newErrors.email = "Invalid email format";
  if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
  if (!formData.address.trim()) newErrors.address = "Address is required";
  if (!formData.city.trim()) newErrors.city = "City is required";
  if (!formData.state.trim()) newErrors.state = "State is required";
  if (!formData.zip.trim()) newErrors.zip = "ZIP Code is required";

  if (!formData.cardNumber.trim())
    newErrors.cardNumber = "Card Number is required";
  else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, "")))
    newErrors.cardNumber = "Card Number must be 16 digits";

  if (!formData.cardExpiry.trim())
    newErrors.cardExpiry = "Expiry Date is required";
  else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry))
    newErrors.cardExpiry = "Expiry must be MM/YY";

  if (!formData.cardCVV.trim()) newErrors.cardCVV = "CVV is required";
  else if (!/^\d{3}$/.test(formData.cardCVV))
    newErrors.cardCVV = "CVV must be 3 digits";

  return newErrors;
};
