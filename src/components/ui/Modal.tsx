'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'default' | 'wide' | 'fullscreen';
}

const sizeClasses = {
  default: 'max-w-[900px] max-h-[90vh]',
  wide: 'max-w-[1000px] max-h-[90vh]',
  fullscreen: 'w-full h-full sm:w-[95vw] sm:h-[95vh] max-w-none',
} as const;

export function Modal({ isOpen, onClose, children, size = 'default' }: ModalProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  const isFullscreen = size === 'fullscreen';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            className={cn(
              'relative bg-white w-full',
              isFullscreen ? 'p-0 overflow-hidden rounded-none sm:rounded-3xl' : 'rounded-3xl p-6 sm:p-8 md:p-12 overflow-y-auto',
              sizeClasses[size]
            )}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={cn(
                'absolute z-20 w-10 h-10 rounded-full bg-[var(--color-background)] flex items-center justify-center hover:bg-[var(--color-accent-subtle)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
                isFullscreen ? 'top-4 right-4' : 'top-6 right-6'
              )}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgb(0,0,0)" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="2" y1="2" x2="14" y2="14" />
                <line x1="14" y1="2" x2="2" y2="14" />
              </svg>
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
