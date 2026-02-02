'use client';

import { cn } from '@/lib/utils';

interface TerminalLabelProps {
  children: string;
  className?: string;
  showCursor?: boolean;
}

export function TerminalLabel({
  children,
  className,
  showCursor = true,
}: TerminalLabelProps) {
  return (
    <span
      className={cn(
        'font-mono text-xs tracking-wide text-[var(--color-terminal)]',
        className
      )}
    >
      {'>'} {children}
      {showCursor && <span className="terminal-cursor">_</span>}
    </span>
  );
}
