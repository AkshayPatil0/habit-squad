import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Show the default close button in the top-right corner */
  showCloseButton?: boolean;
  /** Extra class names applied to the modal panel */
  className?: string;
  children: ReactNode;
  fullScreen?: boolean;
}

/**
 * Reusable modal overlay.
 *
 * Usage:
 * ```tsx
 * <Modal isOpen={open} onClose={() => setOpen(false)} title="My Modal">
 *   <p>Content here</p>
 * </Modal>
 * ```
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  showCloseButton = true,
  className = "",
  children,
  fullScreen = false,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      aria-modal="true"
      role="dialog"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={cn(
          "relative z-10 w-full overflow-y-auto",
          "bg-white dark:bg-surface-950",
          "rounded-t-3xl sm:rounded-3xl",
          "shadow-2xl",
          fullScreen ? "h-dvh" : "max-h-[92dvh]",
          "animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300",
          className,
        )}
      >
        {/* Optional header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-5 pt-5 pb-0">
            {title ? (
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
                {title}
              </h2>
            ) : (
              <span />
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-100 dark:bg-surface-800 text-slate-500 hover:bg-accent/10 hover:text-accent transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {children}
      </div>
    </div>,
    document.body,
  );
}
