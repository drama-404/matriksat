import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo, AnimatedCheck } from '../ServiceDemo';

/**
 * GDPRComplianceDemo - Shows a compliance checklist with items being verified
 *
 * Animation sequence:
 * - Frames 0-30: Title + compliance card fades in
 * - Frames 30-90: Checklist items get verified one by one
 * - Frames 90-150: Feature pills + EU badge animate in
 * - Frames 150-180: Logo outro
 */

const CHECKLIST_ITEMS = [
  { id: 'consent', label: 'Consent Management', icon: '✓', delay: 10 },
  { id: 'access', label: 'Data Access Rights', icon: '✓', delay: 25 },
  { id: 'deletion', label: 'Right to Deletion', icon: '✓', delay: 40 },
  { id: 'portability', label: 'Data Portability', icon: '✓', delay: 55 },
  { id: 'audit', label: 'Audit Trail', icon: '✓', delay: 70 },
];

export const GDPRComplianceDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Count completed items
  const completedCount = CHECKLIST_ITEMS.filter((item) => frame >= item.delay + 10).length;
  const progress = (completedCount / CHECKLIST_ITEMS.length) * 100;

  return (
    <ServiceDemo accentColor="rgb(37, 99, 235)">
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
        {/* Compliance Card - ALWAYS visible */}
        <div
          style={{
            width: 200,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 14,
            }}
          >
            <ShieldIcon />
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgb(0, 0, 0)' }}>
              Compliance Check
            </span>
          </div>

          {/* Checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {CHECKLIST_ITEMS.map((item) => {
              const isChecked = frame >= item.delay + 10;
              const itemOpacity = interpolate(
                frame,
                [item.delay - 10, item.delay],
                [0.5, 1],
                { extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    opacity: itemOpacity,
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 4,
                      backgroundColor: isChecked ? 'rgb(34, 197, 94)' : 'rgb(245, 245, 245)',
                      border: isChecked ? 'none' : '1px solid rgba(0, 0, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'background-color 0.2s',
                    }}
                  >
                    {isChecked && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: `scale(${spring({ frame: frame - item.delay - 10, fps, from: 0, to: 1, durationInFrames: 10 })})`,
                        }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      color: isChecked ? 'rgb(0, 0, 0)' : 'rgba(0, 0, 0, 0.5)',
                      fontWeight: isChecked ? 500 : 400,
                      textDecoration: isChecked ? 'none' : 'none',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)' }}>Progress</span>
              <span
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: progress === 100 ? 'rgb(34, 197, 94)' : 'rgb(37, 99, 235)',
                }}
              >
                {Math.round(progress)}%
              </span>
            </div>
            <div
              style={{
                height: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: progress === 100 ? 'rgb(34, 197, 94)' : 'rgb(37, 99, 235)',
                  borderRadius: 2,
                  transition: 'width 0.3s',
                }}
              />
            </div>
          </div>
        </div>

        {/* EU Badge */}
        <div
          style={{
            opacity: interpolate(frame, [100, 115], [0, 1], { extrapolateRight: 'clamp' }),
            transform: `scale(${spring({ frame: frame - 100, fps, from: 0.8, to: 1, durationInFrames: 15 })})`,
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 12,
              backgroundColor: 'white',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <EUFlag />
            <span style={{ fontSize: 7, fontWeight: 600, color: 'rgb(37, 99, 235)' }}>
              GDPR
            </span>
            <span style={{ fontSize: 6, color: 'rgba(0, 0, 0, 0.5)' }}>Compliant</span>
          </div>
        </div>
      </div>
    </ServiceDemo>
  );
};

// Shield icon component
const ShieldIcon: React.FC = () => (
  <div
    style={{
      width: 24,
      height: 24,
      borderRadius: 6,
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
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
      stroke="rgb(37, 99, 235)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  </div>
);

// EU Flag component
const EUFlag: React.FC = () => (
  <div
    style={{
      width: 36,
      height: 24,
      backgroundColor: 'rgb(0, 51, 153)',
      borderRadius: 3,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}
  >
    {/* Stars in a circle pattern */}
    {Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const radius = 8;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: 3,
            height: 3,
            marginLeft: x - 1.5,
            marginTop: y - 1.5,
          }}
        >
          <StarShape />
        </div>
      );
    })}
  </div>
);

// Star shape for EU flag
const StarShape: React.FC = () => (
  <svg width="3" height="3" viewBox="0 0 10 10">
    <polygon
      points="5,0 6.18,3.82 10,3.82 6.91,6.18 8.09,10 5,7.64 1.91,10 3.09,6.18 0,3.82 3.82,3.82"
      fill="rgb(255, 204, 0)"
    />
  </svg>
);
