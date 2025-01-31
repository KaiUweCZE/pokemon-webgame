"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { Toast, ToastVariant } from "../ui/toast";

interface ToastState {
  message: string;
  variant: ToastVariant;
  isVisible: boolean;
  headline?: string | null;
  duration?: number;
}

interface ToastContextType {
  showToast: (
    message: string,
    variant: ToastVariant,
    options?: { headline?: string; duration?: number }
  ) => void;
  hideToast: () => void;
  toast: ToastState;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    variant: "success",
    isVisible: false,
  });

  const showToast = useCallback(
    (
      message: string,
      variant: ToastVariant,
      options?: { headline?: string | null; duration?: number }
    ) => {
      setToast({
        message,
        variant,
        isVisible: true,
        headline: options?.headline,
        duration: options?.duration,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, showToast, hideToast }}>
      {children}
      <Toast
        message={toast.message}
        variant={toast.variant}
        isVisible={toast.isVisible}
        onClose={hideToast}
        headline={toast.headline}
        duration={toast.duration}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
