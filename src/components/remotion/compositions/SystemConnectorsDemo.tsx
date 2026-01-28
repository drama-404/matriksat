import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo } from '../ServiceDemo';

/**
 * SystemConnectorsDemo - Shows data flowing between connected systems
 *
 * Animation sequence:
 * - Frames 0-30: Title + system icons fade in
 * - Frames 30-90: Animated connection lines with data particles flowing
 * - Frames 90-150: Feature pills animate in
 * - Frames 150-180: Logo outro
 */

const SYSTEMS = [
  { id: 'crm', name: 'CRM', icon: '👤', x: 0, y: 0, delay: 5 },
  { id: 'email', name: 'Email', icon: '✉️', x: 120, y: -40, delay: 12 },
  { id: 'calendar', name: 'Calendar', icon: '📅', x: 120, y: 40, delay: 19 },
  { id: 'erp', name: 'ERP', icon: '📊', x: 240, y: 0, delay: 26 },
];

const CONNECTIONS = [
  { from: 'crm', to: 'email', delay: 20 },
  { from: 'crm', to: 'calendar', delay: 28 },
  { from: 'email', to: 'erp', delay: 38 },
  { from: 'calendar', to: 'erp', delay: 46 },
];

export const SystemConnectorsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <ServiceDemo accentColor="rgb(20, 184, 166)">
      {/* Container - ALWAYS visible */}
      <div
        style={{
          width: 300,
          height: 160,
          position: 'relative',
        }}
      >
        {/* Connection Lines */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
          }}
        >
          {CONNECTIONS.map((conn, i) => {
            const fromSystem = SYSTEMS.find((s) => s.id === conn.from)!;
            const toSystem = SYSTEMS.find((s) => s.id === conn.to)!;

            const lineOpacity = interpolate(
              frame,
              [conn.delay, conn.delay + 10],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );

            // Animated data particle
            const particleProgress = interpolate(
              (frame - conn.delay) % 40,
              [0, 40],
              [0, 1]
            );

            const x1 = fromSystem.x + 30 + 25;
            const y1 = fromSystem.y + 80 + 20;
            const x2 = toSystem.x + 30;
            const y2 = toSystem.y + 80 + 20;

            const particleX = x1 + (x2 - x1) * particleProgress;
            const particleY = y1 + (y2 - y1) * particleProgress;

            return (
              <g key={`${conn.from}-${conn.to}`} opacity={lineOpacity}>
                {/* Connection Line */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="rgba(20, 184, 166, 0.3)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
                {/* Data Particle */}
                {frame >= conn.delay + 15 && (
                  <circle
                    cx={particleX}
                    cy={particleY}
                    r="4"
                    fill="rgb(20, 184, 166)"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* System Nodes */}
        {SYSTEMS.map((system) => {
          const nodeOpacity = interpolate(
            frame,
            [system.delay, system.delay + 15],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          const nodeScale = spring({
            frame: frame - system.delay,
            fps,
            from: 0.8,
            to: 1,
            durationInFrames: 15,
          });

          // Pulse animation for active connections
          const isPulsing = frame >= system.delay + 20;
          const pulseScale = isPulsing
            ? 1 + Math.sin((frame - system.delay) * 0.15) * 0.05
            : 1;

          return (
            <div
              key={system.id}
              style={{
                position: 'absolute',
                left: system.x + 30,
                top: system.y + 80,
                transform: `translate(-50%, -50%) scale(${nodeScale * pulseScale})`,
                opacity: nodeOpacity,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                <span style={{ fontSize: 18 }}>{system.icon}</span>
                <span style={{ fontSize: 7, fontWeight: 600, color: 'rgba(0, 0, 0, 0.6)' }}>
                  {system.name}
                </span>
              </div>
            </div>
          );
        })}

        {/* Central Hub (MATRIKS) */}
        <div
          style={{
            position: 'absolute',
            left: 150,
            top: 80,
            transform: 'translate(-50%, -50%)',
            opacity: interpolate(frame, [25, 35], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              backgroundColor: 'rgb(20, 184, 166)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(20, 184, 166, 0.4)',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>M</span>
          </div>
        </div>

        {/* Status Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            opacity: interpolate(frame, [70, 80], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'rgb(34, 197, 94)',
            }}
          />
          <span style={{ fontSize: 9, color: 'rgba(0, 0, 0, 0.6)', fontWeight: 500 }}>
            All systems connected
          </span>
        </div>
      </div>
    </ServiceDemo>
  );
};
