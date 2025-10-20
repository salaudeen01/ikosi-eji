import type { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, Files, Fields, File } from "formidable";
import cloudinary from "../../lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Define Cloudinary response type
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: string | number | boolean | object;
}

// Define API response type
interface ApiResponse {
  message: string;
  url?: string;
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
): Promise<void> {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Only POST requests allowed" });
    return;
  }
  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err: unknown, fields: Fields, files: Files) => {
    if (err instanceof Error) {
      console.error("Form parse error:", err);
      res.status(500).json({ message: "Form parse error", error: err.message });
      return;
    }
    // Handle both `file` and `item_image` field keys safely
    const fileField = (files.file || files.item_image) as File[] | undefined;
    const file = fileField && fileField[0];

    if (!file || !file.filepath) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    try {
      const result = (await cloudinary.uploader.upload(
        file.filepath,
        {
          folder: "items",
          use_filename: true,
          unique_filename: false,
        }
      )) as CloudinaryUploadResult;

      res.status(200).json({
        message: "Upload successful",
        url: result.secure_url,
      });
    } catch (uploadErr) {
      const errorMessage =
        uploadErr instanceof Error ? uploadErr.message : "Unknown upload error";
      res.status(500).json({
        message: "Upload failed",
        error: errorMessage,
      });
    }
  });
}
