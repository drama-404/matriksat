import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';
import { ServiceDemo } from '../ServiceDemo';

/**
 * ReviewManagementDemo - Shows reviews from multiple platforms aggregating
 *
 * Container is ALWAYS visible - only platform cards and stats animate
 */

const PLATFORMS = [
  { name: 'Google', icon: 'G', color: '#4285F4', reviews: 124, rating: 4.7, delay: 10 },
  { name: 'Booking', icon: 'B', color: '#003580', reviews: 89, rating: 4.5, delay: 25 },
  { name: 'TripAdvisor', icon: 'T', color: '#00AF87', reviews: 67, rating: 4.6, delay: 40 },
];

export const ReviewManagementDemo: React.FC = () => {
  const frame = useCurrentFrame();

  // Total stats animation
  const totalReviews = 280;
  const avgRating = 4.6;
  const animatedTotal = Math.round(interpolate(frame, [55, 80], [0, totalReviews], { extrapolateRight: 'clamp' }));
  const animatedRating = interpolate(frame, [55, 80], [0, avgRating], { extrapolateRight: 'clamp' });

  return (
    <ServiceDemo accentColor="rgb(234, 88, 12)">
      {/* Container - ALWAYS visible */}
      <div
        style={{
          width: 290,
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
        }}
      >
        {/* Header Stats - values animate */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >
          <div>
            <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: 0 }}>Total Reviews</p>
            <p style={{ fontSize: 20, fontWeight: 700, color: 'rgb(0, 0, 0)', margin: 0 }}>
              {animatedTotal}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: 0 }}>Avg. Rating</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ fontSize: 20, fontWeight: 700, color: 'rgb(234, 179, 8)' }}>
                {animatedRating.toFixed(1)}
              </span>
              <StarIcon />
            </div>
          </div>
        </div>

        {/* Platform Cards - these animate */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {PLATFORMS.map((platform) => {
            const cardOpacity = interpolate(
              frame,
              [platform.delay, platform.delay + 15],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );
            const cardX = interpolate(
              frame,
              [platform.delay, platform.delay + 15],
              [-20, 0],
              { extrapolateRight: 'clamp' }
            );
            const animatedReviews = Math.round(
              interpolate(
                frame,
                [platform.delay + 10, platform.delay + 30],
                [0, platform.reviews],
                { extrapolateRight: 'clamp' }
              )
            );

            return (
              <div
                key={platform.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: 10,
                  backgroundColor: 'rgb(250, 250, 250)',
                  borderRadius: 8,
                  opacity: cardOpacity,
                  transform: `translateX(${cardX}px)`,
                }}
              >
                {/* Platform Icon */}
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    backgroundColor: platform.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'white' }}>
                    {platform.icon}
                  </span>
                </div>

                {/* Platform Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'rgb(0, 0, 0)', margin: 0 }}>
                    {platform.name}
                  </p>
                  <p style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.5)', margin: 0 }}>
                    {animatedReviews} reviews
                  </p>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'rgb(0, 0, 0)' }}>
                    {platform.rating}
                  </span>
                  <StarIcon size={12} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Connection Lines (decorative) */}
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            opacity: interpolate(frame, [50, 60], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: 'rgb(234, 88, 12)',
                opacity: interpolate(
                  (frame + i * 5) % 20,
                  [0, 10, 20],
                  [0.3, 1, 0.3]
                ),
              }}
            />
          ))}
          <span style={{ fontSize: 8, color: 'rgba(0, 0, 0, 0.4)', marginLeft: 4 }}>
            Syncing...
          </span>
        </div>
      </div>
    </ServiceDemo>
  );
};

// Star icon component
const StarIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="rgb(234, 179, 8)"
    stroke="rgb(234, 179, 8)"
    strokeWidth="1"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
