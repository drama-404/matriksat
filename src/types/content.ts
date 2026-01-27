export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  hoverImage: string;
  remotionId: string;
  features: string[];
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
  description: string;
  image: string;
  tags: string[];
  modalContent: {
    challenge: string;
    solution: string;
    results: string;
  };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  avatarLabel: string;
}

export interface EngagementModel {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricing: string;
  cta: string;
  highlighted?: boolean;
}

export interface HeroContent {
  statusBadge: string;
  mainHeading: string;
  rotatingWords: string[];
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
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
