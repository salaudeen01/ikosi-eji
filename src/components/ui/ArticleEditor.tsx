/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// ✅ Dynamically import to disable SSR (Next.js 13–15 safe)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ✅ Define prop types
interface ArticleEditorProps {
  value: string;
  onChange: (value: string) => void;
}

// ✅ Extend props to allow `ref` safely
type ReactQuillWithRef = React.ComponentProps<typeof ReactQuill> & {
  ref?: React.Ref<any>;
};

const ArticleEditor: React.FC<ArticleEditorProps> = ({ value, onChange }) => {
  const quillRef = useRef<any>(null);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "color",
    "background",
    "align",
  ];

  return (
    <div className="article-editor">
      <ReactQuill
        {...({
          ref: quillRef,
          theme: "snow",
          value,
          onChange,
          modules,
          formats,
          className:
            "bg-[hsl(var(--background))] min-h-[300px] border border-[hsl(var(--border))] rounded-md",
        } as ReactQuillWithRef)} // ✅ this cast fixes the overload issue
      />
    </div>
  );
};

export default ArticleEditor;
