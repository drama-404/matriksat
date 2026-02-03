'use client';

import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { ProjectCard } from './ExpandableProjectCard';
import type { ServiceCategory } from '@/types/content';

interface ServiceCategoryModalProps {
  category: ServiceCategory | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ServiceCategoryModal({
  category,
  isOpen,
  onClose,
}: ServiceCategoryModalProps) {
  const handleClose = () => {
    onClose();
  };

  if (!category) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="fullscreen">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Column: 70% - Scrollable Projects */}
        <div className="w-full lg:w-[68%] h-full overflow-y-auto p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3
              className="text-lg font-semibold text-[var(--color-dark)] mb-6"
              style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
            >
              {category.title} Projects
            </h3>

            {/* Projects - Vertical Stack */}
            <div className="space-y-6">
              {category.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: 30% - Fixed Sidebar */}
        <div className="hidden lg:block w-[32%] h-full bg-[var(--color-background)] border-l border-white/10">
          <div className="sticky top-0 p-8 h-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="flex flex-col h-full"
            >
              {/* Category Icon */}
              <CategoryIcon categoryId={category.id} />

              {/* Category Header */}
              <h2
                className="text-3xl font-bold text-[var(--color-dark)] mt-6"
                style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
              >
                {category.title}
              </h2>

              {/* Subtitle */}
              <p
                className="text-lg font-medium mt-2"
                style={{ color: 'var(--color-accent)' }}
              >
                {category.subtitle}
              </p>

              {/* Description */}
              <p
                className="text-[15px] leading-relaxed mt-6 flex-1"
                style={{ color: 'rgba(0, 0, 0, 0.7)' }}
              >
                {category.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 mt-6 py-4 border-t border-white/50">
                <div className="text-center">
                  <span className="text-2xl font-bold text-[var(--color-dark)]">
                    {category.projects.length}
                  </span>
                  <span className="block text-xs" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                    Projects
                  </span>
                </div>
                <div className="w-px h-10 bg-white/50" />
                <div className="text-center">
                  <span className="text-2xl font-bold text-[var(--color-dark)]">
                    {getTotalTags(category)}
                  </span>
                  <span className="block text-xs" style={{ color: 'rgba(0, 0, 0, 0.5)' }}>
                    Technologies
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                  // Smooth scroll to contact section
                  setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 300);
                }}
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[var(--color-dark)] text-white font-semibold text-base transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 mt-auto"
                style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
              >
                <span>{category.ctaText}</span>
                <ArrowIcon className="w-4 h-4" />
              </a>

              {/* Trust Signal */}
              <p
                className="text-center text-xs mt-3"
                style={{ color: 'rgba(0, 0, 0, 0.5)' }}
              >
                Free consultation • No commitment
              </p>
            </motion.div>
          </div>
        </div>

        {/* Mobile Bottom Bar (shows on small screens) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-background)] p-4 z-10">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleClose();
              setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }, 300);
            }}
            className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[var(--color-dark)] text-white font-semibold text-base"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            <span>{category.ctaText}</span>
            <ArrowIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </Modal>
  );
}

/* ─── Helper Functions ─── */

function getTotalTags(category: ServiceCategory): number {
  const allTags = new Set<string>();
  category.projects.forEach((project) => {
    project.tags.forEach((tag) => allTags.add(tag));
  });
  return allTags.size;
}

/* ─── Category Icon Component ─── */

function CategoryIcon({ categoryId }: { categoryId: string }) {
  const iconClass = 'w-10 h-10';
  const containerClass =
    'w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm';

  const icons: Record<string, React.ReactNode> = {
    'ai-automation': (
      <div className={containerClass}>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
          <circle cx="8" cy="14" r="1" />
          <circle cx="16" cy="14" r="1" />
          <path d="M9 18h6" />
        </svg>
      </div>
    ),
    'custom-apps': (
      <div className={containerClass}>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <path d="M7 8l3 3-3 3M12 14h4" />
        </svg>
      </div>
    ),
    'data-analytics': (
      <div className={containerClass}>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <path d="M3 3l18 18" />
        </svg>
      </div>
    ),
    'product-design': (
      <div className={containerClass}>
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 19l7-7 3 3-7 7-3-3z" />
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
          <path d="M2 2l7.586 7.586" />
          <circle cx="11" cy="11" r="2" />
        </svg>
      </div>
    ),
  };

  return icons[categoryId] || null;
}

/* ─── Arrow Icon ─── */

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
