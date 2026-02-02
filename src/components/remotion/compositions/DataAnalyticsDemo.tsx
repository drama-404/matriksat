import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo, ProgressBar } from '../ServiceDemo';

/**
 * DataAnalyticsDemo - Category-level composition showcasing Data & Analytics services
 *
 * Animation sequence (180 frames @ 30fps = 6s):
 * - Frames 0-30: Dashboard container fades in
 * - Frames 10-50: KPI cards animate with counting numbers
 * - Frames 30-80: Bar chart bars grow
 * - Frames 60-100: Line chart draws
 * - Frames 100-140: Pie chart segments animate
 * - Frames 140-180: "Insights" callout appears
 */

const KPI_DATA = [
  { label: 'Total Revenue', value: 142850, prefix: '€', suffix: '', color: 'rgb(52, 145, 255)', delay: 10 },
  { label: 'Conversion', value: 24.8, prefix: '', suffix: '%', color: 'rgb(138, 154, 124)', delay: 18 },
  { label: 'Avg. Order', value: 89, prefix: '€', suffix: '', color: 'rgb(196, 108, 78)', delay: 26 },
];

const BAR_DATA = [
  { value: 65, delay: 35 },
  { value: 80, delay: 40 },
  { value: 45, delay: 45 },
  { value: 90, delay: 50 },
  { value: 70, delay: 55 },
  { value: 55, delay: 60 },
];

const LINE_POINTS = [
  { x: 0, y: 60 },
  { x: 30, y: 45 },
  { x: 60, y: 55 },
  { x: 90, y: 30 },
  { x: 120, y: 40 },
  { x: 150, y: 20 },
];

const PIE_SEGMENTS = [
  { percent: 45, color: 'rgb(52, 145, 255)', label: 'Desktop', delay: 105 },
  { percent: 35, color: 'rgb(138, 154, 124)', label: 'Mobile', delay: 115 },
  { percent: 20, color: 'rgb(196, 108, 78)', label: 'Tablet', delay: 125 },
];

export const DataAnalyticsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dashboard entrance
  const dashboardOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const dashboardScale = spring({ frame: frame - 5, fps, from: 0.95, to: 1, durationInFrames: 15 });

  return (
    <ServiceDemo accentColor="rgb(52, 145, 255)">
      <div
        style={{
          width: 340,
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.12)',
          opacity: dashboardOpacity,
          transform: `scale(${dashboardScale})`,
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 700, color: 'rgb(0, 0, 0)', margin: 0 }}>
              Analytics Dashboard
            </h3>
            <p style={{ fontSize: 9, color: 'rgba(0, 0, 0, 0.5)', margin: 0 }}>
              Real-time insights
            </p>
          </div>
          <div
            style={{
              padding: '4px 10px',
              backgroundColor: 'rgba(52, 145, 255, 0.1)',
              borderRadius: 12,
              fontSize: 8,
              fontWeight: 600,
              color: 'rgb(52, 145, 255)',
            }}
          >
            Live
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          {KPI_DATA.map((kpi) => (
            <KPICard key={kpi.label} kpi={kpi} frame={frame} />
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: 'flex', gap: 12 }}>
          {/* Bar Chart */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 6px 0' }}>
              Monthly Sales
            </p>
            <BarChart frame={frame} />
          </div>

          {/* Line Chart */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 6px 0' }}>
              Traffic Trend
            </p>
            <LineChart frame={frame} />
          </div>

          {/* Pie Chart */}
          <div style={{ width: 80 }}>
            <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 6px 0' }}>
              By Device
            </p>
            <PieChart frame={frame} />
          </div>
        </div>

        {/* Insight Callout */}
        <InsightCallout frame={frame} />
      </div>
    </ServiceDemo>
  );
};

// KPI Card with animated counting
interface KPICardProps {
  kpi: typeof KPI_DATA[0];
  frame: number;
}

const KPICard: React.FC<KPICardProps> = ({ kpi, frame }) => {
  const animatedValue = interpolate(
    frame,
    [kpi.delay, kpi.delay + 30],
    [0, kpi.value],
    { extrapolateRight: 'clamp' }
  );

  const cardOpacity = interpolate(frame, [kpi.delay - 5, kpi.delay + 5], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Format value based on type
  const displayValue = kpi.suffix === '%'
    ? animatedValue.toFixed(1)
    : Math.round(animatedValue).toLocaleString();

  return (
    <div
      style={{
        flex: 1,
        padding: 10,
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 8,
        borderLeft: `3px solid ${kpi.color}`,
        opacity: cardOpacity,
      }}
    >
      <p style={{ fontSize: 7, color: 'rgba(0, 0, 0, 0.5)', margin: '0 0 4px 0' }}>
        {kpi.label}
      </p>
      <p style={{ fontSize: 14, fontWeight: 700, color: kpi.color, margin: 0 }}>
        {kpi.prefix}{displayValue}{kpi.suffix}
      </p>
    </div>
  );
};

// Bar Chart component
const BarChart: React.FC<{ frame: number }> = ({ frame }) => (
  <div
    style={{
      height: 60,
      display: 'flex',
      alignItems: 'flex-end',
      gap: 4,
      padding: '0 4px',
      backgroundColor: 'rgb(250, 250, 250)',
      borderRadius: 6,
    }}
  >
    {BAR_DATA.map((bar, i) => {
      const barHeight = interpolate(frame, [bar.delay, bar.delay + 15], [0, bar.value], {
        extrapolateRight: 'clamp',
      });

      return (
        <div
          key={i}
          style={{
            flex: 1,
            height: `${barHeight}%`,
            backgroundColor: 'rgb(52, 145, 255)',
            borderRadius: '3px 3px 0 0',
            opacity: 0.85,
          }}
        />
      );
    })}
  </div>
);

// Line Chart component
const LineChart: React.FC<{ frame: number }> = ({ frame }) => {
  // Calculate path progress
  const pathProgress = interpolate(frame, [65, 100], [0, 1], { extrapolateRight: 'clamp' });

  // Build SVG path
  const pathData = LINE_POINTS.map((point, i) => {
    const prefix = i === 0 ? 'M' : 'L';
    return `${prefix} ${point.x} ${point.y}`;
  }).join(' ');

  // Total path length (approximate)
  const totalLength = 180;
  const dashOffset = totalLength * (1 - pathProgress);

  return (
    <div
      style={{
        height: 60,
        backgroundColor: 'rgb(250, 250, 250)',
        borderRadius: 6,
        padding: 4,
        position: 'relative',
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 150 70" preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2].map((i) => (
          <line
            key={i}
            x1="0"
            y1={20 + i * 20}
            x2="150"
            y2={20 + i * 20}
            stroke="rgba(0, 0, 0, 0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Line path */}
        <path
          d={pathData}
          fill="none"
          stroke="rgb(138, 154, 124)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={totalLength}
          strokeDashoffset={dashOffset}
        />

        {/* Data points */}
        {LINE_POINTS.map((point, i) => {
          const pointOpacity = interpolate(
            frame,
            [70 + i * 5, 80 + i * 5],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          return (
            <circle
              key={i}
              cx={point.x}
              cy={point.y}
              r="3"
              fill="white"
              stroke="rgb(138, 154, 124)"
              strokeWidth="2"
              opacity={pointOpacity}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Pie Chart component
const PieChart: React.FC<{ frame: number }> = ({ frame }) => {
  const size = 56;
  const center = size / 2;
  const radius = 20;

  // Calculate segments
  let currentAngle = -90; // Start from top

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {PIE_SEGMENTS.map((segment) => {
          const segmentProgress = interpolate(
            frame,
            [segment.delay, segment.delay + 15],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          const angle = (segment.percent / 100) * 360 * segmentProgress;
          const startAngle = currentAngle;
          const endAngle = startAngle + angle;

          // Calculate arc path
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;

          const x1 = center + radius * Math.cos(startRad);
          const y1 = center + radius * Math.sin(startRad);
          const x2 = center + radius * Math.cos(endRad);
          const y2 = center + radius * Math.sin(endRad);

          const largeArc = angle > 180 ? 1 : 0;

          const pathData =
            angle > 0
              ? `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
              : '';

          // Update for next segment
          currentAngle = endAngle;

          return (
            <path
              key={segment.label}
              d={pathData}
              fill={segment.color}
              opacity={0.9}
            />
          );
        })}

        {/* Center circle for donut effect */}
        <circle cx={center} cy={center} r={10} fill="white" />
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {PIE_SEGMENTS.map((segment) => {
          const legendOpacity = interpolate(
            frame,
            [segment.delay + 10, segment.delay + 18],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          return (
            <div
              key={segment.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                opacity: legendOpacity,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 2,
                  backgroundColor: segment.color,
                }}
              />
              <span style={{ fontSize: 6, color: 'rgba(0, 0, 0, 0.6)' }}>
                {segment.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Insight callout that appears at the end
const InsightCallout: React.FC<{ frame: number }> = ({ frame }) => {
  const calloutOpacity = interpolate(frame, [145, 160], [0, 1], { extrapolateRight: 'clamp' });
  const calloutY = interpolate(frame, [145, 160], [10, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        marginTop: 12,
        padding: '8px 12px',
        backgroundColor: 'rgba(52, 145, 255, 0.08)',
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        opacity: calloutOpacity,
        transform: `translateY(${calloutY}px)`,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          backgroundColor: 'rgb(52, 145, 255)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LightbulbIcon />
      </div>
      <div>
        <p style={{ fontSize: 9, fontWeight: 600, color: 'rgb(0, 0, 0)', margin: 0 }}>
          Key Insight
        </p>
        <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.6)', margin: 0 }}>
          Mobile traffic up 23% this week
        </p>
      </div>
    </div>
  );
};

// Lightbulb icon
const LightbulbIcon: React.FC = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);
