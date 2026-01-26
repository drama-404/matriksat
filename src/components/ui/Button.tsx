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
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(52,145,255)] focus-visible:ring-offset-2',
    size === 'default' && 'h-[61px] px-5 text-base',
    size === 'large' && 'h-[68px] px-6 text-lg',
    'rounded-[118px]', // Exact Kree8 button radius
    variant === 'primary' && [
      'bg-[rgb(22,22,22)] text-white',
      'button-shadow',
    ],
    variant === 'secondary' && [
      'bg-white text-[rgb(22,22,22)]',
      'card-shadow',
    ],
    variant === 'outline' && [
      'bg-transparent text-[rgb(22,22,22)]',
      'border-2 border-[rgb(22,22,22)]',
      'hover:bg-[rgb(22,22,22)] hover:text-white',
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
