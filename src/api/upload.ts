import { publicApi } from "@/lib/axios";

export interface UploadResponse {
  url: string;
  public_id?: string;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await publicApi.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
