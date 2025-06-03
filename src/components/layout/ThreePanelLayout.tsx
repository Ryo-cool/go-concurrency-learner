import React from 'react';
import { cn } from '@/lib/utils';

interface ThreePanelLayoutProps {
  leftPanel: React.ReactNode;
  centerPanel: React.ReactNode;
  rightPanel: React.ReactNode;
  className?: string;
}

export const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({
  leftPanel,
  centerPanel,
  rightPanel,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex h-screen w-full min-w-[1024px] bg-gray-50',
        className
      )}
    >
      {/* Left Panel - 30% */}
      <div className="w-[30%] border-r border-gray-200 bg-white">
        <div className="h-full overflow-y-auto">{leftPanel}</div>
      </div>

      {/* Center Panel - 40% */}
      <div className="w-[40%] border-r border-gray-200 bg-white">
        <div className="h-full flex flex-col">{centerPanel}</div>
      </div>

      {/* Right Panel - 30% */}
      <div className="w-[30%] bg-white">
        <div className="h-full overflow-y-auto">{rightPanel}</div>
      </div>
    </div>
  );
};