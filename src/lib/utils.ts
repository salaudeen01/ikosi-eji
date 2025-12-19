import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Article } from "../../type";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetchArticle = async (slug: string): Promise<Article> => {
  const baseUrl =
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"
      : "";

  const res = await axios.get(`${baseUrl}/api/news/${slug}`);
  return res.data.data;
};