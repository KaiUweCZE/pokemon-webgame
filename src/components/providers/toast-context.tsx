"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { Toast, ToastVariant } from "../ui/toast";

interface ToastContextType {
  showToast: (message: string, variant: ToastVariant) => void;
  hideToast: () => void;
  toast: {
    message: string;
    variant: ToastVariant;
    isVisible: boolean;
  };
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState({
    message: "",
    variant: "success" as ToastVariant,
    isVisible: false,
  });

  const showToast = useCallback((message: string, variant: ToastVariant) => {
    setToast({
      message,
      variant,
      isVisible: true,
    });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  }, []);

  const contextValue = {
    toast,
    showToast,
    hideToast,
  };
  return (
    <ToastContext value={contextValue}>
      {children}
      <Toast
        message={toast.message}
        variant={toast.variant}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
