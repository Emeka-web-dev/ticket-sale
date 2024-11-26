import { create } from "zustand";

type ModalType = "sidebarToggle" | "ticketDialog" | "viewTicket";
interface ModalStoreState {
  type: ModalType | null;
  isOpen: boolean;
  setOpen: (isOpen: boolean, type?: ModalType) => void;
}

export const useModalStore = create<ModalStoreState>((set) => ({
  type: null,
  isOpen: false,
  setOpen: (isOpen, type) => set({ isOpen, type }),
}));
