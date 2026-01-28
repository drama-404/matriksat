import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo } from '../ServiceDemo';

/**
 * MobileAppsDemo - Shows a phone mockup with app UI screens transitioning
 *
 * Animation sequence:
 * - Frames 0-30: Title + phone mockup fades in
 * - Frames 30-90: App screens transition (swipe effect)
 * - Frames 90-150: Feature pills animate in
 * - Frames 150-180: Logo outro
 */

const APP_SCREENS = [
  { id: 'home', delay: 5 },
  { id: 'booking', delay: 30 },
  { id: 'confirm', delay: 60 },
];

export const MobileAppsDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Determine current screen - screens transition
  const currentScreen =
    frame >= 60 ? 2 : frame >= 30 ? 1 : 0;

  return (
    <ServiceDemo accentColor="rgb(168, 85, 247)">
      {/* Phone Container - ALWAYS visible */}
      <div
        style={{
          width: 160,
          height: 300,
          backgroundColor: 'rgb(15, 15, 15)',
          borderRadius: 28,
          padding: 8,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          overflow: 'hidden',
        }}
      >
        {/* Screen Container */}
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(245, 245, 245)',
            borderRadius: 20,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Status Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 12px',
              backgroundColor: 'white',
            }}
          >
            <span style={{ fontSize: 9, fontWeight: 600, color: 'rgb(0, 0, 0)' }}>9:41</span>
            <div style={{ display: 'flex', gap: 3 }}>
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* App Screens */}
          <div
            style={{
              position: 'relative',
              height: 'calc(100% - 30px)',
              overflow: 'hidden',
            }}
          >
            {/* Screen 1: Home */}
            <AppScreen
              isActive={currentScreen === 0}
              slideDirection={currentScreen > 0 ? 'left' : 'none'}
              frame={frame}
            >
              <HomeScreen frame={frame} />
            </AppScreen>

            {/* Screen 2: Booking */}
            <AppScreen
              isActive={currentScreen === 1}
              slideDirection={currentScreen > 1 ? 'left' : currentScreen < 1 ? 'right' : 'none'}
              frame={frame}
              delay={55}
            >
              <BookingScreen frame={frame} />
            </AppScreen>

            {/* Screen 3: Confirmation */}
            <AppScreen
              isActive={currentScreen === 2}
              slideDirection={currentScreen < 2 ? 'right' : 'none'}
              frame={frame}
              delay={75}
            >
              <ConfirmScreen frame={frame} />
            </AppScreen>
          </div>

          {/* Home Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 40,
              height: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      {/* Swipe Gesture Indicator */}
      <SwipeIndicator frame={frame} />
    </ServiceDemo>
  );
};

// App Screen wrapper with slide transitions
interface AppScreenProps {
  isActive: boolean;
  slideDirection: 'left' | 'right' | 'none';
  frame: number;
  delay?: number;
  children: React.ReactNode;
}

const AppScreen: React.FC<AppScreenProps> = ({ isActive, slideDirection, frame, delay = 35, children }) => {
  const translateX = isActive
    ? interpolate(frame, [delay, delay + 15], [slideDirection === 'left' ? -100 : slideDirection === 'right' ? 100 : 0, 0], { extrapolateRight: 'clamp' })
    : slideDirection === 'left'
    ? -100
    : slideDirection === 'right'
    ? 100
    : 0;

  if (!isActive && slideDirection === 'none') return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translateX(${translateX}%)`,
        opacity: isActive ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

// Home Screen Content
const HomeScreen: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ padding: 12 }}>
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: 8,
        backgroundColor: 'rgb(168, 85, 247)',
        marginBottom: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>M</span>
    </div>
    <p style={{ fontSize: 12, fontWeight: 700, color: 'rgb(0, 0, 0)', margin: 0, marginBottom: 4 }}>
      Welcome back!
    </p>
    <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: 0, marginBottom: 12 }}>
      What would you like to do?
    </p>
    {['Book a room', 'My reservations', 'Support'].map((item, i) => (
      <div
        key={item}
        style={{
          padding: '10px 12px',
          backgroundColor: 'white',
          borderRadius: 8,
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        }}
      >
        <span style={{ fontSize: 9, fontWeight: 500, color: 'rgb(0, 0, 0)' }}>{item}</span>
        <ChevronRightIcon />
      </div>
    ))}
  </div>
);

// Booking Screen Content
const BookingScreen: React.FC<{ frame: number }> = ({ frame }) => (
  <div style={{ padding: 12 }}>
    <p style={{ fontSize: 11, fontWeight: 700, color: 'rgb(0, 0, 0)', margin: 0, marginBottom: 10 }}>
      Select dates
    </p>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: 3,
        marginBottom: 12,
      }}
    >
      {Array.from({ length: 14 }, (_, i) => (
        <div
          key={i}
          style={{
            aspectRatio: '1',
            borderRadius: 4,
            backgroundColor: i >= 4 && i <= 6 ? 'rgb(168, 85, 247)' : 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 7,
            color: i >= 4 && i <= 6 ? 'white' : 'rgb(0, 0, 0)',
            fontWeight: 500,
          }}
        >
          {i + 15}
        </div>
      ))}
    </div>
    <button
      style={{
        width: '100%',
        padding: 10,
        backgroundColor: 'rgb(168, 85, 247)',
        border: 'none',
        borderRadius: 8,
        color: 'white',
        fontSize: 10,
        fontWeight: 600,
      }}
    >
      Continue
    </button>
  </div>
);

// Confirm Screen Content
const ConfirmScreen: React.FC<{ frame: number }> = ({ frame }) => {
  const checkScale = spring({ frame: frame - 80, fps: 30, from: 0, to: 1, durationInFrames: 15 });

  return (
    <div
      style={{
        padding: 12,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: '50%',
          backgroundColor: 'rgb(34, 197, 94)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 12,
          transform: `scale(${checkScale})`,
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p style={{ fontSize: 12, fontWeight: 700, color: 'rgb(0, 0, 0)', margin: 0, marginBottom: 4 }}>
        Booking Confirmed!
      </p>
      <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: 0, textAlign: 'center' }}>
        Jan 19-21, 2024
      </p>
    </div>
  );
};

// Swipe gesture indicator
const SwipeIndicator: React.FC<{ frame: number }> = ({ frame }) => {
  const opacity = interpolate(frame, [40, 50, 70, 80], [0, 1, 1, 0], { extrapolateRight: 'clamp' });
  const x = interpolate(frame, [50, 70], [10, -10], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 80,
        right: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        opacity,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: '2px solid rgb(168, 85, 247)',
          transform: `translateX(${x}px)`,
        }}
      />
      <span style={{ fontSize: 8, color: 'rgb(168, 85, 247)', fontWeight: 500 }}>Swipe</span>
    </div>
  );
};

// Icon components
const SignalIcon: React.FC = () => (
  <svg width="10" height="8" viewBox="0 0 16 12" fill="rgb(0, 0, 0)">
    <rect x="0" y="8" width="3" height="4" rx="1" />
    <rect x="4.5" y="5" width="3" height="7" rx="1" />
    <rect x="9" y="2" width="3" height="10" rx="1" />
    <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.3" />
  </svg>
);

const WifiIcon: React.FC = () => (
  <svg width="12" height="9" viewBox="0 0 24 18" fill="rgb(0, 0, 0)">
    <path d="M12 18c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
    <path d="M12 10c-2.2 0-4.2.9-5.7 2.3l1.4 1.4c1.1-1.1 2.6-1.7 4.3-1.7s3.2.6 4.3 1.7l1.4-1.4C16.2 10.9 14.2 10 12 10z" opacity="0.7" />
    <path d="M12 4C8.1 4 4.6 5.6 2.1 8.1l1.4 1.4C5.6 7.4 8.6 6 12 6s6.4 1.4 8.5 3.5l1.4-1.4C19.4 5.6 15.9 4 12 4z" opacity="0.4" />
  </svg>
);

const BatteryIcon: React.FC = () => (
  <svg width="16" height="8" viewBox="0 0 26 12" fill="none">
    <rect x="0.5" y="0.5" width="22" height="11" rx="2.5" stroke="rgb(0, 0, 0)" strokeWidth="1" />
    <rect x="2" y="2" width="18" height="8" rx="1" fill="rgb(0, 0, 0)" />
    <path d="M23 4v4c1.1 0 2-.9 2-2s-.9-2-2-2z" fill="rgba(0, 0, 0, 0.4)" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgba(0, 0, 0, 0.3)" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
