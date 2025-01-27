import { useState } from "react";
import { ToastVariant } from "./toast";

interface ToastState {
  message: string;
  variant: ToastVariant;
  isVisible: boolean;
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    variant: "success",
    isVisible: false,
  });

  const showToast = (message: string, variant: ToastVariant) => {
    setToast({
      message,
      variant,
      isVisible: true,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  return {
    toast,
    showToast,
    hideToast,
  };
};
