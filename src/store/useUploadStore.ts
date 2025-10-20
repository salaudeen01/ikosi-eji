import { create } from "zustand";

interface UploadState {
  imageUrl: string | null;
  publicId?: string | null;
  setImage: (url: string, publicId?: string) => void;
  clearImage: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  imageUrl: null,
  publicId: null,
  setImage: (url, publicId) => set({ imageUrl: url, publicId }),
  clearImage: () => set({ imageUrl: null, publicId: null }),
}));
