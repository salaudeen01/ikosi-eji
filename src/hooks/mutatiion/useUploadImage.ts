"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadImage, UploadResponse } from "@/api/upload";
import { useToast } from "@/hooks/use-toast";
import { useUploadStore } from "@/store/useUploadStore";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useUploadImage = () => {
  const { toast } = useToast();
  const { setImage } = useUploadStore();

  return useMutation<UploadResponse, ApiError, File>({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setImage(data.url, data.public_id);
      toast({
        title: "Image uploaded successfully 🎉",
        description: "Your image is now available.",
      });
    },
    onError: (error) => {
      toast({
        title: "Image upload failed",
        description: error?.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
};
