import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo } from '../ServiceDemo';

/**
 * CustomAppsDemo - Category-level composition showcasing Custom Application Development
 *
 * Animation sequence (180 frames @ 30fps = 6s):
 * - Frames 0-30: Laptop mockup appears with web app
 * - Frames 30-60: UI elements animate in on laptop
 * - Frames 60-90: Phone mockup slides in
 * - Frames 90-150: Sync animation showing responsive design
 * - Frames 150-180: "Same data, any device" label fades in
 */

export const CustomAppsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Laptop entrance
  const laptopScale = spring({ frame: frame - 5, fps, from: 0.9, to: 1, durationInFrames: 20 });
  const laptopOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // Phone entrance (slides in from right)
  const phoneX = interpolate(frame, [60, 80], [60, 0], { extrapolateRight: 'clamp' });
  const phoneOpacity = interpolate(frame, [60, 75], [0, 1], { extrapolateRight: 'clamp' });

  // Sync pulse animation
  const syncPulse = frame >= 100 && frame <= 140 ? 1 + Math.sin((frame - 100) * 0.2) * 0.03 : 1;

  // Label fade in
  const labelOpacity = interpolate(frame, [150, 165], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <ServiceDemo accentColor="rgb(52, 145, 255)">
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 20,
          position: 'relative',
        }}
      >
        {/* Laptop Mockup */}
        <div
          style={{
            opacity: laptopOpacity,
            transform: `scale(${laptopScale})`,
          }}
        >
          <LaptopMockup frame={frame} syncPulse={syncPulse} />
        </div>

        {/* Phone Mockup */}
        <div
          style={{
            opacity: phoneOpacity,
            transform: `translateX(${phoneX}px) scale(${syncPulse})`,
          }}
        >
          <PhoneMockup frame={frame} />
        </div>

        {/* Sync indicator */}
        <SyncIndicator frame={frame} />

        {/* Label */}
        <div
          style={{
            position: 'absolute',
            bottom: -35,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: labelOpacity,
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ fontSize: 11, color: 'rgba(0, 0, 0, 0.5)', fontWeight: 500 }}>
            Same data, any device
          </span>
        </div>
      </div>
    </ServiceDemo>
  );
};

// Laptop mockup with web app UI
const LaptopMockup: React.FC<{ frame: number; syncPulse: number }> = ({ frame, syncPulse }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    {/* Screen */}
    <div
      style={{
        width: 220,
        height: 140,
        backgroundColor: 'rgb(30, 30, 30)',
        borderRadius: '8px 8px 0 0',
        padding: 6,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(250, 250, 250)',
          borderRadius: 4,
          overflow: 'hidden',
          display: 'flex',
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: 45,
            backgroundColor: 'rgb(22, 22, 22)',
            padding: '8px 6px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              backgroundColor: 'rgb(52, 145, 255)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 10, fontWeight: 700, color: 'white' }}>M</span>
          </div>
          {[0, 1, 2, 3].map((i) => {
            const itemOpacity = interpolate(frame, [20 + i * 5, 30 + i * 5], [0, 1], {
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  width: '100%',
                  height: 4,
                  backgroundColor: i === 0 ? 'rgb(52, 145, 255)' : 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 2,
                  opacity: itemOpacity,
                }}
              />
            );
          })}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: 8 }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgb(0, 0, 0)' }}>Dashboard</span>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                backgroundColor: 'rgb(52, 145, 255)',
                opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            />
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {[
              { label: 'Orders', value: '142', color: 'rgb(52, 145, 255)' },
              { label: 'Revenue', value: '€8.4K', color: 'rgb(138, 154, 124)' },
              { label: 'Users', value: '89', color: 'rgb(196, 108, 78)' },
            ].map((stat, i) => {
              const cardOpacity = interpolate(frame, [35 + i * 8, 45 + i * 8], [0, 1], {
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: 4,
                    padding: 6,
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                    opacity: cardOpacity,
                  }}
                >
                  <p style={{ fontSize: 6, color: 'rgba(0, 0, 0, 0.5)', margin: 0 }}>{stat.label}</p>
                  <p style={{ fontSize: 10, fontWeight: 700, color: stat.color, margin: 0 }}>
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Chart placeholder */}
          <div
            style={{
              height: 35,
              backgroundColor: 'white',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'flex-end',
              gap: 3,
              padding: '6px 8px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
            }}
          >
            {[40, 60, 35, 80, 55, 70, 45].map((h, i) => {
              const barHeight = interpolate(frame, [45 + i * 3, 55 + i * 3], [0, h], {
                extrapolateRight: 'clamp',
              });
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${barHeight}%`,
                    backgroundColor: 'rgb(52, 145, 255)',
                    borderRadius: 2,
                    opacity: 0.8,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>

    {/* Laptop base */}
    <div
      style={{
        width: 250,
        height: 8,
        backgroundColor: 'rgb(180, 180, 180)',
        borderRadius: '0 0 4px 4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: 40,
          height: 3,
          backgroundColor: 'rgb(150, 150, 150)',
          borderRadius: 2,
        }}
      />
    </div>
  </div>
);

// Phone mockup with mobile app UI
const PhoneMockup: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      width: 80,
      height: 160,
      backgroundColor: 'rgb(20, 20, 20)',
      borderRadius: 16,
      padding: 4,
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.25)',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 12,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px 8px',
          backgroundColor: 'rgb(52, 145, 255)',
        }}
      >
        <span style={{ fontSize: 6, fontWeight: 600, color: 'white' }}>9:41</span>
        <div style={{ display: 'flex', gap: 2 }}>
          <div
            style={{ width: 8, height: 4, backgroundColor: 'white', borderRadius: 1, opacity: 0.8 }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 6 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 4,
              backgroundColor: 'rgb(52, 145, 255)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 8, fontWeight: 700, color: 'white' }}>M</span>
          </div>
          <span style={{ fontSize: 8, fontWeight: 600, color: 'rgb(0, 0, 0)' }}>Dashboard</span>
        </div>

        {/* Mobile stats */}
        {[
          { label: 'Orders', value: '142', delay: 75 },
          { label: 'Revenue', value: '€8.4K', delay: 82 },
          { label: 'Users', value: '89', delay: 89 },
        ].map((stat) => {
          const rowOpacity = interpolate(frame, [stat.delay, stat.delay + 10], [0, 1], {
            extrapolateRight: 'clamp',
          });
          return (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 8px',
                backgroundColor: 'white',
                borderRadius: 6,
                marginBottom: 4,
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                opacity: rowOpacity,
              }}
            >
              <span style={{ fontSize: 7, color: 'rgba(0, 0, 0, 0.6)' }}>{stat.label}</span>
              <span style={{ fontSize: 8, fontWeight: 700, color: 'rgb(52, 145, 255)' }}>
                {stat.value}
              </span>
            </div>
          );
        })}

        {/* Mini chart */}
        <div
          style={{
            marginTop: 6,
            padding: 6,
            backgroundColor: 'white',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 2,
            height: 30,
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          }}
        >
          {[40, 60, 35, 80, 55].map((h, i) => {
            const barOpacity = interpolate(frame, [95 + i * 4, 105 + i * 4], [0, 1], {
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  backgroundColor: 'rgb(52, 145, 255)',
                  borderRadius: 1,
                  opacity: barOpacity * 0.8,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Home indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0' }}>
        <div
          style={{
            width: 28,
            height: 3,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  </div>
);

// Sync indicator showing data connection
const SyncIndicator: React.FC<{ frame: number }> = ({ frame }) => {
  const visible = frame >= 110 && frame <= 145;
  if (!visible) return null;

  const opacity = interpolate(frame, [110, 120, 135, 145], [0, 1, 1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        opacity,
      }}
    >
      <SyncIcon />
      <span style={{ fontSize: 8, color: 'rgb(52, 145, 255)', fontWeight: 600 }}>Synced</span>
    </div>
  );
};

// Sync icon
const SyncIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(52, 145, 255)" strokeWidth="2">
    <path d="M21.5 2v6h-6M2.5 22v-6h6" />
    <path d="M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
  </svg>
);
