'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PixelTerminalProps {
  className?: string;
}

// Pixel grid settings
const PIXEL_SIZE = 4;
const LETTER_WIDTH = 5;
const LETTER_HEIGHT = 7;
const LETTER_SPACING = 2;
const WORD_SPACING = 4;

// Letter definitions (5x7 pixel grid per letter, 1 = pixel on)
const LETTERS: Record<string, number[][]> = {
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
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
  L: [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  G: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
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

// Robot emoji pixel art (7x7 grid)
const ROBOT_PIXELS: number[][] = [
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 1, 1, 0, 1, 1, 0],
];

interface PixelData {
  x: number;
  y: number;
  isRobot: boolean;
}

// Convert text to pixel coordinates
function textToPixels(text: string): PixelData[] {
  const pixels: PixelData[] = [];
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
              isRobot: false,
            });
          }
        }
      }
      currentX += LETTER_WIDTH + (char === ' ' ? WORD_SPACING : LETTER_SPACING);
    }
  }

  return pixels;
}

// Get robot pixels with offset
function getRobotPixels(offsetX: number): PixelData[] {
  const pixels: PixelData[] = [];
  for (let row = 0; row < ROBOT_PIXELS.length; row++) {
    for (let col = 0; col < ROBOT_PIXELS[row].length; col++) {
      if (ROBOT_PIXELS[row][col] === 1) {
        pixels.push({
          x: offsetX + col,
          y: row,
          isRobot: true,
        });
      }
    }
  }
  return pixels;
}

const TEXT = 'BUILDING AI';
const TEXT_PIXELS = textToPixels(TEXT);
const TEXT_WIDTH = TEXT_PIXELS.length > 0 ? Math.max(...TEXT_PIXELS.map((p) => p.x)) + 1 : 0;

// Robot starts after text with some spacing
const ROBOT_OFFSET_X = TEXT_WIDTH + 4;
const ROBOT_PIXEL_LIST = getRobotPixels(ROBOT_OFFSET_X);

// Combine all pixels
const ALL_PIXELS = [...TEXT_PIXELS, ...ROBOT_PIXEL_LIST];
const TOTAL_WIDTH = ALL_PIXELS.length > 0 ? Math.max(...ALL_PIXELS.map((p) => p.x)) + 1 : 0;

// Colors
const COLOR_TEXT = '#ffffff';
const COLOR_ROBOT = 'var(--color-accent)';

// Animation timing - FASTER
const STEP_DURATION = 40; // ms per pixel (was 80)
const GLOW_DURATION = 150; // ms for glow to fade
const LOOP_PAUSE = 1500; // pause before restarting

/**
 * PixelTerminal - macOS-style terminal with pixel-drawing animation
 * Draws "DENADA DEV" + robot icon in white, with red drawing cursor
 */
export function PixelTerminal({ className }: PixelTerminalProps) {
  const [drawnPixels, setDrawnPixels] = useState<Set<string>>(new Set());
  const [glowingPixels, setGlowingPixels] = useState<Set<string>>(new Set());
  const [dotPosition, setDotPosition] = useState<{ x: number; y: number } | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const glowTimeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const startDrawing = useCallback(() => {
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

    animationRef.current = setTimeout(drawNextPixel, 300); // Initial delay
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

  const gridWidth = TOTAL_WIDTH * PIXEL_SIZE + 16;
  const gridHeight = LETTER_HEIGHT * PIXEL_SIZE + 16;

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
      {/* macOS Window Chrome - minimal */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{
          background: 'linear-gradient(180deg, rgb(55, 55, 55) 0%, rgb(40, 40, 40) 100%)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[10px] text-[rgba(255,255,255,0.4)] font-medium">
            terminal
          </span>
        </div>
        <div className="w-[40px]" />
      </div>

      {/* Terminal Content - minimal padding */}
      <div className="p-3 overflow-hidden">
        {/* Command prompt line */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[#28c840] text-xs font-mono">➜</span>
          <span className="text-[#89b4fa] text-xs font-mono">~</span>
          <span className="text-white text-xs font-mono">ready_</span>
          <motion.span
            className="w-1.5 h-3 bg-white ml-0.5"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          />
        </div>

        {/* Pixel Grid Area - takes maximum space */}
        <div
          className="relative mx-auto"
          style={{
            width: gridWidth,
            height: gridHeight,
          }}
        >
          {/* Background grid dots (subtle) */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: `${PIXEL_SIZE}px ${PIXEL_SIZE}px`,
            }}
          />

          {/* Drawn pixels - white for text, accent for robot */}
          {ALL_PIXELS.map((pixel, index) => {
            const pixelKey = `${pixel.x}-${pixel.y}`;
            const isDrawn = drawnPixels.has(pixelKey);
            const isGlowing = glowingPixels.has(pixelKey);
            const color = pixel.isRobot ? COLOR_ROBOT : COLOR_TEXT;

            return (
              <motion.div
                key={index}
                className="absolute"
                style={{
                  left: pixel.x * PIXEL_SIZE + 8,
                  top: pixel.y * PIXEL_SIZE + 8,
                  width: PIXEL_SIZE - 1,
                  height: PIXEL_SIZE - 1,
                  borderRadius: 1,
                }}
                initial={{ opacity: 0, backgroundColor: 'transparent' }}
                animate={{
                  opacity: isDrawn ? 1 : 0,
                  backgroundColor: isDrawn ? color : 'transparent',
                  boxShadow: isGlowing
                    ? '0 0 6px 2px rgba(239, 68, 68, 0.7)'
                    : '0 0 0 0 transparent',
                }}
                transition={{
                  opacity: { duration: 0.03 },
                  boxShadow: { duration: GLOW_DURATION / 1000 },
                }}
              />
            );
          })}

          {/* Drawing dot (RED cursor) */}
          {dotPosition && (
            <motion.div
              className="absolute rounded-full"
              style={{
                width: PIXEL_SIZE + 3,
                height: PIXEL_SIZE + 3,
                backgroundColor: '#ef4444',
                boxShadow: '0 0 10px 3px rgba(239, 68, 68, 0.6)',
              }}
              animate={{
                left: dotPosition.x * PIXEL_SIZE + 8 - 1.5,
                top: dotPosition.y * PIXEL_SIZE + 8 - 1.5,
              }}
              transition={{
                duration: STEP_DURATION / 1000 * 0.7,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
          )}
        </div>

        {/* Output line - minimal */}
        <motion.div
          className="mt-2 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: drawnPixels.size > 0 ? 0.5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-[rgba(255,255,255,0.35)] text-[10px] font-mono">
            ready to build...
          </span>
        </motion.div>
      </div>
    </div>
  );
}
