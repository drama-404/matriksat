import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

/**
 * ServiceDemo Template
 *
 * Structure (6-second videos @ 30fps = 180 frames):
 * - Mockup container ALWAYS visible (no fade on loop restart)
 * - Frames 0-90: Content animations inside mockup
 * - Frames 150-180: Subtle logo pulse
 *
 * Note: Title and feature pills removed - service cards already display these
 */

interface ServiceDemoProps {
  accentColor?: string;
  children: React.ReactNode; // Custom mockup content (always visible)
}

export const ServiceDemo: React.FC<ServiceDemoProps> = ({
  accentColor = 'rgb(52, 145, 255)',
  children,
}) => {
  const frame = useCurrentFrame();

  // Logo subtle pulse at end
  const logoPulse = frame >= 150
    ? 1 + Math.sin((frame - 150) * 0.25) * 0.06
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'rgb(245, 245, 245)',
        fontFamily: 'Inter, Satoshi, system-ui, sans-serif',
      }}
    >
      {/* Custom Mockup Content - ALWAYS visible, centered */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {children}
      </div>

      {/* Logo - always visible with subtle pulse at end */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          transform: `scale(${logoPulse})`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            backgroundColor: accentColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>M</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/**
 * Utility: Animated chat message bubble
 */
interface ChatMessageProps {
  text: string;
  sender: 'user' | 'ai';
  delay: number;
  accentColor?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  text,
  sender,
  delay,
  accentColor = 'rgb(52, 145, 255)',
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [delay, delay + 15], [10, 0], { extrapolateRight: 'clamp' });

  const isUser = sender === 'user';

  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '75%',
        padding: '8px 14px',
        borderRadius: 16,
        backgroundColor: isUser ? accentColor : 'rgb(50, 50, 50)',
        color: 'white',
        fontSize: 13,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {text}
    </div>
  );
};

/**
 * Utility: Typing indicator (3 animated dots)
 */
interface TypingIndicatorProps {
  delay: number;
  duration: number;
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ delay, duration }) => {
  const frame = useCurrentFrame();

  const visible = frame >= delay && frame < delay + duration;
  if (!visible) return null;

  const localFrame = frame - delay;

  return (
    <div
      style={{
        alignSelf: 'flex-start',
        padding: '10px 16px',
        borderRadius: 16,
        backgroundColor: 'rgb(50, 50, 50)',
        display: 'flex',
        gap: 4,
      }}
    >
      {[0, 1, 2].map((i) => {
        const dotOpacity = interpolate(
          (localFrame + i * 5) % 20,
          [0, 10, 20],
          [0.3, 1, 0.3]
        );
        return (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              opacity: dotOpacity,
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * Utility: Animated checkmark
 */
interface AnimatedCheckProps {
  delay: number;
  size?: number;
  color?: string;
}

export const AnimatedCheck: React.FC<AnimatedCheckProps> = ({
  delay,
  size = 20,
  color = 'rgb(34, 197, 94)',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame: frame - delay, fps, from: 0, to: 1, durationInFrames: 15 });
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
};

/**
 * Utility: Animated progress bar
 */
interface ProgressBarProps {
  progress: number; // 0-100
  delay: number;
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  delay,
  color = 'rgb(52, 145, 255)',
  height = 6,
}) => {
  const frame = useCurrentFrame();

  const animatedProgress = interpolate(
    frame,
    [delay, delay + 30],
    [0, progress],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        width: '100%',
        height,
        borderRadius: height / 2,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: `${animatedProgress}%`,
          height: '100%',
          borderRadius: height / 2,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
