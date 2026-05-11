import { useEffect, useState } from "react";

const WhatsAppButton = ({ number }: { number: string }) => {
  const [whatsappNumber, setWhatsappNumber] = useState(number);

  useEffect(() => {
    if (number) {
      setWhatsappNumber(number);
    }
  }, [number]);

  if (!whatsappNumber) {
    return null;
  }

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center bg-primary rounded-full shadow-lg hover:bg-primary/90 transition-all transform hover:-translate-y-1"
      aria-label="WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 21h8.25c1.102 0 2- .898 2-2V9c0-1.102-.898-2-2-2H8.25c-1.102 0-2 .898-2 2v10c0 1.102.898 2 2 2z"
        />
      </svg>
    </a>
  );
};

export default WhatsAppButton;