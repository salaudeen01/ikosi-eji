export const formatQuillContent = (html: string) => {
    if (!html) return "";
  
    return (
      html
        // Fix spacing issue
        .replace(/&nbsp;/g, " ")
  
        // Remove empty paragraphs
        .replace(/<p><br><\/p>/g, "")
  
        // Normalize paragraph spacing
        .replace(/<p/g, '<p style="margin-bottom:10px; line-height:1.8;"')
  
        // Fix headings
        .replace(/<h1/g, '<h1 style="font-size:28px; font-weight:700; margin:16px 0;"')
        .replace(/<h2/g, '<h2 style="font-size:24px; font-weight:600; margin:14px 0;"')
        .replace(/<h3/g, '<h3 style="font-size:20px; font-weight:600; margin:12px 0;"')
  
        // Fix lists
        .replace(/<ul/g, '<ul style="padding-left:20px; margin-bottom:12px;"')
        .replace(/<ol/g, '<ol style="padding-left:20px; margin-bottom:12px;"')
  
        // Fix blockquote
        .replace(
          /<blockquote/g,
          '<blockquote style="border-left:4px solid #ccc; padding-left:12px; margin:12px 0; color:#666;"'
        )
  
        // Fix alignment (Quill classes → inline styles)
        .replace(/class="ql-align-center"/g, 'style="text-align:center;"')
        .replace(/class="ql-align-right"/g, 'style="text-align:right;"')
        .replace(/class="ql-align-justify"/g, 'style="text-align:justify;"')
    );
  };