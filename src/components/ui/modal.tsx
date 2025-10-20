import React, { useRef } from "react"; //  useEffect,

type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  icons?: string;
  title?: string | React.ReactNode;
  className?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-3xl",
  fullscreen: "w-full h-full",
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  size = "md",
  title,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm">
      <div
        ref={modalRef}
        className={`bg-white rounded-2xl shadow-lg w-full ${className} ${sizeClasses[size]} ${
          size === "fullscreen" ? "rounded-none" : " mx-4"
        }`}
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            x
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
