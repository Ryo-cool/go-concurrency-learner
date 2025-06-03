'use client';

import { useState, useCallback } from 'react';
import { ToastMessage, ToastType } from '@/components/toast/Toast';

interface UseToastReturn {
  toasts: ToastMessage[];
  showToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback(
    (type: ToastType, message: string, duration?: number) => {
      const id = `${Date.now()}-${Math.random()}`;
      const newToast: ToastMessage = {
        id,
        type,
        message,
        duration,
      };

      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    removeToast,
    clearToasts,
  };
}