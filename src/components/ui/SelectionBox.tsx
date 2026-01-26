'use client';

import { cn } from '@/lib/utils';

interface SelectionBoxProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  strokeWidth?: number;
}

export function SelectionBox({
  children,
  className,
  animate = false,
  strokeWidth = 7.9,
}: SelectionBoxProps) {
  const cornerSize = 8;

  return (
    <div className={cn('relative inline-flex', className)}>
      {/* Content */}
      <div className="relative z-10 px-3 py-2">
        {children}
      </div>

      {/* Selection Box Border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
      >
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          fill="rgb(245, 245, 245)"
          stroke="rgb(52, 145, 255)"
          strokeWidth={strokeWidth}
          rx="0"
        />
      </svg>

      {/* Matrix Corner Handles */}
      {/* Top Left */}
      <div
        className={cn(
          'absolute bg-[rgb(52,145,255)]',
          animate && 'pulse-animation'
        )}
        style={{
          width: cornerSize,
          height: cornerSize,
          top: -cornerSize / 2,
          left: -cornerSize / 2,
          boxShadow: '0 0 8px rgba(52, 145, 255, 0.5)',
        }}
      />

      {/* Top Right */}
      <div
        className={cn(
          'absolute bg-[rgb(52,145,255)]',
          animate && 'pulse-animation'
        )}
        style={{
          width: cornerSize,
          height: cornerSize,
          top: -cornerSize / 2,
          right: -cornerSize / 2,
          boxShadow: '0 0 8px rgba(52, 145, 255, 0.5)',
          animationDelay: animate ? '0.5s' : undefined,
        }}
      />

      {/* Bottom Left */}
      <div
        className={cn(
          'absolute bg-[rgb(52,145,255)]',
          animate && 'pulse-animation'
        )}
        style={{
          width: cornerSize,
          height: cornerSize,
          bottom: -cornerSize / 2,
          left: -cornerSize / 2,
          boxShadow: '0 0 8px rgba(52, 145, 255, 0.5)',
          animationDelay: animate ? '1s' : undefined,
        }}
      />

      {/* Bottom Right */}
      <div
        className={cn(
          'absolute bg-[rgb(52,145,255)]',
          animate && 'pulse-animation'
        )}
        style={{
          width: cornerSize,
          height: cornerSize,
          bottom: -cornerSize / 2,
          right: -cornerSize / 2,
          boxShadow: '0 0 8px rgba(52, 145, 255, 0.5)',
          animationDelay: animate ? '1.5s' : undefined,
        }}
      />
    </div>
  );
}
