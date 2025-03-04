"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { Toast, type ToastVariant } from "../ui/toast";

interface ToastState {
  message: string;
  variant: ToastVariant;
  isVisible: boolean;
  headline?: string | null;
  duration?: number;
}

const toastStore = new Store<ToastState>({
  message: "",
  variant: "success",
  isVisible: false,
  headline: null,
  duration: undefined,
});

type ShowToastOptions = Omit<ToastState, "isVisible">;

export const showToast = (
  message: string,
  variant: ToastVariant,
  options?: { headline?: string | null; duration?: number }
) => {
  toastStore.setState((state) => ({
    ...state,
    message,
    variant,
    isVisible: true,
    headline: options?.headline || null,
    duration: options?.duration,
  }));
};

export const hideToast = () => {
  toastStore.setState((state) => ({
    ...state,
    isVisible: false,
  }));
};

export const useToast = () => {
  const toast = useStore(toastStore);

  return {
    toast,
    showToast,
    hideToast,
  };
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { hideToast, toast } = useToast();

  return (
    <>
      {children}
      <Toast
        message={toast.message}
        variant={toast.variant}
        isVisible={toast.isVisible}
        onClose={hideToast}
        headline={toast.headline}
        duration={toast.duration}
      />
    </>
  );
};
