import { FormErrors, FormValues } from "../types/types";

export const validateForm = (formData: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required.";

  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";

  if (!formData.email.trim()) errors.email = "Email is required.";

  if (!formData.email.includes("@"))
    errors.email = "Please use correct formatting. Example: address@email.com";

  if (formData.photo === null) errors.photo = "Photo is required.";

  return errors;
};
