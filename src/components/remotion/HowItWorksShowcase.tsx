import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  useVideoConfig,
  Easing,
} from 'remotion';

/**
 * HowItWorksShowcase - Multi-state animation showcasing MATRIKS's 4-step process
 *
 * Duration: 40 seconds (1200 frames @ 30fps)
 *
 * STEP 1 - Understand Your Challenge (frames 0-300):
 *   - Calendly booking interface
 *   - Discovery notes appearing
 *   - "We're mapping your challenges" transition
 *
 * STEP 2 - Design Your Roadmap (frames 300-600):
 *   - Timeline with milestones
 *   - Team structure cards
 *   - Fixed cost breakdown
 *
 * STEP 3 - Build in Sprints (frames 600-900):
 *   - Implementation backlog with tasks
 *   - Sprint completion badge
 *   - Client approval chat
 *
 * STEP 4 - Scale Together (frames 900-1200):
 *   - Analytics dashboard
 *   - Feature stack growing
 *   - Partnership badge
 */

// Theme colors (matching globals.css - warm earth tones)
const COLORS = {
  accent: 'rgb(196, 108, 78)',
  dark: 'rgb(38, 35, 33)',
  background: 'rgb(252, 250, 247)',
  success: 'rgb(138, 154, 124)',
  white: 'rgb(255, 255, 255)',
  muted: 'rgba(38, 35, 33, 0.53)',
  cardBg: 'rgb(38, 35, 33)',
};

// Animation timing constants - 4 steps
const STEP_DURATION = 300;
const STEP_1_START = 0;
const STEP_2_START = 300;
const STEP_3_START = 600;
const STEP_4_START = 900;

export const HowItWorksShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine which step is active
  const currentStep =
    frame < STEP_2_START ? 1 :
    frame < STEP_3_START ? 2 :
    frame < STEP_4_START ? 3 : 4;

  // Calculate local frame within each step
  const localFrame =
    frame < STEP_2_START ? frame - STEP_1_START :
    frame < STEP_3_START ? frame - STEP_2_START :
    frame < STEP_4_START ? frame - STEP_3_START :
    frame - STEP_4_START;

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
        {currentStep === 1 && <Step1Understand localFrame={localFrame} fps={fps} />}
        {currentStep === 2 && <Step2Design localFrame={localFrame} fps={fps} />}
        {currentStep === 3 && <Step3Build localFrame={localFrame} fps={fps} />}
        {currentStep === 4 && <Step4Scale localFrame={localFrame} fps={fps} />}
      </div>

      {/* Step indicator badge */}
      <StepBadge frame={frame} currentStep={currentStep} />
    </AbsoluteFill>
  );
};

// ═══════════════════════════════════════════════════════════════
// STEP 1: Understand Your Challenge - Calendly + Discovery Notes
// ═══════════════════════════════════════════════════════════════

interface StepProps {
  localFrame: number;
  fps: number;
}

const Step1Understand: React.FC<StepProps> = ({ localFrame, fps }) => {
  const showCalendly = localFrame < 150;
  const showNotes = localFrame >= 140;

  const calendlyOpacity = interpolate(localFrame, [0, 20, 140, 170], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const notesOpacity = interpolate(localFrame, [150, 180], [0, 1], { extrapolateRight: 'clamp' });

  const dateSelected = localFrame >= 40;
  const timeSelected = localFrame >= 80;
  const confirmClicked = localFrame >= 120;

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
            padding: '16px 20px',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${COLORS.accent}, rgb(166, 88, 58))`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>M</span>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: COLORS.dark }}>MATRIKS</p>
            <p style={{ margin: 0, fontSize: 10, color: COLORS.muted }}>Discovery Call • 30 min</p>
          </div>
        </div>

        {/* Mini Calendar */}
        <div style={{ padding: '12px 16px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: 12, fontWeight: 600, color: COLORS.dark }}>
            January 2026
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 3 }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: 9, color: COLORS.muted, padding: 2 }}>{day}</div>
            ))}
            {Array.from({ length: 21 }, (_, i) => {
              const day = i + 8;
              const isSelected = day === 15 && dateSelected;
              const isAvailable = [9, 10, 15, 16, 17, 22, 23].includes(day);
              return (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: isSelected ? 600 : 400,
                    backgroundColor: isSelected ? COLORS.accent : isAvailable ? 'rgba(196, 108, 78, 0.1)' : 'transparent',
                    color: isSelected ? 'white' : isAvailable ? COLORS.accent : 'rgba(0,0,0,0.2)',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div style={{ padding: '0 16px 12px' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: 11, fontWeight: 600, color: COLORS.dark }}>Available times</p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['9:00 AM', '10:30 AM', '2:00 PM'].map((time, i) => {
              const isTimeSelected = time === '10:30 AM' && timeSelected;
              return (
                <div
                  key={i}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    fontSize: 11,
                    fontWeight: 500,
                    backgroundColor: isTimeSelected ? COLORS.accent : 'rgba(0,0,0,0.05)',
                    color: isTimeSelected ? 'white' : COLORS.dark,
                    transform: isTimeSelected ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  {time}
                </div>
              );
            })}
          </div>
        </div>

        {/* Confirm Button */}
        <div style={{ padding: '0 16px 16px' }}>
          <div
            style={{
              width: '100%',
              padding: '12px 20px',
              borderRadius: 10,
              backgroundColor: confirmClicked ? COLORS.success : COLORS.accent,
              color: 'white',
              fontSize: 13,
              fontWeight: 600,
              textAlign: 'center',
              transform: confirmClicked ? 'scale(0.98)' : 'scale(1)',
            }}
          >
            {confirmClicked ? '✓ Booked!' : 'Confirm Booking'}
          </div>
        </div>
      </div>

      {/* Discovery Notes Card */}
      {showNotes && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: COLORS.cardBg,
            opacity: notesOpacity,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <p style={{ margin: '0 0 20px 0', fontSize: 18, fontWeight: 700, color: 'white', textAlign: 'center' }}>
            📋 Discovery Notes
          </p>

          {/* Note items appearing one by one */}
          {[
            { label: 'Business Goal', value: 'Reduce support tickets by 50%', delay: 0 },
            { label: 'Challenge', value: 'Albanian + English support needed', delay: 30 },
            { label: 'Success Metric', value: 'Handle 80% of inquiries automatically', delay: 60 },
          ].map((note, i) => {
            const noteOpacity = interpolate(localFrame - 160, [note.delay, note.delay + 20], [0, 1], { extrapolateRight: 'clamp' });
            const noteY = interpolate(localFrame - 160, [note.delay, note.delay + 20], [10, 0], { extrapolateRight: 'clamp' });
            return (
              <div
                key={i}
                style={{
                  marginBottom: 16,
                  padding: '14px 16px',
                  borderRadius: 12,
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  opacity: noteOpacity,
                  transform: `translateY(${noteY}px)`,
                }}
              >
                <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: COLORS.accent, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {note.label}
                </p>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: 'white', lineHeight: 1.4 }}>
                  {note.value}
                </p>
              </div>
            );
          })}

          {/* Mapping message */}
          {localFrame >= 260 && (
            <div style={{ marginTop: 'auto', textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: COLORS.success,
                    animation: 'pulse 1s infinite',
                  }}
                />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                  Building your roadmap...
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════
// STEP 2: Design Your Roadmap - Timeline + Team + Cost
// ═══════════════════════════════════════════════════════════════

const MILESTONES = [
  { week: 'Week 1', label: 'Architecture & Design', color: '#3b82f6' },
  { week: 'Week 2-3', label: 'Core Build', color: COLORS.accent },
  { week: 'Week 4', label: 'Testing & Polish', color: '#8b5cf6' },
  { week: 'Week 5', label: 'Launch 🚀', color: COLORS.success },
];

const TEAM = [
  { role: 'Full-Stack Dev', icon: '💻' },
  { role: 'AI Engineer', icon: '🤖' },
  { role: 'Project Lead', icon: '📋' },
];

const Step2Design: React.FC<StepProps> = ({ localFrame }) => {
  const showTimeline = localFrame >= 20;
  const showTeam = localFrame >= 140;
  const showCost = localFrame >= 220;

  const bgOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: COLORS.white,
        opacity: bgOpacity,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 700, color: COLORS.dark, textAlign: 'center' }}>
        📍 Your Project Roadmap
      </p>

      {/* Timeline */}
      {showTimeline && (
        <div style={{ marginBottom: 20 }}>
          {MILESTONES.map((milestone, i) => {
            const milestoneDelay = i * 25;
            const milestoneOpacity = interpolate(localFrame - 20, [milestoneDelay, milestoneDelay + 15], [0, 1], { extrapolateRight: 'clamp' });
            const milestoneX = interpolate(localFrame - 20, [milestoneDelay, milestoneDelay + 15], [-20, 0], { extrapolateRight: 'clamp' });

            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 10,
                  opacity: milestoneOpacity,
                  transform: `translateX(${milestoneX}px)`,
                }}
              >
                <div
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: milestone.color,
                    flexShrink: 0,
                  }}
                />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.dark }}>{milestone.label}</span>
                  <span style={{ fontSize: 10, color: COLORS.muted }}>{milestone.week}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Team Structure */}
      {showTeam && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 10px 0', fontSize: 11, fontWeight: 600, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 1 }}>
            Your Team
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {TEAM.map((member, i) => {
              const teamDelay = i * 20;
              const teamOpacity = interpolate(localFrame - 140, [teamDelay, teamDelay + 15], [0, 1], { extrapolateRight: 'clamp' });
              const teamScale = interpolate(localFrame - 140, [teamDelay, teamDelay + 15], [0.8, 1], { extrapolateRight: 'clamp' });

              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    padding: '12px 8px',
                    borderRadius: 10,
                    backgroundColor: 'rgba(0,0,0,0.04)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    textAlign: 'center',
                    opacity: teamOpacity,
                    transform: `scale(${teamScale})`,
                  }}
                >
                  <span style={{ fontSize: 20 }}>{member.icon}</span>
                  <p style={{ margin: '4px 0 0', fontSize: 9, fontWeight: 500, color: COLORS.dark }}>{member.role}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Fixed Cost */}
      {showCost && (
        <div
          style={{
            marginTop: 'auto',
            padding: 16,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.accent}, rgb(166, 88, 58))`,
            opacity: interpolate(localFrame - 220, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `scale(${interpolate(localFrame - 220, [0, 20], [0.95, 1], { extrapolateRight: 'clamp' })})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' }}>
                Fixed Price
              </p>
              <p style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 700, color: 'white' }}>
                €4,500
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.9)' }}>✓ No surprises</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.9)' }}>✓ All-inclusive</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// STEP 3: Build in Sprints - Backlog + Sprint Badge + Chat
// ═══════════════════════════════════════════════════════════════

const BACKLOG_TASKS = [
  'Set up project architecture',
  'Design database schema',
  'Build API endpoints',
  'Create UI components',
  'Integrate AI chatbot',
];

const Step3Build: React.FC<StepProps> = ({ localFrame, fps }) => {
  const showBacklog = localFrame < 180;
  const showChat = localFrame >= 170;

  const backlogOpacity = interpolate(localFrame, [0, 15, 170, 200], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const chatOpacity = interpolate(localFrame, [180, 210], [0, 1], { extrapolateRight: 'clamp' });
  const completedTasks = Math.min(5, Math.floor(interpolate(localFrame, [30, 140], [0, 5], { extrapolateRight: 'clamp' })));

  return (
    <>
      {/* Backlog View */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: COLORS.white,
          opacity: backlogOpacity,
          padding: 16,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: COLORS.dark }}>Sprint 1 Backlog</p>
            <p style={{ margin: '2px 0 0', fontSize: 10, color: COLORS.muted }}>E-commerce Chatbot</p>
          </div>
          <div
            style={{
              padding: '5px 10px',
              borderRadius: 16,
              backgroundColor: completedTasks === 5 ? COLORS.success : COLORS.accent,
              color: 'white',
              fontSize: 10,
              fontWeight: 600,
            }}
          >
            {completedTasks === 5 ? '✓ Done!' : `${completedTasks}/${BACKLOG_TASKS.length}`}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 5, borderRadius: 3, backgroundColor: 'rgba(0,0,0,0.08)', marginBottom: 14, overflow: 'hidden' }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {BACKLOG_TASKS.map((task, i) => {
            const isCompleted = i < completedTasks;
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  borderRadius: 10,
                  backgroundColor: isCompleted ? 'rgba(138, 154, 124, 0.1)' : 'rgba(0,0,0,0.03)',
                  border: `1px solid ${isCompleted ? 'rgba(138, 154, 124, 0.2)' : 'rgba(0,0,0,0.06)'}`,
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    backgroundColor: isCompleted ? COLORS.success : 'white',
                    border: `2px solid ${isCompleted ? COLORS.success : 'rgba(0,0,0,0.2)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isCompleted && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: isCompleted ? COLORS.muted : COLORS.dark,
                    textDecoration: isCompleted ? 'line-through' : 'none',
                  }}
                >
                  {task}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Client Chat */}
      {showChat && (
        <div style={{ position: 'absolute', inset: 0, backgroundColor: COLORS.cardBg, opacity: chatOpacity }}>
          <ClientChat localFrame={localFrame - 180} />
        </div>
      )}
    </>
  );
};

const ClientChat: React.FC<{ localFrame: number }> = ({ localFrame }) => {
  const showMatriksMsg = localFrame >= 15;
  const showClientMsg = localFrame >= 70;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: 12 }}>AL</span>
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: 'white' }}>Alban Lika</p>
          <p style={{ margin: 0, fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Client • TechStore</p>
        </div>
        <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', backgroundColor: COLORS.success }} />
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {showMatriksMsg && (
          <ChatBubble
            text="Week 1 demo ready! 🎉 Chatbot handles orders, FAQs, and supports AL+EN."
            isBot
            localFrame={localFrame - 15}
          />
        )}
        {localFrame >= 50 && localFrame < 70 && <TypingDots />}
        {showClientMsg && (
          <ChatBubble
            text="Looking great! Let's add the analytics dashboard next week 👍"
            isBot={false}
            localFrame={localFrame - 70}
          />
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// STEP 4: Scale Together - Analytics + Features + Partnership
// ═══════════════════════════════════════════════════════════════

const Step4Scale: React.FC<StepProps> = ({ localFrame }) => {
  const showMetrics = localFrame >= 20;
  const showFeatures = localFrame >= 120;
  const showPartnership = localFrame >= 220;

  const bgOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // Animated metrics
  const messagesCount = Math.floor(interpolate(localFrame - 20, [0, 80], [1234, 12450], { extrapolateRight: 'clamp' }));
  const responseTime = interpolate(localFrame - 20, [0, 80], [120, 5], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: COLORS.cardBg,
        opacity: bgOpacity,
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p style={{ margin: '0 0 16px 0', fontSize: 16, fontWeight: 700, color: 'white', textAlign: 'center' }}>
        📈 3 Months Later...
      </p>

      {/* Metrics Cards */}
      {showMetrics && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
          <MetricCard
            label="Messages Handled"
            value={messagesCount.toLocaleString()}
            trend="+940%"
            delay={0}
            localFrame={localFrame - 20}
          />
          <MetricCard
            label="Response Time"
            value={`${Math.round(responseTime)} min`}
            trend="-96%"
            delay={20}
            localFrame={localFrame - 20}
          />
        </div>
      )}

      {/* Mini Chart */}
      {showMetrics && (
        <div style={{ marginBottom: 16, padding: 12, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: 60, gap: 4 }}>
            {[20, 35, 40, 55, 50, 65, 70, 80, 85, 95].map((h, i) => {
              const barDelay = i * 8;
              const barHeight = interpolate(localFrame - 40, [barDelay, barDelay + 20], [0, h], { extrapolateRight: 'clamp' });
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${barHeight}%`,
                    borderRadius: 3,
                    backgroundColor: i >= 7 ? COLORS.accent : 'rgba(196, 108, 78, 0.4)',
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Feature Stack */}
      {showFeatures && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ margin: '0 0 10px 0', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Features Added
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: 'Core Chatbot', emoji: '💬', delay: 0 },
              { label: 'Multi-language (AL+EN)', emoji: '🌍', delay: 20 },
              { label: 'Order Tracking', emoji: '📦', delay: 40 },
              { label: 'Analytics Dashboard', emoji: '📊', delay: 60 },
            ].map((feature, i) => {
              const featureOpacity = interpolate(localFrame - 120, [feature.delay, feature.delay + 15], [0, 1], { extrapolateRight: 'clamp' });
              const featureX = interpolate(localFrame - 120, [feature.delay, feature.delay + 15], [-15, 0], { extrapolateRight: 'clamp' });
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 12px',
                    borderRadius: 8,
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    opacity: featureOpacity,
                    transform: `translateX(${featureX}px)`,
                  }}
                >
                  <span style={{ fontSize: 14 }}>{feature.emoji}</span>
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'white' }}>{feature.label}</span>
                  <span style={{ marginLeft: 'auto', fontSize: 12, color: COLORS.success }}>✓</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Partnership Badge */}
      {showPartnership && (
        <div
          style={{
            marginTop: 'auto',
            padding: 14,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${COLORS.success}, rgb(108, 134, 94))`,
            textAlign: 'center',
            opacity: interpolate(localFrame - 220, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `scale(${interpolate(localFrame - 220, [0, 20], [0.95, 1], { extrapolateRight: 'clamp' })})`,
          }}
        >
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'white' }}>🤝 6 Months & Counting</p>
          <p style={{ margin: '4px 0 0', fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>Long-term partnership, not just a project</p>
        </div>
      )}
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  delay: number;
  localFrame: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend, delay, localFrame }) => {
  const opacity = interpolate(localFrame, [delay, delay + 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(localFrame, [delay, delay + 20], [0.9, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        padding: 12,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.1)',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <p style={{ margin: 0, fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{label}</p>
      <p style={{ margin: '6px 0 2px', fontSize: 18, fontWeight: 700, color: 'white' }}>{value}</p>
      <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.success }}>{trend}</span>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface ChatBubbleProps {
  text: string;
  isBot: boolean;
  localFrame: number;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isBot, localFrame }) => {
  const opacity = interpolate(localFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(localFrame, [0, 15], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        alignSelf: isBot ? 'flex-start' : 'flex-end',
        maxWidth: '85%',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          padding: '12px 16px',
          borderRadius: isBot ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
          backgroundColor: isBot ? COLORS.accent : 'rgba(255,255,255,0.1)',
          color: 'white',
        }}
      >
        <p style={{ margin: 0, fontSize: 12, lineHeight: 1.5 }}>{text}</p>
      </div>
    </div>
  );
};

const TypingDots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        alignSelf: 'flex-end',
        padding: '12px 16px',
        borderRadius: '16px 16px 4px 16px',
        backgroundColor: 'rgba(255,255,255,0.1)',
        display: 'flex',
        gap: 4,
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.6)',
            opacity: interpolate((frame + i * 5) % 20, [0, 10, 20], [0.3, 1, 0.3]),
            transform: `translateY(${interpolate((frame + i * 5) % 20, [0, 10, 20], [0, -2, 0])}px)`,
          }}
        />
      ))}
    </div>
  );
};

const StepBadge: React.FC<{ frame: number; currentStep: number }> = ({ frame, currentStep }) => {
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 30], [-10, 0], { extrapolateRight: 'clamp' });
  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;

  const stepLabels = ['Understand', 'Design', 'Build', 'Scale'];

  return (
    <div
      style={{
        position: 'absolute',
        top: 16,
        right: 40,
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
        {currentStep}. {stepLabels[currentStep - 1]}
      </span>
    </div>
  );
};
