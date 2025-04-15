import { useState } from "react";
import { FormErrors, FormValues } from "../types/types";

export const useApplicationForm = () => {
  const [formData, setFormData] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    photo: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleFileSelect = (file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors.photo;
      return newErrors;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name as keyof FormValues];
      return newErrors;
    });
  };

  return { formData, errors, setErrors, handleChange, handleFileSelect };
};
