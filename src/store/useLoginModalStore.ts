import { create } from "zustand";

interface LoginModalState {
  isOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  isOpen: false,
  openLogin: () => set({ isOpen: true }),
  closeLogin: () => set({ isOpen: false }),
}));
