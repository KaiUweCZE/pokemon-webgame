"use client";
import { Store } from "@tanstack/store";
import { useStore } from "@tanstack/react-store";
import { Modal, ModalProps } from "@/components/ui/primitives/modal";

interface ModalState {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  isLoading?: boolean;
  description?: string;
  children?: React.ReactNode;
  showCloseButton?: boolean;
  variant?: ModalProps["variant"];
  size?: ModalProps["size"];
  preventClose?: boolean;
  className?: string;
  iconWidth?: number;
}

// init state
const modalStore = new Store<ModalState>({
  isOpen: false,
  preventClose: false,
});

type ShowModalOptions = Omit<ModalState, "isOpen">;

export const showModal = (options: ShowModalOptions) => {
  modalStore.setState((state) => ({
    ...state,
    isOpen: true,
    ...options,
  }));
};

export const hideModal = () => {
  modalStore.setState((state) => ({
    ...state,
    isOpen: false,
    children: undefined,
    title: undefined,
    description: undefined,
    preventClose: false,
  }));
};

export const useModal = () => {
  const state = useStore(modalStore);

  return {
    ...state,
    showModal,
    hideModal,
  };
};

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const { isOpen, hideModal, ...modalProps } = useModal();

  return (
    <>
      {children}
      <Modal isOpen={isOpen} onClose={hideModal} {...modalProps} />
    </>
  );
}
