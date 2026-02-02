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

// Category-Level Compositions (for merged ServicesGrid)
export { AIAutomationDemo } from './AIAutomationDemo';
export { CustomAppsDemo } from './CustomAppsDemo';
export { DataAnalyticsDemo } from './DataAnalyticsDemo';
export { ProductDesignDemo } from './ProductDesignDemo';

// Composition lookup map for dynamic rendering
import type { ComponentType } from 'react';

export const compositionMap: Record<string, ComponentType> = {
  // Service-level demos
  ChatbotsDemo: ChatbotsDemo,
  InvoiceOCRDemo: InvoiceOCRDemo,
  BookingSystemsDemo: BookingSystemsDemo,
  CustomerDashboardsDemo: CustomerDashboardsDemo,
  SentimentAnalysisDemo: SentimentAnalysisDemo,
  ReviewManagementDemo: ReviewManagementDemo,
  MobileAppsDemo: MobileAppsDemo,
  SystemConnectorsDemo: SystemConnectorsDemo,
  GDPRComplianceDemo: GDPRComplianceDemo,
  // Category-level demos (for merged ServicesGrid)
  AIAutomationDemo: AIAutomationDemo,
  CustomAppsDemo: CustomAppsDemo,
  DataAnalyticsDemo: DataAnalyticsDemo,
  ProductDesignDemo: ProductDesignDemo,
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
import { AIAutomationDemo } from './AIAutomationDemo';
import { CustomAppsDemo } from './CustomAppsDemo';
import { DataAnalyticsDemo } from './DataAnalyticsDemo';
import { ProductDesignDemo } from './ProductDesignDemo';
