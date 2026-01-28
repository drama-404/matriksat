import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { ServiceDemo, AnimatedCheck } from '../ServiceDemo';

/**
 * InvoiceOCRDemo - Shows PDF invoice with extracted fields animating to a dashboard
 *
 * Mockups are ALWAYS visible - only content inside animates on loop restart
 */

const EXTRACTED_FIELDS = [
  { label: 'Vendor', value: 'ACME Corp', top: 25, delay: 10 },
  { label: 'Amount', value: '€1,245.00', top: 55, delay: 20 },
  { label: 'Date', value: '15/01/2024', top: 85, delay: 30 },
  { label: 'Invoice #', value: 'INV-2024-0042', top: 115, delay: 40 },
];

export const InvoiceOCRDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Data transfer animation (document to dashboard)
  const transferProgress = interpolate(frame, [50, 70], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <ServiceDemo accentColor="rgb(139, 92, 246)">
      <div style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
        {/* Invoice Document - ALWAYS visible */}
        <div
          style={{
            width: 140,
            height: 180,
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 12,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            position: 'relative',
          }}
        >
          {/* Invoice Header */}
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              color: 'rgba(0, 0, 0, 0.3)',
              marginBottom: 8,
              letterSpacing: 1,
            }}
          >
            INVOICE
          </div>

          {/* Scan lines (decorative) - always visible */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                height: 4,
                backgroundColor: 'rgba(0, 0, 0, 0.06)',
                marginBottom: 6,
                borderRadius: 2,
                width: `${60 + (i * 7) % 30}%`,
              }}
            />
          ))}

          {/* Highlight boxes for extracted fields - these animate */}
          {EXTRACTED_FIELDS.map((field) => {
            const highlightOpacity = interpolate(
              frame,
              [field.delay, field.delay + 10],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );
            const pulseScale = interpolate(
              frame,
              [field.delay, field.delay + 5, field.delay + 15],
              [0.95, 1.05, 1],
              { extrapolateRight: 'clamp' }
            );

            return (
              <div
                key={field.label}
                style={{
                  position: 'absolute',
                  left: 8,
                  top: field.top,
                  width: 120,
                  height: 18,
                  border: '2px solid rgb(139, 92, 246)',
                  borderRadius: 4,
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  opacity: highlightOpacity,
                  transform: `scale(${pulseScale})`,
                }}
              />
            );
          })}
        </div>

        {/* Arrow / Transfer Animation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          {[0, 1, 2].map((i) => {
            const dotOpacity = interpolate(
              frame,
              [50 + i * 5, 60 + i * 5],
              [0.3, 1],
              { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
            );
            return (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: 'rgb(139, 92, 246)',
                  opacity: dotOpacity * transferProgress,
                }}
              />
            );
          })}
        </div>

        {/* Data Dashboard Preview - ALWAYS visible (structure) */}
        <div
          style={{
            width: 140,
            backgroundColor: 'white',
            borderRadius: 8,
            padding: 10,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 700,
              color: 'rgb(139, 92, 246)',
              marginBottom: 10,
            }}
          >
            Extracted Data
          </div>

          {/* Data rows - these animate */}
          {EXTRACTED_FIELDS.map((field, i) => {
            const rowOpacity = interpolate(
              frame,
              [55 + i * 8, 65 + i * 8],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );

            return (
              <div
                key={field.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                  opacity: rowOpacity,
                }}
              >
                <span style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)' }}>{field.label}</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: 'rgb(0, 0, 0)' }}>
                  {field.value}
                </span>
              </div>
            );
          })}

          {/* Success indicator */}
          <div
            style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <AnimatedCheck delay={85} size={14} color="rgb(34, 197, 94)" />
            <span
              style={{
                fontSize: 8,
                color: 'rgb(34, 197, 94)',
                fontWeight: 600,
                opacity: interpolate(frame, [88, 95], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            >
              Processed
            </span>
          </div>
        </div>
      </div>
    </ServiceDemo>
  );
};
