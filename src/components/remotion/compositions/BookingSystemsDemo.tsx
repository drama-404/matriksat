import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo, AnimatedCheck } from '../ServiceDemo';

/**
 * BookingSystemsDemo - Shows a calendar with slots filling up and confirmation
 *
 * Calendar mockup is ALWAYS visible - only bookings/notifications animate
 */

const CALENDAR_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const CALENDAR_DATES = [13, 14, 15, 16, 17, 18, 19];
const BOOKED_SLOTS = [
  { day: 1, time: '10:00', delay: 15 },
  { day: 2, time: '14:00', delay: 28 },
  { day: 4, time: '11:00', delay: 41 },
  { day: 5, time: '15:00', delay: 54 },
];

export const BookingSystemsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Confirmation notification
  const notifOpacity = interpolate(frame, [65, 75], [0, 1], { extrapolateRight: 'clamp' });
  const notifY = interpolate(frame, [65, 75], [-20, 0], { extrapolateRight: 'clamp' });

  return (
    <ServiceDemo accentColor="rgb(59, 130, 246)">
      <div style={{ position: 'relative' }}>
        {/* Calendar Container - ALWAYS visible */}
        <div
          style={{
            width: 280,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 16,
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Calendar Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: 'rgb(0, 0, 0)' }}>
              January 2024
            </span>
            <div style={{ display: 'flex', gap: 4 }}>
              <ChevronIcon direction="left" />
              <ChevronIcon direction="right" />
            </div>
          </div>

          {/* Day Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
            {CALENDAR_DAYS.map((day) => (
              <div
                key={day}
                style={{
                  fontSize: 8,
                  fontWeight: 600,
                  color: 'rgba(0, 0, 0, 0.4)',
                  textAlign: 'center',
                  padding: 4,
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid - dates animate fill */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {CALENDAR_DATES.map((date, i) => {
              const bookedSlot = BOOKED_SLOTS.find((s) => s.day === i);
              const isBooked = bookedSlot && frame >= bookedSlot.delay;
              const bookingScale = bookedSlot
                ? spring({ frame: frame - bookedSlot.delay, fps, from: 0.8, to: 1, durationInFrames: 15 })
                : 1;

              return (
                <div
                  key={date}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 6,
                    backgroundColor: isBooked ? 'rgb(59, 130, 246)' : 'rgb(245, 245, 245)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 600,
                    color: isBooked ? 'white' : 'rgb(0, 0, 0)',
                    transform: `scale(${bookingScale})`,
                  }}
                >
                  {date}
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['09:00', '10:00', '11:00', '14:00', '15:00'].map((time) => {
              const isBooked = BOOKED_SLOTS.some((s) => s.time === time && frame >= s.delay);
              return (
                <span
                  key={time}
                  style={{
                    fontSize: 9,
                    padding: '4px 8px',
                    borderRadius: 4,
                    backgroundColor: isBooked ? 'rgba(59, 130, 246, 0.1)' : 'rgb(245, 245, 245)',
                    color: isBooked ? 'rgb(59, 130, 246)' : 'rgba(0, 0, 0, 0.5)',
                    fontWeight: isBooked ? 600 : 400,
                    textDecoration: isBooked ? 'line-through' : 'none',
                  }}
                >
                  {time}
                </span>
              );
            })}
          </div>
        </div>

        {/* Confirmation Notification - animates in */}
        <div
          style={{
            position: 'absolute',
            top: -30,
            right: -20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: '10px 14px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            opacity: notifOpacity,
            transform: `translateY(${notifY}px)`,
          }}
        >
          <AnimatedCheck delay={70} size={18} />
          <div>
            <p style={{ fontSize: 9, fontWeight: 600, color: 'rgb(0, 0, 0)', margin: 0 }}>
              Booking Confirmed!
            </p>
            <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: 0 }}>Thu 16, 11:00</p>
          </div>
        </div>
      </div>
    </ServiceDemo>
  );
};

// Chevron icon component
const ChevronIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
  <div
    style={{
      width: 20,
      height: 20,
      borderRadius: 4,
      backgroundColor: 'rgb(245, 245, 245)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(0, 0, 0, 0.5)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  </div>
);
