import React from 'react';
import { Composition } from 'remotion';

// Service Demo Compositions
import { ChatbotsDemo } from '../src/components/remotion/compositions/ChatbotsDemo';
import { InvoiceOCRDemo } from '../src/components/remotion/compositions/InvoiceOCRDemo';
import { BookingSystemsDemo } from '../src/components/remotion/compositions/BookingSystemsDemo';
import { CustomerDashboardsDemo } from '../src/components/remotion/compositions/CustomerDashboardsDemo';
import { SentimentAnalysisDemo } from '../src/components/remotion/compositions/SentimentAnalysisDemo';
import { ReviewManagementDemo } from '../src/components/remotion/compositions/ReviewManagementDemo';
import { MobileAppsDemo } from '../src/components/remotion/compositions/MobileAppsDemo';
import { SystemConnectorsDemo } from '../src/components/remotion/compositions/SystemConnectorsDemo';
import { GDPRComplianceDemo } from '../src/components/remotion/compositions/GDPRComplianceDemo';

// How It Works Section
import { ChatbotMockup } from '../src/components/remotion/ChatbotMockup';

// Video dimensions optimized for service cards (16:9 ratio)
const VIDEO_WIDTH = 640;
const VIDEO_HEIGHT = 360;
const FPS = 30;

// 6 seconds for service demos
const SERVICE_DEMO_DURATION = 180; // 6s @ 30fps

// 8 seconds for chatbot mockup (longer conversation flow)
const CHATBOT_MOCKUP_DURATION = 240; // 8s @ 30fps

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Service Demo Compositions */}
      <Composition
        id="ChatbotsDemo"
        component={ChatbotsDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="InvoiceOCRDemo"
        component={InvoiceOCRDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="BookingSystemsDemo"
        component={BookingSystemsDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="CustomerDashboardsDemo"
        component={CustomerDashboardsDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="SentimentAnalysisDemo"
        component={SentimentAnalysisDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="ReviewManagementDemo"
        component={ReviewManagementDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="MobileAppsDemo"
        component={MobileAppsDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="SystemConnectorsDemo"
        component={SystemConnectorsDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
      <Composition
        id="GDPRComplianceDemo"
        component={GDPRComplianceDemo}
        durationInFrames={SERVICE_DEMO_DURATION}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />

      {/* How It Works Section */}
      <Composition
        id="ChatbotMockup"
        component={ChatbotMockup}
        durationInFrames={CHATBOT_MOCKUP_DURATION}
        fps={FPS}
        width={400}
        height={500}
      />
    </>
  );
};
