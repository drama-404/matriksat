import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

/**
 * ChatbotMockup - Full chatbot conversation flow for "How It Works" section
 *
 * Duration: 8 seconds (240 frames @ 30fps)
 *
 * Animation sequence:
 * - Frames 0-20: Chat interface fades in
 * - Frames 20-50: User message appears
 * - Frames 50-70: AI typing indicator
 * - Frames 70-100: AI response appears
 * - Frames 100-130: Follow-up exchange
 * - Frames 130-180: Booking confirmation flow
 * - Frames 180-220: Human handoff indicator
 * - Frames 220-240: Loop reset fade
 */

const CONVERSATION = [
  { sender: 'user' as const, text: 'Keni dhoma të lira?', delay: 25 },
  { sender: 'ai' as const, text: 'Po! Kemi 2 dhoma standard për datat tuaja. 🏨', delay: 75 },
  { sender: 'user' as const, text: 'Sa kushton për 3 net?', delay: 105 },
  { sender: 'ai' as const, text: '€210 totali (€70/natë). Doni ta rezervoj?', delay: 135 },
  { sender: 'user' as const, text: 'Po, rezervoje!', delay: 160 },
  { sender: 'ai' as const, text: '✅ Rezervimi u konfirmua! Konfirmimi do ju vijë me email.', delay: 185 },
];

export const ChatbotMockup: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Container fade in
  const containerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Typing indicators
  const typingIndicators = [
    { start: 55, end: 75 },   // Before first AI response
    { start: 115, end: 135 }, // Before second AI response
    { start: 165, end: 185 }, // Before confirmation
  ];

  // Human handoff notification
  const handoffVisible = frame >= 210;
  const handoffOpacity = interpolate(frame, [210, 220], [0, 1], { extrapolateRight: 'clamp' });
  const handoffY = interpolate(frame, [210, 220], [-10, 0], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        fontFamily: 'Inter, Satoshi, system-ui, sans-serif',
      }}
    >
      {/* Chat Container */}
      <div
        style={{
          width: 360,
          height: 460,
          backgroundColor: 'rgb(30, 30, 30)',
          borderRadius: 24,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
          opacity: containerOpacity,
          margin: 'auto',
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            backgroundColor: 'rgb(25, 25, 25)',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgb(196, 108, 78)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>M</span>
          </div>

          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'white', margin: 0 }}>
              MATRIKS Bot
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'rgb(34, 197, 94)',
                }}
              />
              <p style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>
                Online • Typically replies instantly
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div
          style={{
            flex: 1,
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            overflowY: 'hidden',
          }}
        >
          {/* Welcome Message */}
          <div
            style={{
              alignSelf: 'flex-start',
              maxWidth: '80%',
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              backgroundColor: 'rgb(50, 50, 50)',
              opacity: interpolate(frame, [10, 20], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <p style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.9)', margin: 0, lineHeight: 1.4 }}>
              Mirë se vini! 👋 Si mund t&apos;ju ndihmoj sot?
            </p>
          </div>

          {/* Conversation Messages */}
          {CONVERSATION.map((msg, i) => (
            <ChatBubble
              key={i}
              text={msg.text}
              sender={msg.sender}
              delay={msg.delay}
              frame={frame}
              fps={fps}
            />
          ))}

          {/* Typing Indicators */}
          {typingIndicators.map((indicator, i) => (
            <TypingIndicator
              key={i}
              startFrame={indicator.start}
              endFrame={indicator.end}
              frame={frame}
            />
          ))}
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: 24,
              backgroundColor: 'rgb(50, 50, 50)',
            }}
          >
            <span style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.3)' }}>
              Shkruaj një mesazh...
            </span>
          </div>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgb(196, 108, 78)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </div>
        </div>

        {/* Human Handoff Notification */}
        {handoffVisible && (
          <div
            style={{
              position: 'absolute',
              bottom: 80,
              left: 20,
              right: 20,
              backgroundColor: 'rgba(196, 108, 78, 0.15)',
              borderRadius: 12,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid rgba(196, 108, 78, 0.3)',
              opacity: handoffOpacity,
              transform: `translateY(${handoffY}px)`,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: 'rgb(196, 108, 78)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'white', margin: 0 }}>
                Dëshironi të flisni me një agjent?
              </p>
              <p style={{ fontSize: 10, color: 'rgba(255, 255, 255, 0.6)', margin: 0 }}>
                Mund t&apos;ju lidhim me ekipin tonë
              </p>
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Chat bubble component
interface ChatBubbleProps {
  text: string;
  sender: 'user' | 'ai';
  delay: number;
  frame: number;
  fps: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender, delay, frame, fps }) => {
  const isUser = sender === 'user';

  const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [delay, delay + 15], [10, 0], { extrapolateRight: 'clamp' });
  const scale = spring({ frame: frame - delay, fps, from: 0.95, to: 1, durationInFrames: 15 });

  if (frame < delay) return null;

  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        padding: '12px 16px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        backgroundColor: isUser ? 'rgb(196, 108, 78)' : 'rgb(50, 50, 50)',
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: 'white',
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {text}
      </p>
      {/* Timestamp */}
      <p
        style={{
          fontSize: 9,
          color: 'rgba(255, 255, 255, 0.4)',
          margin: 0,
          marginTop: 4,
          textAlign: isUser ? 'right' : 'left',
        }}
      >
        {isUser ? 'Tani' : '1 sek më parë'}
      </p>
    </div>
  );
};

// Typing indicator component
interface TypingIndicatorProps {
  startFrame: number;
  endFrame: number;
  frame: number;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ startFrame, endFrame, frame }) => {
  if (frame < startFrame || frame >= endFrame) return null;

  const localFrame = frame - startFrame;
  const opacity = interpolate(frame, [startFrame, startFrame + 5], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        alignSelf: 'flex-start',
        padding: '12px 18px',
        borderRadius: '18px 18px 18px 4px',
        backgroundColor: 'rgb(50, 50, 50)',
        display: 'flex',
        gap: 5,
        opacity,
      }}
    >
      {[0, 1, 2].map((i) => {
        const dotOpacity = interpolate(
          (localFrame + i * 5) % 20,
          [0, 10, 20],
          [0.3, 1, 0.3]
        );
        const dotY = interpolate(
          (localFrame + i * 5) % 20,
          [0, 10, 20],
          [0, -3, 0]
        );

        return (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              opacity: dotOpacity,
              transform: `translateY(${dotY}px)`,
            }}
          />
        );
      })}
    </div>
  );
};
