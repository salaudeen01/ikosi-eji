import { saveArticle, SaveArticleResponse } from "@/api/clients";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // or your preferred alert system

export const useSaveArticle = () => {
  return useMutation<SaveArticleResponse, Error, number>({
    mutationFn: saveArticle,
    onSuccess: (data) => {
      toast.success(data.message || "Article saved successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save article");
    },
  });
};
