'use client';

import React from 'react';
import { Toast, ToastMessage } from './Toast';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemove,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed top-4 right-4 z-50 space-y-3"
      role="region"
      aria-live="polite"
      aria-label="通知"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};