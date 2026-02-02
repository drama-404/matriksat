import React from 'react';
import { useCurrentFrame } from 'remotion';
import { ServiceDemo, ChatMessage, TypingIndicator } from '../ServiceDemo';

/**
 * ChatbotsDemo - Shows a mobile chat interface with multilingual messages
 *
 * Phone mockup is ALWAYS visible - only chat content animates on loop restart
 */

const MESSAGES = [
  { sender: 'user' as const, text: 'Keni dhoma të lira?', delay: 10 },
  { sender: 'ai' as const, text: 'Po! 2 dhoma standard për datat tuaja. 🏨', delay: 35 },
  { sender: 'user' as const, text: 'Sa kushton për 3 net?', delay: 55 },
  { sender: 'ai' as const, text: '€210 total. Doni ta rezervoj tani?', delay: 80 },
];

export const ChatbotsDemo: React.FC = () => {
  return (
    <ServiceDemo>
      {/* Phone mockup - ALWAYS visible */}
      <div
        style={{
          width: 180,
          height: 320,
          borderRadius: 24,
          backgroundColor: 'rgb(30, 30, 30)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Chat Header - always visible */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: 'rgb(196, 108, 78)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>M</span>
          </div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'white', margin: 0 }}>Hotel Bot</p>
            <p style={{ fontSize: 9, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>Online</p>
          </div>
          <div
            style={{
              marginLeft: 'auto',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'rgb(138, 154, 124)',
            }}
          />
        </div>

        {/* Chat Messages - these animate */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            padding: '12px',
            overflowY: 'hidden',
          }}
        >
          {MESSAGES.map((msg, i) => (
            <ChatMessage key={i} text={msg.text} sender={msg.sender} delay={msg.delay} />
          ))}
          <TypingIndicator delay={25} duration={10} />
          <TypingIndicator delay={70} duration={10} />
        </div>

        {/* Input Area - always visible */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 12px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div
            style={{
              flex: 1,
              padding: '8px 14px',
              borderRadius: 20,
              backgroundColor: 'rgb(50, 50, 50)',
            }}
          >
            <span style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.3)' }}>Type a message...</span>
          </div>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: 'rgb(196, 108, 78)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SendIcon />
          </div>
        </div>
      </div>
    </ServiceDemo>
  );
};

// Send icon SVG
const SendIcon: React.FC = () => (
  <svg
    width="12"
    height="12"
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
);
