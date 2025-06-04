'use client';

import React, { useEffect } from 'react';
import { IoClose, IoCheckmarkCircle, IoAlertCircle, IoInformationCircle } from 'react-icons/io5';
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
    icon: IoCheckmarkCircle,
    className: 'glass-light border-green-200/30',
    iconClassName: 'text-green-400',
  },
  error: {
    icon: IoAlertCircle,
    className: 'glass-light border-red-200/30',
    iconClassName: 'text-red-400',
  },
  info: {
    icon: IoInformationCircle,
    className: 'glass-light border-blue-200/30',
    iconClassName: 'text-blue-400',
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
        'flex items-center gap-3 p-4 rounded-lg animate-slide-in-right',
        'min-w-[300px] max-w-md text-white',
        config.className
      )}
      role="alert"
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', config.iconClassName)} />
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className={cn(
          'p-1 rounded-md hover:bg-white/20 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-1'
        )}
        aria-label="閉じる"
      >
        <IoClose className="w-4 h-4" />
      </button>
    </div>
  );
};