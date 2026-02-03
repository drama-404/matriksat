import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo } from '../ServiceDemo';

/**
 * ProductDesignDemo - Category-level composition showcasing Product Design services
 *
 * Animation sequence (180 frames @ 30fps = 6s):
 * - Frames 0-30: Wireframe sketch appears
 * - Frames 30-70: Wireframe morphs into high-fidelity mockup
 * - Frames 70-120: Design system components animate in (colors, typography)
 * - Frames 120-180: Final polish with subtle animations
 */

const COLOR_PALETTE = [
  { color: 'rgb(52, 145, 255)', label: 'Primary', delay: 80 },
  { color: 'rgb(138, 154, 124)', label: 'Success', delay: 88 },
  { color: 'rgb(196, 108, 78)', label: 'Accent', delay: 96 },
  { color: 'rgb(22, 22, 22)', label: 'Dark', delay: 104 },
];

const TYPOGRAPHY = [
  { weight: 700, size: 14, label: 'Heading', delay: 112 },
  { weight: 500, size: 11, label: 'Body', delay: 120 },
  { weight: 400, size: 9, label: 'Caption', delay: 128 },
];

export const ProductDesignDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Transition from wireframe to high-fidelity (0 = wireframe, 1 = final)
  const morphProgress = interpolate(frame, [30, 70], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <ServiceDemo accentColor="rgb(52, 145, 255)">
      <div
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'flex-start',
        }}
      >
        {/* Main UI Mockup */}
        <UIMockup frame={frame} morphProgress={morphProgress} fps={fps} />

        {/* Design System Panel */}
        <DesignSystemPanel frame={frame} />
      </div>
    </ServiceDemo>
  );
};

// UI Mockup that transforms from wireframe to high-fidelity
interface UIMockupProps {
  frame: number;
  morphProgress: number;
  fps: number;
}

const UIMockup: React.FC<UIMockupProps> = ({ frame, morphProgress, fps }) => {
  // Entrance animation
  const mockupOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const mockupScale = spring({ frame: frame - 5, fps, from: 0.9, to: 1, durationInFrames: 15 });

  // Wireframe properties (gray, dashed borders, placeholder boxes)
  // Final properties (colored, solid, real content)
  const bgColor = interpolate(morphProgress, [0, 1], [0.97, 1], { extrapolateRight: 'clamp' });
  const borderOpacity = interpolate(morphProgress, [0, 1], [1, 0], { extrapolateRight: 'clamp' });
  const contentOpacity = interpolate(morphProgress, [0.3, 1], [0, 1], { extrapolateRight: 'clamp' });
  const wireframeOpacity = interpolate(morphProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: 240,
        height: 300,
        backgroundColor: `rgb(${Math.round(bgColor * 250)}, ${Math.round(bgColor * 250)}, ${Math.round(bgColor * 250)})`,
        borderRadius: 12,
        padding: 12,
        boxShadow: `0 16px 48px rgba(0, 0, 0, ${0.08 + morphProgress * 0.12})`,
        opacity: mockupOpacity,
        transform: `scale(${mockupScale})`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Wireframe overlay (disappears as morphProgress increases) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 12,
          opacity: wireframeOpacity,
          pointerEvents: 'none',
        }}
      >
        <WireframeContent />
      </div>

      {/* Final content (appears as morphProgress increases) */}
      <div
        style={{
          opacity: contentOpacity,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              backgroundColor: 'rgb(52, 145, 255)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>M</span>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 20,
                  height: 4,
                  backgroundColor: i === 0 ? 'rgb(52, 145, 255)' : 'rgba(0, 0, 0, 0.1)',
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero section */}
        <div
          style={{
            marginBottom: 12,
            padding: 10,
            backgroundColor: 'rgb(52, 145, 255)',
            borderRadius: 8,
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, color: 'white', margin: 0, marginBottom: 4 }}>
            Welcome back
          </p>
          <p style={{ fontSize: 7, color: 'rgba(255, 255, 255, 0.8)', margin: 0 }}>
            Your dashboard is ready
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          {[
            { value: '142', label: 'Orders', color: 'rgb(52, 145, 255)' },
            { value: '€8K', label: 'Revenue', color: 'rgb(138, 154, 124)' },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                flex: 1,
                padding: 8,
                backgroundColor: 'white',
                borderRadius: 6,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
              }}
            >
              <p style={{ fontSize: 12, fontWeight: 700, color: card.color, margin: 0 }}>
                {card.value}
              </p>
              <p style={{ fontSize: 7, color: 'rgba(0, 0, 0, 0.5)', margin: 0 }}>
                {card.label}
              </p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            style={{
              flex: 1,
              padding: '8px 0',
              backgroundColor: 'rgb(22, 22, 22)',
              border: 'none',
              borderRadius: 6,
              color: 'white',
              fontSize: 8,
              fontWeight: 600,
            }}
          >
            View All
          </button>
          <button
            style={{
              flex: 1,
              padding: '8px 0',
              backgroundColor: 'transparent',
              border: '1px solid rgba(0, 0, 0, 0.15)',
              borderRadius: 6,
              color: 'rgb(0, 0, 0)',
              fontSize: 8,
              fontWeight: 500,
            }}
          >
            Settings
          </button>
        </div>

        {/* Bottom nav preview */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px 16px',
            backgroundColor: 'white',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {['home', 'search', 'user'].map((icon, i) => (
            <div
              key={icon}
              style={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                backgroundColor: i === 0 ? 'rgb(52, 145, 255)' : 'rgba(0, 0, 0, 0.1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Morphing indicator */}
      {morphProgress > 0 && morphProgress < 1 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 20,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          <MagicWandIcon />
          <span style={{ fontSize: 8, fontWeight: 600, color: 'rgb(52, 145, 255)' }}>
            Designing...
          </span>
        </div>
      )}
    </div>
  );
};

// Wireframe placeholder content
const WireframeContent: React.FC = () => (
  <div style={{ height: '100%' }}>
    {/* Header wireframe */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <div
        style={{
          width: 28,
          height: 28,
          border: '2px dashed rgba(0, 0, 0, 0.2)',
          borderRadius: 8,
        }}
      />
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 20,
              height: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </div>

    {/* Hero wireframe */}
    <div
      style={{
        marginBottom: 12,
        padding: 10,
        border: '2px dashed rgba(0, 0, 0, 0.15)',
        borderRadius: 8,
      }}
    >
      <div style={{ height: 8, width: '60%', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 2, marginBottom: 6 }} />
      <div style={{ height: 6, width: '80%', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 2 }} />
    </div>

    {/* Cards wireframe */}
    <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: 8,
            border: '2px dashed rgba(0, 0, 0, 0.1)',
            borderRadius: 6,
          }}
        >
          <div style={{ height: 10, width: '50%', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 2, marginBottom: 4 }} />
          <div style={{ height: 6, width: '70%', backgroundColor: 'rgba(0, 0, 0, 0.05)', borderRadius: 2 }} />
        </div>
      ))}
    </div>

    {/* Buttons wireframe */}
    <div style={{ display: 'flex', gap: 6 }}>
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 28,
            border: '2px dashed rgba(0, 0, 0, 0.1)',
            borderRadius: 6,
          }}
        />
      ))}
    </div>
  </div>
);

// Design System Panel showing colors and typography
const DesignSystemPanel: React.FC<{ frame: number }> = ({ frame }) => {
  const panelOpacity = interpolate(frame, [70, 85], [0, 1], { extrapolateRight: 'clamp' });
  const panelX = interpolate(frame, [70, 85], [20, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: 110,
        opacity: panelOpacity,
        transform: `translateX(${panelX}px)`,
      }}
    >
      {/* Design System header */}
      <div
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: 'rgb(0, 0, 0)',
          marginBottom: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <DesignSystemIcon />
        Design System
      </div>

      {/* Color Palette */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 7, color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Colors
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {COLOR_PALETTE.map((item) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 10], [0, 1], {
              extrapolateRight: 'clamp',
            });
            const itemScale = interpolate(frame, [item.delay, item.delay + 10], [0.8, 1], {
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  opacity: itemOpacity,
                  transform: `scale(${itemScale})`,
                }}
              >
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    backgroundColor: item.color,
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                  }}
                />
                <span style={{ fontSize: 6, color: 'rgba(0, 0, 0, 0.5)' }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 7, color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Typography
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {TYPOGRAPHY.map((item) => {
            const itemOpacity = interpolate(frame, [item.delay, item.delay + 10], [0, 1], {
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={item.label}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 8,
                  opacity: itemOpacity,
                }}
              >
                <span
                  style={{
                    fontSize: item.size,
                    fontWeight: item.weight,
                    color: 'rgb(0, 0, 0)',
                  }}
                >
                  Aa
                </span>
                <span style={{ fontSize: 7, color: 'rgba(0, 0, 0, 0.4)' }}>{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Components preview */}
      <div>
        <p style={{ fontSize: 7, color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Components
        </p>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            opacity: interpolate(frame, [135, 150], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              padding: '4px 8px',
              backgroundColor: 'rgb(52, 145, 255)',
              borderRadius: 4,
              fontSize: 7,
              fontWeight: 600,
              color: 'white',
              textAlign: 'center',
            }}
          >
            Button
          </div>
          <div
            style={{
              padding: '4px 8px',
              backgroundColor: 'white',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: 4,
              fontSize: 7,
              color: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            Input field
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon components
const MagicWandIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(52, 145, 255)" strokeWidth="2">
    <path d="M15 4V2" />
    <path d="M15 16v-2" />
    <path d="M8 9h2" />
    <path d="M20 9h2" />
    <path d="M17.8 11.8L19 13" />
    <path d="M15 9h0" />
    <path d="M17.8 6.2L19 5" />
    <path d="m3 21 9-9" />
    <path d="M12.2 6.2L11 5" />
  </svg>
);

const DesignSystemIcon: React.FC = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(52, 145, 255)" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
  </svg>
);
