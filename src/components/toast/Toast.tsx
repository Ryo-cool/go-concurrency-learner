'use client';

import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-800',
    iconClassName: 'text-green-600',
  },
  error: {
    icon: AlertCircle,
    className: 'bg-red-50 border-red-200 text-red-800',
    iconClassName: 'text-red-600',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-800',
    iconClassName: 'text-blue-600',
  },
};

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const { type, message, duration = 5000, id } = toast;
  const config = toastConfig[type];
  const Icon = config.icon;

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, id, onRemove]);

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 rounded-lg border shadow-lg animate-slide-in-right',
        'min-w-[300px] max-w-md',
        config.className
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', config.iconClassName)} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className={cn(
          'p-1 rounded-md hover:bg-black/10 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-offset-1'
        )}
        aria-label="閉じる"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};