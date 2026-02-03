'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelTerminalProps {
  className?: string;
}

// Pixel grid coordinates for each letter in "MATRIKS AI"
// Each letter is defined as an array of [x, y] coordinates on a 5x7 grid per character
// The entire text spans approximately 85x7 pixels (including spacing)

const PIXEL_SIZE = 4;
const LETTER_WIDTH = 5;
const LETTER_HEIGHT = 7;
const LETTER_SPACING = 2;
const WORD_SPACING = 4;

// Letter definitions (5x7 pixel grid per letter, 1 = pixel on)
const LETTERS: Record<string, number[][]> = {
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  A: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  K: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  ' ': [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
};

// Convert text to pixel coordinates
function textToPixels(text: string): { x: number; y: number }[] {
  const pixels: { x: number; y: number }[] = [];
  let currentX = 0;

  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    const char = text[charIndex].toUpperCase();
    const letterGrid = LETTERS[char];

    if (letterGrid) {
      for (let row = 0; row < letterGrid.length; row++) {
        for (let col = 0; col < letterGrid[row].length; col++) {
          if (letterGrid[row][col] === 1) {
            pixels.push({
              x: currentX + col,
              y: row,
            });
          }
        }
      }
      currentX += LETTER_WIDTH + (char === ' ' ? WORD_SPACING : LETTER_SPACING);
    }
  }

  return pixels;
}

const TEXT = 'MATRIKS AI';
const ALL_PIXELS = textToPixels(TEXT);
const TOTAL_WIDTH = ALL_PIXELS.length > 0
  ? Math.max(...ALL_PIXELS.map((p) => p.x)) + 1
  : 0;

const STEP_DURATION = 80; // ms per pixel
const GLOW_DURATION = 200; // ms for glow to fade
const LOOP_PAUSE = 2000; // pause before restarting

/**
 * PixelTerminal - macOS-style terminal with pixel-drawing animation
 *
 * Animation: A red dot "draws" the text "MATRIKS AI" letter by letter
 * on a pixel grid, like a digital pen writing on graph paper.
 * Loops continuously.
 */
export function PixelTerminal({ className }: PixelTerminalProps) {
  const [drawnPixels, setDrawnPixels] = useState<Set<string>>(new Set());
  const [glowingPixels, setGlowingPixels] = useState<Set<string>>(new Set());
  const [dotPosition, setDotPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const glowTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const startDrawing = useCallback(() => {
    setIsDrawing(true);
    setDrawnPixels(new Set());
    setGlowingPixels(new Set());

    // Clear any existing glow timeouts
    glowTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    glowTimeoutsRef.current.clear();

    let currentPixelIndex = 0;

    const drawNextPixel = () => {
      if (currentPixelIndex >= ALL_PIXELS.length) {
        // Drawing complete - pause then restart
        setDotPosition(null);
        setIsDrawing(false);

        animationRef.current = setTimeout(() => {
          startDrawing();
        }, LOOP_PAUSE);
        return;
      }

      const pixel = ALL_PIXELS[currentPixelIndex];
      const pixelKey = `${pixel.x}-${pixel.y}`;

      // Move dot to this position
      setDotPosition(pixel);

      // Add pixel to drawn set
      setDrawnPixels((prev) => new Set([...prev, pixelKey]));

      // Add to glowing set
      setGlowingPixels((prev) => new Set([...prev, pixelKey]));

      // Remove from glowing after delay
      const glowTimeout = setTimeout(() => {
        setGlowingPixels((prev) => {
          const next = new Set(prev);
          next.delete(pixelKey);
          return next;
        });
      }, GLOW_DURATION);
      glowTimeoutsRef.current.set(pixelKey, glowTimeout);

      currentPixelIndex++;
      animationRef.current = setTimeout(drawNextPixel, STEP_DURATION);
    };

    animationRef.current = setTimeout(drawNextPixel, 500); // Initial delay
  }, []);

  useEffect(() => {
    startDrawing();

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
      glowTimeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [startDrawing]);

  const gridWidth = TOTAL_WIDTH * PIXEL_SIZE + 20;
  const gridHeight = LETTER_HEIGHT * PIXEL_SIZE + 20;

  return (
    <div
      className={cn(
        'rounded-xl overflow-hidden',
        'shadow-2xl',
        className
      )}
      style={{
        backgroundColor: 'rgb(30, 30, 30)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* macOS Window Chrome */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{
          background: 'linear-gradient(180deg, rgb(60, 60, 60) 0%, rgb(45, 45, 45) 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-[rgba(255,255,255,0.5)] font-medium">
            terminal — zsh
          </span>
        </div>
        <div className="w-[52px]" /> {/* Spacer for symmetry */}
      </div>

      {/* Terminal Content */}
      <div className="p-6" style={{ minHeight: 200 }}>
        {/* Command prompt line */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#28c840] text-sm font-mono">➜</span>
          <span className="text-[#89b4fa] text-sm font-mono">~</span>
          <span className="text-white text-sm font-mono">ready_</span>
          <motion.span
            className="w-2 h-4 bg-white ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>

        {/* Pixel Grid Area */}
        <div
          className="relative mx-auto"
          style={{
            width: gridWidth,
            height: gridHeight,
            marginTop: 20,
          }}
        >
          {/* Background grid dots (subtle) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: `${PIXEL_SIZE}px ${PIXEL_SIZE}px`,
            }}
          />

          {/* Drawn pixels */}
          {ALL_PIXELS.map((pixel, index) => {
            const pixelKey = `${pixel.x}-${pixel.y}`;
            const isDrawn = drawnPixels.has(pixelKey);
            const isGlowing = glowingPixels.has(pixelKey);

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: pixel.x * PIXEL_SIZE + 10,
                  top: pixel.y * PIXEL_SIZE + 10,
                  width: PIXEL_SIZE - 1,
                  height: PIXEL_SIZE - 1,
                  borderRadius: 1,
                }}
                initial={{ opacity: 0, backgroundColor: 'transparent' }}
                animate={{
                  opacity: isDrawn ? 1 : 0,
                  backgroundColor: isDrawn ? '#ef4444' : 'transparent',
                  boxShadow: isGlowing
                    ? '0 0 8px 2px rgba(239, 68, 68, 0.8)'
                    : '0 0 0 0 transparent',
                }}
                transition={{
                  opacity: { duration: 0.05 },
                  boxShadow: { duration: GLOW_DURATION / 1000 },
                }}
              />
            );
          })}

          {/* Drawing dot (red cursor) */}
          {dotPosition && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: PIXEL_SIZE + 4,
                height: PIXEL_SIZE + 4,
                backgroundColor: '#ef4444',
                boxShadow: '0 0 12px 4px rgba(239, 68, 68, 0.6)',
              }}
              animate={{
                left: dotPosition.x * PIXEL_SIZE + 10 - 2,
                top: dotPosition.y * PIXEL_SIZE + 10 - 2,
              }}
              transition={{
                duration: STEP_DURATION / 1000 * 0.8,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          )}
        </div>

        {/* Output line */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawnPixels.size > 0 ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[rgba(255,255,255,0.4)] text-xs font-mono">
            initializing AI services...
          </span>
        </motion.div>
      </div>
    </div>
  );
}
