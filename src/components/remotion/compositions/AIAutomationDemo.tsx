import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo, ChatMessage, TypingIndicator, AnimatedCheck } from '../ServiceDemo';

/**
 * AIAutomationDemo - Category-level composition showcasing AI & Automation services
 *
 * Animation sequence (180 frames @ 30fps = 6s):
 * - Frames 0-60: Chatbot interface with typing messages
 * - Frames 60-120: Invoice being scanned, data extracting
 * - Frames 120-180: Workflow automation nodes connecting
 */

const CHAT_MESSAGES = [
  { sender: 'user' as const, text: 'Need help with order #4521', delay: 5 },
  { sender: 'ai' as const, text: 'Found it! Shipped yesterday, arrives Friday.', delay: 25 },
];

const WORKFLOW_NODES = [
  { id: 'trigger', label: 'Email', x: 0, y: 20, delay: 125 },
  { id: 'ai', label: 'AI', x: 70, y: 20, delay: 135 },
  { id: 'action', label: 'CRM', x: 140, y: 20, delay: 145 },
];

export const AIAutomationDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scene transitions - smooth fade between scenes
  const scene1Opacity = interpolate(frame, [0, 5, 50, 60], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const scene2Opacity = interpolate(frame, [55, 65, 110, 120], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const scene3Opacity = interpolate(frame, [115, 125, 175, 180], [0, 1, 1, 0.8], { extrapolateRight: 'clamp' });

  return (
    <ServiceDemo accentColor="rgb(52, 145, 255)">
      <div
        style={{
          width: 320,
          height: 220,
          position: 'relative',
        }}
      >
        {/* Scene 1: Chatbot Interface */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: scene1Opacity,
          }}
        >
          <ChatbotScene frame={frame} />
        </div>

        {/* Scene 2: Invoice OCR */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: scene2Opacity,
          }}
        >
          <InvoiceScene frame={frame} />
        </div>

        {/* Scene 3: Workflow Automation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity: scene3Opacity,
          }}
        >
          <WorkflowScene frame={frame} fps={fps} />
        </div>
      </div>
    </ServiceDemo>
  );
};

// Scene 1: Mini chatbot interface
const ChatbotScene: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      width: 200,
      height: 180,
      borderRadius: 16,
      backgroundColor: 'rgb(30, 30, 30)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
    }}
  >
    {/* Header */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          backgroundColor: 'rgb(52, 145, 255)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BotIcon />
      </div>
      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'white', margin: 0 }}>AI Assistant</p>
        <p style={{ fontSize: 8, color: 'rgba(255, 255, 255, 0.5)', margin: 0 }}>Always online</p>
      </div>
    </div>

    {/* Messages */}
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
      {CHAT_MESSAGES.map((msg, i) => (
        <ChatMessage
          key={i}
          text={msg.text}
          sender={msg.sender}
          delay={msg.delay}
          accentColor="rgb(52, 145, 255)"
        />
      ))}
      <TypingIndicator delay={15} duration={10} />
    </div>
  </div>
);

// Scene 2: Invoice scanning visualization
const InvoiceScene: React.FC<{ frame: number }> = ({ frame }) => {
  const scanLineY = interpolate(frame, [65, 90], [0, 100], { extrapolateRight: 'clamp' });
  const extractProgress = interpolate(frame, [85, 110], [0, 100], { extrapolateRight: 'clamp' });

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      {/* Invoice */}
      <div
        style={{
          width: 120,
          height: 150,
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 12,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ fontSize: 7, fontWeight: 700, color: 'rgba(0, 0, 0, 0.3)', marginBottom: 8 }}>
          INVOICE
        </div>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.06)',
              marginBottom: 6,
              borderRadius: 2,
              width: `${50 + (i * 10) % 40}%`,
            }}
          />
        ))}
        {/* Scan line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: `${scanLineY}%`,
            height: 2,
            backgroundColor: 'rgb(52, 145, 255)',
            boxShadow: '0 0 8px rgb(52, 145, 255)',
          }}
        />
      </div>

      {/* Arrow */}
      <div style={{ display: 'flex', gap: 4 }}>
        {[0, 1, 2].map((i) => {
          const dotOpacity = interpolate(frame, [75 + i * 5, 85 + i * 5], [0.3, 1], {
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={i}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: 'rgb(52, 145, 255)',
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </div>

      {/* Extracted Data */}
      <div
        style={{
          width: 120,
          backgroundColor: 'white',
          borderRadius: 8,
          padding: 10,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div style={{ fontSize: 9, fontWeight: 700, color: 'rgb(52, 145, 255)', marginBottom: 8 }}>
          Extracted
        </div>
        {[
          { label: 'Vendor', value: 'ACME' },
          { label: 'Amount', value: '€845' },
          { label: 'Date', value: '02/01' },
        ].map((field, i) => {
          const rowOpacity = interpolate(frame, [90 + i * 6, 100 + i * 6], [0, 1], {
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={field.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
                opacity: rowOpacity,
              }}
            >
              <span style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{field.label}</span>
              <span style={{ fontSize: 9, fontWeight: 600, color: 'rgb(0, 0, 0)' }}>{field.value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Scene 3: Workflow automation nodes
const WorkflowScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  return (
    <div
      style={{
        width: 280,
        height: 120,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Connection lines */}
      <svg
        width="280"
        height="120"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Line 1: Email -> AI */}
        <ConnectionLine frame={frame} delay={138} x1={75} y1={60} x2={115} y2={60} />
        {/* Line 2: AI -> CRM */}
        <ConnectionLine frame={frame} delay={148} x1={165} y1={60} x2={205} y2={60} />
      </svg>

      {/* Nodes */}
      {WORKFLOW_NODES.map((node) => (
        <WorkflowNode key={node.id} node={node} frame={frame} fps={fps} />
      ))}

      {/* Label */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          fontSize: 10,
          color: 'rgba(0, 0, 0, 0.5)',
          opacity: interpolate(frame, [155, 165], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Automated workflow
      </div>
    </div>
  );
};

// Workflow node component
interface WorkflowNodeProps {
  node: { id: string; label: string; x: number; y: number; delay: number };
  frame: number;
  fps: number;
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ node, frame, fps }) => {
  const scale = spring({ frame: frame - node.delay, fps, from: 0, to: 1, durationInFrames: 12 });
  const opacity = interpolate(frame, [node.delay, node.delay + 8], [0, 1], { extrapolateRight: 'clamp' });

  const nodeColors: Record<string, string> = {
    trigger: 'rgb(52, 145, 255)',
    ai: 'rgb(138, 154, 124)',
    action: 'rgb(196, 108, 78)',
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: node.x + 30,
        top: node.y,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: nodeColors[node.id] || 'rgb(100, 100, 100)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        }}
      >
        {node.id === 'trigger' && <MailIcon />}
        {node.id === 'ai' && <BrainIcon />}
        {node.id === 'action' && <DatabaseIcon />}
      </div>
      <span style={{ fontSize: 9, fontWeight: 600, color: 'rgb(60, 60, 60)' }}>{node.label}</span>
    </div>
  );
};

// Connection line with animated drawing
const ConnectionLine: React.FC<{
  frame: number;
  delay: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}> = ({ frame, delay, x1, y1, x2, y2 }) => {
  const progress = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateRight: 'clamp' });
  const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const dashOffset = lineLength * (1 - progress);

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="rgb(180, 180, 180)"
      strokeWidth="2"
      strokeDasharray={lineLength}
      strokeDashoffset={dashOffset}
      strokeLinecap="round"
    />
  );
};

// Icon components
const BotIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <line x1="12" y1="7" x2="12" y2="11" />
    <circle cx="8" cy="16" r="1" fill="white" />
    <circle cx="16" cy="16" r="1" fill="white" />
  </svg>
);

const MailIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const BrainIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08A2.5 2.5 0 0 0 12 19.5a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 12 4.5" />
    <path d="M12 4.5v15" />
  </svg>
);

const DatabaseIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
