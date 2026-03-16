import { toast as sonnerToast } from "sonner";

/**
 * A beautiful global toast utility wrapping sonner.
 * You can import this anywhere in the app to trigger notifications.
 */
export const toast = {
  success: (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
      icon: "🎉",
    });
  },
  error: (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
      icon: "🚨",
    });
  },
  info: (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
      icon: "💡",
    });
  },
  warning: (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
      icon: "⚠️",
    });
  },
  loading: (message: string, description?: string) => {
    return sonnerToast.loading(message, {
      description,
    });
  },
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
  custom: (message: string, options?: any) => {
    sonnerToast(message, options);
  }
};
