import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from 'remotion';

/**
 * HowItWorksShowcase - Multi-state animation showcasing MATRIKS's 3-step process
 *
 * Duration: 30 seconds (900 frames @ 30fps)
 *
 * Animation sequence:
 * STEP 1 - Discovery Call (frames 0-300):
 *   - Calendly booking interface with date/time selection
 *   - User clicks "Book" button
 *   - Transition to "You have done your part" loading state
 *
 * STEP 2 - Prototype & Build (frames 300-600):
 *   - Implementation backlog with tasks being checked off
 *   - All tasks complete with strikethrough
 *   - Chat showing client approval flow
 *
 * STEP 3 - Launch & Automate (frames 600-900):
 *   - E-commerce website preview
 *   - Chatbot widget interaction
 *   - Deployed solution showcase
 */

// Theme colors (matching globals.css)
const COLORS = {
  accent: 'rgb(52, 145, 255)',
  dark: 'rgb(22, 22, 22)',
  background: 'rgb(245, 245, 245)',
  success: 'rgb(34, 197, 94)',
  white: 'rgb(255, 255, 255)',
  muted: 'rgba(0, 0, 0, 0.53)',
  cardBg: 'rgb(30, 30, 30)',
};

// Animation timing constants
const STEP_DURATION = 300; // frames per step
const STEP_1_START = 0;
const STEP_2_START = 300;
const STEP_3_START = 600;

export const HowItWorksShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine which step is active
  const currentStep = frame < STEP_2_START ? 1 : frame < STEP_3_START ? 2 : 3;

  // Calculate local frame within each step
  const localFrame =
    frame < STEP_2_START
      ? frame - STEP_1_START
      : frame < STEP_3_START
        ? frame - STEP_2_START
        : frame - STEP_3_START;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: 'transparent',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Main showcase container */}
      <div
        style={{
          width: 360,
          height: 480,
          margin: 'auto',
          position: 'relative',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Step 1: Discovery Call */}
        {currentStep === 1 && (
          <Step1DiscoveryCall localFrame={localFrame} fps={fps} />
        )}

        {/* Step 2: Prototype & Build */}
        {currentStep === 2 && (
          <Step2PrototypeBuild localFrame={localFrame} fps={fps} />
        )}

        {/* Step 3: Launch & Automate */}
        {currentStep === 3 && (
          <Step3LaunchAutomate localFrame={localFrame} fps={fps} />
        )}
      </div>

      {/* "Most Popular" style badge */}
      <MostPopularBadge frame={frame} currentStep={currentStep} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// STEP 1: Discovery Call - Calendly Booking Animation
// ═══════════════════════════════════════════════════════════════

interface StepProps {
  localFrame: number;
  fps: number;
}

const Step1DiscoveryCall: React.FC<StepProps> = ({ localFrame, fps }) => {
  // Phase 1: Show Calendly (frames 0-180)
  // Phase 2: Transition to "Your turn" (frames 180-220)
  // Phase 3: Show loading state (frames 220-300)

  const showCalendly = localFrame < 180;
  const isTransitioning = localFrame >= 180 && localFrame < 220;
  const showLoading = localFrame >= 200;

  // Calendly opacity
  const calendlyOpacity = interpolate(
    localFrame,
    [0, 20, 180, 210],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  // Loading card opacity
  const loadingOpacity = interpolate(
    localFrame,
    [190, 220],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Selected date animation (frame 40-60)
  const dateSelected = localFrame >= 50;
  // Selected time animation (frame 80-100)
  const timeSelected = localFrame >= 100;
  // Click "Confirm" animation (frame 140-160)
  const confirmClicked = localFrame >= 150;

  // Cursor position animation
  const cursorProgress = interpolate(
    localFrame,
    [30, 50, 80, 100, 130, 150, 160],
    [0, 1, 1, 2, 2, 3, 3.5],
    { extrapolateRight: 'clamp' }
  );

  const cursorPositions = [
    { x: 280, y: 380 }, // Start (off-screen bottom)
    { x: 145, y: 200 }, // Date cell
    { x: 180, y: 300 }, // Time slot
    { x: 180, y: 400 }, // Confirm button
    { x: 180, y: 400 }, // Hold on confirm
  ];

  const cursorX = interpolate(
    cursorProgress,
    [0, 1, 2, 3, 3.5],
    cursorPositions.map((p) => p.x)
  );
  const cursorY = interpolate(
    cursorProgress,
    [0, 1, 2, 3, 3.5],
    cursorPositions.map((p) => p.y)
  );

  const showCursor = localFrame >= 30 && localFrame < 170;

  return (
    <>
      {/* Calendly Interface */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.white,
          opacity: calendlyOpacity,
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontWeight: 700, fontSize: 16 }}>M</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: COLORS.dark }}>
              MATRIKS
            </p>
            <p style={{ margin: 0, fontSize: 11, color: COLORS.muted }}>
              Discovery Call • 30 min
            </p>
          </div>
        </div>

        {/* Calendar View */}
        <div style={{ padding: '16px 20px' }}>
          <p
            style={{
              margin: '0 0 12px 0',
              fontSize: 13,
              fontWeight: 600,
              color: COLORS.dark,
            }}
          >
            January 2026
          </p>

          {/* Week days header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 4,
              marginBottom: 8,
            }}
          >
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div
                key={i}
                style={{
                  textAlign: 'center',
                  fontSize: 10,
                  color: COLORS.muted,
                  padding: '4px 0',
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: 4,
            }}
          >
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const isSelected = day === 15 && dateSelected;
              const isAvailable = [8, 9, 10, 15, 16, 17, 22, 23, 24].includes(day);

              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 12,
                    fontWeight: isSelected ? 600 : 400,
                    backgroundColor: isSelected
                      ? COLORS.accent
                      : isAvailable
                        ? 'rgba(52, 145, 255, 0.1)'
                        : 'transparent',
                    color: isSelected
                      ? 'white'
                      : isAvailable
                        ? COLORS.accent
                        : 'rgba(0,0,0,0.25)',
                    cursor: isAvailable ? 'pointer' : 'default',
                    transition: 'all 0.2s ease',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        <div style={{ padding: '0 20px 16px' }}>
          <p
            style={{
              margin: '0 0 10px 0',
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.dark,
            }}
          >
            Available times
          </p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['9:00 AM', '10:30 AM', '2:00 PM', '4:30 PM'].map((time, i) => {
              const isTimeSelected = time === '10:30 AM' && timeSelected;
              return (
                <div
                  key={i}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 500,
                    backgroundColor: isTimeSelected ? COLORS.accent : 'rgba(0,0,0,0.05)',
                    color: isTimeSelected ? 'white' : COLORS.dark,
                    transition: 'all 0.2s ease',
                    transform: isTimeSelected ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {time}
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirm button */}
        <div style={{ padding: '0 20px 20px' }}>
          <div
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: 12,
              backgroundColor: confirmClicked ? COLORS.success : COLORS.accent,
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              textAlign: 'center',
              transform: confirmClicked ? 'scale(0.98)' : 'scale(1)',
              transition: 'all 0.15s ease',
            }}
          >
            {confirmClicked ? '✓ Booked!' : 'Confirm Booking'}
          </div>
        </div>
      </div>

      {/* Animated Cursor */}
      {showCursor && (
        <AnimatedCursor x={cursorX} y={cursorY} label="You" />
      )}

      {/* Loading State - "You have done your part" */}
      {showLoading && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: COLORS.cardBg,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: loadingOpacity,
            padding: 32,
          }}
        >
          <LoadingSpinner localFrame={localFrame - 200} />
          <p
            style={{
              margin: '24px 0 0 0',
              fontSize: 22,
              fontWeight: 600,
              color: 'white',
              textAlign: 'center',
            }}
          >
            You have done your part
          </p>
          <div
            style={{
              marginTop: 32,
              padding: '16px 32px',
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            It&apos;s our turn now
          </div>
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// STEP 2: Prototype & Build - Backlog + Client Chat
// ═══════════════════════════════════════════════════════════════

const BACKLOG_TASKS = [
  'Set up project structure',
  'Design database schema',
  'Build API endpoints',
  'Create UI components',
  'Integrate AI chatbot',
];

const Step2PrototypeBuild: React.FC<StepProps> = ({ localFrame, fps }) => {
  // Phase 1: Show backlog with tasks checking off (frames 0-180)
  // Phase 2: Transition to chat (frames 180-220)
  // Phase 3: Show client approval chat (frames 220-300)

  const showBacklog = localFrame < 180;
  const showChat = localFrame >= 170;

  // Backlog opacity
  const backlogOpacity = interpolate(
    localFrame,
    [0, 15, 170, 200],
    [0, 1, 1, 0],
    { extrapolateRight: 'clamp' }
  );

  // Chat opacity
  const chatOpacity = interpolate(
    localFrame,
    [180, 210],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  // Task completion timing (each task takes ~25 frames)
  const completedTasks = Math.min(
    5,
    Math.floor(interpolate(localFrame, [30, 150], [0, 5], { extrapolateRight: 'clamp' }))
  );

  return (
    <>
      {/* Backlog View */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.white,
          opacity: backlogOpacity,
          padding: 20,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: COLORS.dark,
              }}
            >
              Implementation Backlog
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: 11, color: COLORS.muted }}>
              Sprint 1 • E-commerce Chatbot
            </p>
          </div>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              backgroundColor: COLORS.accent,
              color: 'white',
              fontSize: 11,
              fontWeight: 600,
            }}
          >
            {completedTasks}/{BACKLOG_TASKS.length} Done
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            height: 6,
            borderRadius: 3,
            backgroundColor: 'rgba(0,0,0,0.08)',
            marginBottom: 20,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${(completedTasks / BACKLOG_TASKS.length) * 100}%`,
              backgroundColor: COLORS.success,
              borderRadius: 3,
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Task list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {BACKLOG_TASKS.map((task, i) => {
            const isCompleted = i < completedTasks;
            const isAnimating = i === completedTasks - 1 && localFrame % 30 < 15;

            return (
              <BacklogTask
                key={i}
                task={task}
                isCompleted={isCompleted}
                isAnimating={isAnimating}
                index={i}
              />
            );
          })}
        </div>

        {/* All done celebration */}
        {completedTasks === 5 && (
          <div
            style={{
              marginTop: 24,
              padding: 16,
              borderRadius: 12,
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              textAlign: 'center',
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: COLORS.success }}>
              🎉 All tasks completed!
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: 11, color: COLORS.muted }}>
              Ready for client review
            </p>
          </div>
        )}
      </div>

      {/* Client Approval Chat */}
      {showChat && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: COLORS.cardBg,
            opacity: chatOpacity,
          }}
        >
          <ClientApprovalChat localFrame={localFrame - 180} fps={fps} />
        </div>
      )}
    </>
  );
};

interface BacklogTaskProps {
  task: string;
  isCompleted: boolean;
  isAnimating: boolean;
  index: number;
}

const BacklogTask: React.FC<BacklogTaskProps> = ({ task, isCompleted, isAnimating, index }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        borderRadius: 12,
        backgroundColor: isCompleted ? 'rgba(34, 197, 94, 0.08)' : 'rgba(0,0,0,0.03)',
        border: `1px solid ${isCompleted ? 'rgba(34, 197, 94, 0.2)' : 'rgba(0,0,0,0.06)'}`,
        transform: isAnimating ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Checkbox */}
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          backgroundColor: isCompleted ? COLORS.success : 'white',
          border: `2px solid ${isCompleted ? COLORS.success : 'rgba(0,0,0,0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {isCompleted && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>

      {/* Task text */}
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: isCompleted ? COLORS.muted : COLORS.dark,
          textDecoration: isCompleted ? 'line-through' : 'none',
          flex: 1,
        }}
      >
        {task}
      </span>

      {/* Priority indicator */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: index < 2 ? '#ef4444' : index < 4 ? '#f59e0b' : '#22c55e',
        }}
      />
    </div>
  );
};

const ClientApprovalChat: React.FC<StepProps> = ({ localFrame, fps }) => {
  // Chat messages timing
  const showMatriksMsg = localFrame >= 20;
  const showClientMsg = localFrame >= 80;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>AL</span>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'white' }}>
            Alban Lika
          </p>
          <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
            Client • TechStore.al
          </p>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: COLORS.success,
          }}
        />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* MATRIKS message */}
        {showMatriksMsg && (
          <ChatMessage
            sender="matriks"
            text="Hi Alban! 👋 The chatbot is ready for review. We've integrated it with your product catalog and it can handle orders, FAQs, and support tickets. Ready to deploy?"
            localFrame={localFrame - 20}
          />
        )}

        {/* Typing indicator */}
        {localFrame >= 60 && localFrame < 80 && (
          <TypingIndicator isClient />
        )}

        {/* Client message */}
        {showClientMsg && (
          <ChatMessage
            sender="client"
            text="This looks absolutely perfect! 🎉 The responses are natural and it handles Albanian perfectly. Let's deploy it today!"
            localFrame={localFrame - 80}
          />
        )}
      </div>
    </div>
  );
};

interface ChatMessageProps {
  sender: 'matriks' | 'client';
  text: string;
  localFrame: number;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, text, localFrame }) => {
  const isMatriks = sender === 'matriks';
  const opacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(localFrame, [0, 15], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        alignSelf: isMatriks ? 'flex-start' : 'flex-end',
        maxWidth: '85%',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          padding: '14px 18px',
          borderRadius: isMatriks ? '18px 18px 18px 4px' : '18px 18px 4px 18px',
          backgroundColor: isMatriks ? COLORS.accent : 'rgba(255,255,255,0.1)',
          color: 'white',
        }}
      >
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{text}</p>
      </div>
      <p
        style={{
          margin: '6px 8px 0',
          fontSize: 10,
          color: 'rgba(255,255,255,0.4)',
          textAlign: isMatriks ? 'left' : 'right',
        }}
      >
        {isMatriks ? 'MATRIKS Team • Just now' : 'Alban • Just now'}
      </p>
    </div>
  );
};

const TypingIndicator: React.FC<{ isClient?: boolean }> = ({ isClient }) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        alignSelf: isClient ? 'flex-end' : 'flex-start',
        padding: '14px 20px',
        borderRadius: isClient ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        display: 'flex',
        gap: 5,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.6)',
            opacity: interpolate((frame + i * 5) % 20, [0, 10, 20], [0.3, 1, 0.3]),
            transform: `translateY(${interpolate((frame + i * 5) % 20, [0, 10, 20], [0, -3, 0])}px)`,
          }}
        />
      ))}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// STEP 3: Launch & Automate - E-commerce + Chatbot
// ═══════════════════════════════════════════════════════════════

const Step3LaunchAutomate: React.FC<StepProps> = ({ localFrame, fps }) => {
  // Phase 1: Show e-commerce site (frames 0-60)
  // Phase 2: Chatbot widget appears (frames 60-90)
  // Phase 3: Chat opens with conversation (frames 90-300)

  const siteOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const chatbotVisible = localFrame >= 50;
  const chatOpen = localFrame >= 90;

  // Chat widget animation
  const widgetScale = interpolate(
    localFrame,
    [50, 70],
    [0, 1],
    { extrapolateRight: 'clamp', easing: Easing.bezier(0.34, 1.56, 0.64, 1) }
  );

  // Chat panel animation
  const chatPanelScale = interpolate(
    localFrame,
    [90, 110],
    [0.9, 1],
    { extrapolateRight: 'clamp' }
  );
  const chatPanelOpacity = interpolate(
    localFrame,
    [90, 110],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        opacity: siteOpacity,
      }}
    >
      {/* E-commerce Website Mockup */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.white,
          overflow: 'hidden',
        }}
      >
        {/* Browser Chrome */}
        <div
          style={{
            height: 32,
            backgroundColor: 'rgb(240, 240, 240)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#28c840' }} />
          </div>
          <div
            style={{
              flex: 1,
              height: 20,
              backgroundColor: 'white',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
            }}
          >
            <span style={{ fontSize: 9, color: COLORS.muted }}>techstore.al</span>
          </div>
        </div>

        {/* Site Header */}
        <div
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.dark }}>
            TechStore
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Products', 'Deals', 'Support'].map((item) => (
              <span key={item} style={{ fontSize: 11, color: COLORS.muted }}>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Hero Banner */}
        <div
          style={{
            margin: 12,
            padding: 20,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.accent}, #6366f1)`,
            color: 'white',
          }}
        >
          <p style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>New Arrivals 🚀</p>
          <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.9 }}>
            Latest tech gadgets - 20% off
          </p>
        </div>

        {/* Product Grid */}
        <div
          style={{
            padding: '8px 12px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10,
          }}
        >
          {[
            { name: 'Wireless Earbuds', price: '€49.99', color: '#3b82f6' },
            { name: 'Smart Watch', price: '€129.99', color: '#8b5cf6' },
            { name: 'Power Bank', price: '€29.99', color: '#10b981' },
            { name: 'USB-C Hub', price: '€39.99', color: '#f59e0b' },
          ].map((product, i) => (
            <div
              key={i}
              style={{
                padding: 12,
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  height: 50,
                  borderRadius: 6,
                  backgroundColor: product.color,
                  opacity: 0.2,
                  marginBottom: 8,
                }}
              />
              <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: COLORS.dark }}>
                {product.name}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 700, color: COLORS.accent }}>
                {product.price}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Widget Button */}
      {chatbotVisible && !chatOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(52, 145, 255, 0.4)',
            transform: `scale(${widgetScale})`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {/* Notification dot */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 18,
              height: 18,
              borderRadius: '50%',
              backgroundColor: COLORS.success,
              border: '2px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>1</span>
          </div>
        </div>
      )}

      {/* Opened Chat Panel */}
      {chatOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            width: 280,
            height: 340,
            borderRadius: 16,
            backgroundColor: COLORS.cardBg,
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            transform: `scale(${chatPanelScale})`,
            opacity: chatPanelOpacity,
            transformOrigin: 'bottom right',
          }}
        >
          <EcommerceChatbot localFrame={localFrame - 90} fps={fps} />
        </div>
      )}
    </div>
  );
};

const EcommerceChatbot: React.FC<StepProps> = ({ localFrame }) => {
  const showWelcome = localFrame >= 10;
  const showUserMsg = localFrame >= 50;
  const showBotReply = localFrame >= 100;
  const showProductCard = localFrame >= 140;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: COLORS.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>M</span>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'white' }}>TechStore Bot</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: COLORS.success }} />
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>Online</span>
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'hidden' }}>
        {/* Welcome */}
        {showWelcome && (
          <MiniChatBubble
            text="Hi! 👋 How can I help you today?"
            isBot
            localFrame={localFrame - 10}
          />
        )}

        {/* User question */}
        {showUserMsg && (
          <MiniChatBubble
            text="Do you have wireless earbuds in stock?"
            isBot={false}
            localFrame={localFrame - 50}
          />
        )}

        {/* Bot typing then reply */}
        {localFrame >= 80 && localFrame < 100 && <TypingIndicator />}

        {showBotReply && (
          <MiniChatBubble
            text="Yes! We have 3 models available. Here's our best seller:"
            isBot
            localFrame={localFrame - 100}
          />
        )}

        {/* Product recommendation card */}
        {showProductCard && (
          <div
            style={{
              alignSelf: 'flex-start',
              width: '90%',
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.1)',
              opacity: interpolate(localFrame - 140, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
              transform: `translateY(${interpolate(localFrame - 140, [0, 15], [10, 0], { extrapolateRight: 'clamp' })}px)`,
            }}
          >
            <div style={{ display: 'flex', gap: 10 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 8,
                  backgroundColor: 'rgba(52, 145, 255, 0.2)',
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: 'white' }}>
                  Pro Wireless Earbuds
                </p>
                <p style={{ margin: '2px 0', fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>
                  Active Noise Cancelling
                </p>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: COLORS.accent }}>
                  €49.99
                </p>
              </div>
            </div>
            <div
              style={{
                marginTop: 8,
                padding: '8px 12px',
                borderRadius: 6,
                backgroundColor: COLORS.accent,
                textAlign: 'center',
              }}
            >
              <span style={{ fontSize: 10, fontWeight: 600, color: 'white' }}>Add to Cart</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: 10, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 20,
            backgroundColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>Type a message...</span>
        </div>
      </div>
    </div>
  );
};

interface MiniChatBubbleProps {
  text: string;
  isBot: boolean;
  localFrame: number;
}

const MiniChatBubble: React.FC<MiniChatBubbleProps> = ({ text, isBot, localFrame }) => {
  const opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(localFrame, [0, 12], [8, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        maxWidth: '85%',
        padding: '10px 14px',
        borderRadius: isBot ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
        backgroundColor: isBot ? 'rgba(255,255,255,0.1)' : COLORS.accent,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <p style={{ margin: 0, fontSize: 11, color: 'white', lineHeight: 1.4 }}>{text}</p>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface AnimatedCursorProps {
  x: number;
  y: number;
  label: string;
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ x, y, label }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-2px, -2px)',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      {/* Cursor arrow */}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 2L19 12L12 13L9 20L5 2Z"
          fill="black"
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      {/* Label badge */}
      <div
        style={{
          position: 'absolute',
          left: 16,
          top: 16,
          padding: '4px 10px',
          borderRadius: 12,
          backgroundColor: 'black',
          color: 'white',
          fontSize: 11,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  );
};

interface LoadingSpinnerProps {
  localFrame: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ localFrame }) => {
  const rotation = localFrame * 8; // 8 degrees per frame = ~4 rotations per second at 30fps

  return (
    <div style={{ position: 'relative', width: 80, height: 80 }}>
      {/* Cursor icon in center */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 2L19 12L12 13L9 20L5 2Z"
            fill="white"
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Rotating rays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const opacity = interpolate((i + localFrame / 3) % 8, [0, 4, 8], [0.3, 1, 0.3]);

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 3,
                height: 12,
                marginLeft: -1.5,
                marginTop: -32,
                backgroundColor: COLORS.accent,
                borderRadius: 2,
                opacity,
                transform: `rotate(${i * 45}deg)`,
                transformOrigin: '1.5px 32px',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const MostPopularBadge: React.FC<{ frame: number; currentStep: number }> = ({ frame, currentStep }) => {
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 30], [-10, 0], { extrapolateRight: 'clamp' });

  // Pulse animation
  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 50,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.8)',
        opacity,
        transform: `translateY(${y}px) scale(${pulse})`,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.accent} strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>
        Step {currentStep}
      </span>
    </div>
  );
};
