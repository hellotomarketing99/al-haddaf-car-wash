import DOMPurify from 'isomorphic-dompurify';

interface SanitizeHTMLProps {
  html: string;
  className?: string;
}

export function SanitizeHTML({ html, className }: SanitizeHTMLProps) {
  const cleanHtml = DOMPurify.sanitize(html);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
}
