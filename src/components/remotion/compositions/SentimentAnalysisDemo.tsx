import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { ServiceDemo } from '../ServiceDemo';

/**
 * SentimentAnalysisDemo - Shows review text with sentiment scoring
 *
 * Container is ALWAYS visible - only review content and gauges animate
 */

const REVIEWS = [
  {
    text: '"Shërbim i shkëlqyer! Do të kthehem përsëri."',
    sentiment: 'positive',
    score: 92,
    emoji: '😊',
    delay: 10,
  },
  {
    text: '"Çmimi i mirë, por parkimi i vështirë."',
    sentiment: 'neutral',
    score: 58,
    emoji: '😐',
    delay: 30,
  },
  {
    text: '"Stafi ishte tepër i sjellshëm dhe i gatshëm!"',
    sentiment: 'positive',
    score: 88,
    emoji: '😊',
    delay: 50,
  },
];

export const SentimentAnalysisDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Overall sentiment
  const overallScore = 79;
  const gaugeProgress = interpolate(frame, [65, 85], [0, overallScore], { extrapolateRight: 'clamp' });

  return (
    <ServiceDemo accentColor="rgb(196, 108, 78)">
      {/* Container - ALWAYS visible */}
      <div
        style={{
          width: 280,
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
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: 'rgb(0, 0, 0)' }}>
            Recent Reviews
          </span>
          <span style={{ fontSize: 9, color: 'rgba(0, 0, 0, 0.4)' }}>Last 24h</span>
        </div>

        {/* Review Cards - content animates */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {REVIEWS.map((review, i) => {
            const cardOpacity = interpolate(
              frame,
              [review.delay, review.delay + 15],
              [0, 1],
              { extrapolateRight: 'clamp' }
            );
            const cardY = interpolate(
              frame,
              [review.delay, review.delay + 15],
              [10, 0],
              { extrapolateRight: 'clamp' }
            );
            const scoreScale = spring({
              frame: frame - review.delay - 10,
              fps,
              from: 0,
              to: 1,
              durationInFrames: 15,
            });

            const sentimentColor =
              review.sentiment === 'positive'
                ? 'rgb(138, 154, 124)'
                : review.sentiment === 'negative'
                ? 'rgb(239, 68, 68)'
                : 'rgb(196, 108, 78)';

            return (
              <div
                key={i}
                style={{
                  backgroundColor: 'rgb(250, 250, 250)',
                  borderRadius: 8,
                  padding: 10,
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px)`,
                }}
              >
                <p
                  style={{
                    fontSize: 9,
                    color: 'rgba(0, 0, 0, 0.7)',
                    margin: 0,
                    marginBottom: 6,
                    lineHeight: 1.4,
                  }}
                >
                  {review.text}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, transform: `scale(${scoreScale})` }}>
                    {review.emoji}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${interpolate(frame, [review.delay + 10, review.delay + 25], [0, review.score], { extrapolateRight: 'clamp' })}%`,
                        height: '100%',
                        backgroundColor: sentimentColor,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 600, color: sentimentColor }}>
                    {Math.round(interpolate(frame, [review.delay + 10, review.delay + 25], [0, review.score], { extrapolateRight: 'clamp' }))}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Sentiment Gauge - animates */}
        <div
          style={{
            marginTop: 12,
            padding: 10,
            backgroundColor: 'rgb(250, 250, 250)',
            borderRadius: 8,
            opacity: interpolate(frame, [60, 70], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: 'rgb(0, 0, 0)' }}>
              Overall Sentiment
            </span>
            <span style={{ fontSize: 9, fontWeight: 700, color: 'rgb(138, 154, 124)' }}>
              {Math.round(gaugeProgress)}% Positive
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              gap: 2,
              height: 8,
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${gaugeProgress}%`,
                backgroundColor: 'rgb(138, 154, 124)',
              }}
            />
            <div
              style={{
                width: `${100 - gaugeProgress}%`,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
            />
          </div>
        </div>
      </div>
    </ServiceDemo>
  );
};
