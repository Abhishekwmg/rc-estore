import { useState } from "react";
import { toast } from "react-toastify";
import Card from "../components/ui/Card";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import { validateContactForm } from "../utils/validatecontact";

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

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = validateContactForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fill the required input fields.");
      return;
    }

    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitting(false);
      setErrors({});
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      toast.success("Message sent! We'll get back to you soon.");
    } catch (err) {
      setSubmitting(false);
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

        <Button type="submit" disabled={submitting} className="mt-2 w-full">
          {submitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Card>
  );
}

