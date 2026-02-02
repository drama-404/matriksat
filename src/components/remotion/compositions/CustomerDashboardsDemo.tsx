import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { ServiceDemo, ProgressBar } from '../ServiceDemo';

/**
 * CustomerDashboardsDemo - Shows a dashboard with animated charts and KPIs
 *
 * Dashboard container is ALWAYS visible - only chart bars and KPIs animate
 */

const CHART_BARS = [
  { height: 75, delay: 10, color: 'rgb(59, 130, 246)' },
  { height: 55, delay: 18, color: 'rgb(59, 130, 246)' },
  { height: 90, delay: 26, color: 'rgb(196, 108, 78)' },
  { height: 40, delay: 34, color: 'rgb(59, 130, 246)' },
  { height: 65, delay: 42, color: 'rgb(59, 130, 246)' },
  { height: 85, delay: 50, color: 'rgb(196, 108, 78)' },
];

const KPIS = [
  { label: 'Revenue', value: 24580, prefix: '€', delay: 5 },
  { label: 'Orders', value: 142, prefix: '', delay: 12 },
  { label: 'Customers', value: 89, prefix: '', delay: 19 },
];

export const CustomerDashboardsDemo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <ServiceDemo accentColor="rgb(59, 130, 246)">
      {/* Dashboard container - ALWAYS visible */}
      <div
        style={{
          width: 300,
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
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgb(0, 0, 0)' }}>
            Sales Overview
          </span>
          <span style={{ fontSize: 9, color: 'rgba(0, 0, 0, 0.4)' }}>Last 7 days</span>
        </div>

        {/* KPI Row - values animate */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          {KPIS.map((kpi) => {
            const animatedValue = Math.round(
              interpolate(
                frame,
                [kpi.delay, kpi.delay + 35],
                [0, kpi.value],
                { extrapolateRight: 'clamp' }
              )
            );

            return (
              <div key={kpi.label} style={{ flex: 1 }}>
                <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: 0, marginBottom: 2 }}>
                  {kpi.label}
                </p>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'rgb(0, 0, 0)', margin: 0 }}>
                  {kpi.prefix}{animatedValue.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bar Chart - bars animate height */}
        <div
          style={{
            height: 100,
            display: 'flex',
            alignItems: 'flex-end',
            gap: 8,
            padding: '0 8px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
          }}
        >
          {CHART_BARS.map((bar, i) => {
            const barHeight = interpolate(
              frame,
              [bar.delay, bar.delay + 20],
              [0, bar.height],
              { extrapolateRight: 'clamp' }
            );

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: barHeight,
                  backgroundColor: bar.color,
                  borderRadius: '4px 4px 0 0',
                }}
              />
            );
          })}
        </div>

        {/* Chart Labels */}
        <div style={{ display: 'flex', gap: 8, padding: '4px 8px' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <span
              key={day}
              style={{
                flex: 1,
                fontSize: 8,
                color: 'rgba(0, 0, 0, 0.4)',
                textAlign: 'center',
              }}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Progress Indicator */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)' }}>Monthly Goal</span>
            <span style={{ fontSize: 8, fontWeight: 600, color: 'rgb(59, 130, 246)' }}>78%</span>
          </div>
          <ProgressBar progress={78} delay={60} color="rgb(59, 130, 246)" height={4} />
        </div>
      </div>
    </ServiceDemo>
  );
};
