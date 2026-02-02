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
  strokeWidth = 2,
}: SelectionBoxProps) {
  const cornerSize = 6;
  const cornerGap = 6;

  return (
    <div className={cn('relative inline-flex', className)}>
      {/* Content */}
      <div className="relative z-10 px-2 py-0.5">
        {children}
      </div>

      {/* Broken Frame Border — each side drawn independently with corner gaps */}
      {/* Top */}
      <span
        className="absolute pointer-events-none bg-[rgb(52,145,255)]"
        style={{ top: 0, left: cornerGap, right: cornerGap, height: strokeWidth }}
      />
      {/* Bottom */}
      <span
        className="absolute pointer-events-none bg-[rgb(52,145,255)]"
        style={{ bottom: 0, left: cornerGap, right: cornerGap, height: strokeWidth }}
      />
      {/* Left */}
      <span
        className="absolute pointer-events-none bg-[rgb(52,145,255)]"
        style={{ left: 0, top: cornerGap, bottom: cornerGap, width: strokeWidth }}
      />
      {/* Right */}
      <span
        className="absolute pointer-events-none bg-[rgb(52,145,255)]"
        style={{ right: 0, top: cornerGap, bottom: cornerGap, width: strokeWidth }}
      />

      {/* Corner Handles */}
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
