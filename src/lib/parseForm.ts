import { IncomingForm, Fields, Files, File } from "formidable";
import type { NextApiRequest } from "next";

/**
 * Parse multipart/form-data request (supports multiple files)
 */
export function parseForm(
  req: NextApiRequest
): Promise<{ fields: Fields; files: Record<string, File[]> }> {
  const form = new IncomingForm({
    keepExtensions: true,
    multiples: true, // ✅ Allow multiple files per field
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
      if (err) return reject(err);
      console.log(err)
      // ✅ Normalize file structure safely
      const normalizedFiles: Record<string, File[]> = {};

      Object.entries(files).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Filter out any undefined items just in case
          normalizedFiles[key] = value.filter((f): f is File => f !== undefined);
        } else if (value) {
          normalizedFiles[key] = [value];
        }
      });

      resolve({ fields, files: normalizedFiles });
    });
  });
}
