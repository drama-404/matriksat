// Service Demo Compositions
export { ChatbotsDemo } from './ChatbotsDemo';
export { InvoiceOCRDemo } from './InvoiceOCRDemo';
export { BookingSystemsDemo } from './BookingSystemsDemo';
export { CustomerDashboardsDemo } from './CustomerDashboardsDemo';
export { SentimentAnalysisDemo } from './SentimentAnalysisDemo';
export { ReviewManagementDemo } from './ReviewManagementDemo';
export { MobileAppsDemo } from './MobileAppsDemo';
export { SystemConnectorsDemo } from './SystemConnectorsDemo';
export { GDPRComplianceDemo } from './GDPRComplianceDemo';

// Composition lookup map for dynamic rendering
import type { ComponentType } from 'react';

export const compositionMap: Record<string, ComponentType> = {
  ChatbotsDemo: ChatbotsDemo,
  InvoiceOCRDemo: InvoiceOCRDemo,
  BookingSystemsDemo: BookingSystemsDemo,
  CustomerDashboardsDemo: CustomerDashboardsDemo,
  SentimentAnalysisDemo: SentimentAnalysisDemo,
  ReviewManagementDemo: ReviewManagementDemo,
  MobileAppsDemo: MobileAppsDemo,
  SystemConnectorsDemo: SystemConnectorsDemo,
  GDPRComplianceDemo: GDPRComplianceDemo,
};

// Re-import for the map
import { ChatbotsDemo } from './ChatbotsDemo';
import { InvoiceOCRDemo } from './InvoiceOCRDemo';
import { BookingSystemsDemo } from './BookingSystemsDemo';
import { CustomerDashboardsDemo } from './CustomerDashboardsDemo';
import { SentimentAnalysisDemo } from './SentimentAnalysisDemo';
import { ReviewManagementDemo } from './ReviewManagementDemo';
import { MobileAppsDemo } from './MobileAppsDemo';
import { SystemConnectorsDemo } from './SystemConnectorsDemo';
import { GDPRComplianceDemo } from './GDPRComplianceDemo';
