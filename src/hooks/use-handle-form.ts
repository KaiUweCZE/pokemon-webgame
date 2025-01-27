import { useState } from "react";

type FormErrors = Record<string, string[]>;
type FormState = {
  errors: FormErrors;
  isSubmitting: boolean;
  setErrors: (errors: FormErrors) => void;
  success: boolean;
  setSuccess: (success: boolean) => void;
  startSubmission: () => void;
  reset: () => void;
};

export const useHandleForm = (): FormState => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return {
    errors,
    isSubmitting,
    success,
    setSuccess: (success) => setSuccess(success),
    setErrors: (errors) => setErrors(errors || {}),
    startSubmission: () => setIsSubmitting(true),
    reset: () => setIsSubmitting(false),
  };
};
