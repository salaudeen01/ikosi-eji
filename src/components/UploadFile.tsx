/* eslint-disable @next/next/no-img-element */
"use client";

import { useUploadStore } from "@/store/useUploadStore";
import { Button } from "@/components/ui/button";
import { useUploadImage } from "@/hooks/mutatiion/useUploadImage";
import { Input } from "./ui/input";

type UploadProps = {
  imageFile: string;
}

export default function UploadImageForm({imageFile }:UploadProps) {
  const uploadMutation = useUploadImage();
  const { imageUrl } = useUploadStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadMutation.mutate(file);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Input
          id="fullName"
          type="file"
          className="z-40"
          accept="image/*"
          placeholder="Enter full name"
          readOnly={uploadMutation.isPending}
          onChange={handleFileChange}
          // required
        />
        <Button
          onClick={() => {}}
          disabled
          className="absolute z-0 end-0 bottom-0"
        >
          {uploadMutation.isPending ? "Uploading..." : "Upload Image"}
        </Button>
      </div>
      {(imageFile || imageUrl) && (
        <div className="mt-4">
          <img
            src={imageUrl || imageFile || ''}
            alt="Uploaded"
            className="w-40 h-40 object-cover rounded-lg"
          />
        </div>
)}

    </div>
  );
}
