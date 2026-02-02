'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { buttonHover } from '@/components/animations/variants';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'large';
  href?: string;
  onClick?: () => void;
  className?: string;
  subText?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  href,
  onClick,
  className,
  subText,
}: ButtonProps) {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2',
    size === 'default' && 'h-[61px] px-5 text-base',
    size === 'large' && 'h-[68px] px-6 text-lg',
    'rounded-[var(--radius-button)]',
    variant === 'primary' && [
      'bg-[var(--color-dark)] text-white',
      'button-shadow',
    ],
    variant === 'secondary' && [
      'bg-white text-[var(--color-dark)]',
      'card-shadow',
    ],
    variant === 'outline' && [
      'bg-transparent text-[var(--color-dark)]',
      'border-2 border-[var(--color-dark)]',
      'hover:bg-[var(--color-dark)] hover:text-white',
    ],
    className
  );

  const content = (
    <span className="flex flex-col items-center">
      <span>{children}</span>
      {subText && (
        <span className="text-xs opacity-60 mt-0.5">{subText}</span>
      )}
    </span>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyles}
        variants={buttonHover}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={baseStyles}
      variants={buttonHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      {content}
    </motion.button>
  );
}
