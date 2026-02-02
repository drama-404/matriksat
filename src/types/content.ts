export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  remotionId: string;
  features: string[];
}

export interface ServicesContent {
  heading: string;
  subheading: string;
  services: Service[];
  footerText: string;
  footerHighlight: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  avatar: string;
  quote: string;
  reply: string;
  projectImage: string;
  rating: number;
}

export interface Project {
  id: string;
  title: string;
  logoText: string;
  image: string;
  tags: string[];
  modalContent: {
    challenge: string;
    solution: string;
    results: string;
  };
}

export interface ProjectsContent {
  headerLabel: string;
  heading: string;
  projects: Project[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  avatarLabel: string;
}

export interface FAQContent {
  heading: string;
  subheading: string;
  footerText: string;
  footerCta: string;
  items: FAQItem[];
}

export interface EngagementModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  pricing: string;
  pricingPeriod: string;
  ctaPrimary: string;
  ctaPrimaryHover: string;
  ctaSecondary: string;
  ctaSecondaryHover: string;
  highlighted: boolean;
  badge: string | null;
}

export interface PricingContent {
  heading: string;
  subheading: string;
  models: EngagementModel[];
}

export interface FinalCtaContent {
  heading: string;
  ctaButton: string;
  ctaSub: string;
  trustText: string;
  buildingText: string;
  tickerTop: string[];
  tickerBottom: string[];
}

export interface MobileMockup {
  id: string;
  label: string;
  rotation: number;
}

export interface MobileShowcaseContent {
  heading: string;
  mockups: MobileMockup[];
}

export interface HeroContent {
  statusBadge: string;
  mainHeading: string;
  rotatingWords: string[];
  subtitle: string;
  ctaPrimary: string;
}

export interface SharedContent {
  brandLogos: string[];
  metrics: {
    projectsDelivered: string;
    messagesProcessed: string;
    languagesSupported: string;
    avgHoursSaved: string;
  };
  techCloud: string[];
}

export interface QuoteContent {
  avatar: string;
  text: string;
  attribution: string;
  ctaBadge: string;
}

export interface AchievementCard {
  id: string;
  metric: string;
  subtitle: string;
  type: 'projects' | 'techCloud' | 'impact';
  backgroundNumber?: string;
  header?: string;
}

export interface AchievementsContent {
  heading: string;
  subheading: string;
  cards: AchievementCard[];
}

export interface BenefitItem {
  id: string;
  icon: string;
  title: string;
  frontText: string;
  description: string;
}

export interface BenefitsContent {
  heading: string;
  subheading: string;
  items: BenefitItem[];
}

export interface HowItWorksStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface HowItWorksContent {
  heading: string;
  subheading: string;
  steps: HowItWorksStep[];
}
