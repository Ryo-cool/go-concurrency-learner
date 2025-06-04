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
    className: 'bg-green-600/95 backdrop-blur-sm border-green-500/50 text-white shadow-lg shadow-green-600/30',
    iconClassName: 'text-green-100',
  },
  error: {
    icon: IoAlertCircle,
    className: 'bg-red-600/95 backdrop-blur-sm border-red-500/50 text-white shadow-lg shadow-red-600/30',
    iconClassName: 'text-red-100',
  },
  info: {
    icon: IoInformationCircle,
    className: 'bg-blue-600/95 backdrop-blur-sm border-blue-500/50 text-white shadow-lg shadow-blue-600/30',
    iconClassName: 'text-blue-100',
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
        'min-w-[320px] max-w-md border',
        config.className
      )}
      role="alert"
    >
      <Icon className={cn('w-6 h-6 flex-shrink-0', config.iconClassName)} />
      <p className="flex-1 text-sm font-bold tracking-wide drop-shadow-sm">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className={cn(
          'p-1.5 rounded-md hover:bg-white/30 transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-1',
          'text-white/90 hover:text-white'
        )}
        aria-label="閉じる"
      >
        <IoClose className="w-4 h-4" />
      </button>
    </div>
  );
};