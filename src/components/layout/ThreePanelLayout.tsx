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
        'flex h-full w-full min-w-[1024px] gap-4 p-4',
        className
      )}
    >
      {/* Left Panel - 30% */}
      <div className="w-[30%] glass rounded-2xl overflow-hidden">
        <div className="h-full overflow-y-auto">{leftPanel}</div>
      </div>

      {/* Center Panel - 40% */}
      <div className="w-[40%] glass rounded-2xl overflow-hidden">
        <div className="h-full flex flex-col">{centerPanel}</div>
      </div>

      {/* Right Panel - 30% */}
      <div className="w-[30%] glass rounded-2xl overflow-hidden">
        <div className="h-full overflow-y-auto">{rightPanel}</div>
      </div>
    </div>
  );
};