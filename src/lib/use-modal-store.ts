import { create } from "zustand";

interface ModalStoreState {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set(() => ({ isOpen })),
}));
