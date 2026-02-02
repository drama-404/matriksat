'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Modal } from './Modal';
import { ExpandableProjectCard } from './ExpandableProjectCard';
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
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Reset expanded state when modal closes
  const handleClose = () => {
    setExpandedProjectId(null);
    onClose();
  };

  // Toggle project expansion (only one at a time)
  const toggleProject = (projectId: string) => {
    setExpandedProjectId((current) => (current === projectId ? null : projectId));
  };

  if (!category) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="wide">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Column: 70% - Projects Grid */}
        <motion.div
          className="w-full lg:w-[68%]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <h3
            className="text-lg font-semibold text-[var(--color-dark)] mb-4"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            Projects in {category.title}
          </h3>

          {/* Projects Grid - 2x2 on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.projects.map((project) => (
              <ExpandableProjectCard
                key={project.id}
                project={project}
                isExpanded={expandedProjectId === project.id}
                onToggle={() => toggleProject(project.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Right Column: 30% - Category Overview + CTA */}
        <motion.div
          className="w-full lg:w-[32%] lg:border-l lg:border-[var(--color-background)] lg:pl-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-4">
            <CategoryIcon categoryId={category.id} />
            <h2
              className="text-2xl font-bold text-[var(--color-dark)]"
              style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
            >
              {category.title}
            </h2>
          </div>

          {/* Subtitle */}
          <p
            className="text-base font-medium mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            {category.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-[15px] leading-relaxed mb-6"
            style={{ color: 'rgba(0, 0, 0, 0.7)' }}
          >
            {category.description}
          </p>

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
              }, 200);
            }}
            className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-[var(--color-dark)] text-white font-semibold text-base transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            <span>{category.ctaText}</span>
            <ArrowIcon className="w-4 h-4" />
          </a>

          {/* Trust Signal */}
          <p
            className="text-center text-xs mt-4"
            style={{ color: 'rgba(0, 0, 0, 0.5)' }}
          >
            Free consultation • No commitment
          </p>
        </motion.div>
      </div>
    </Modal>
  );
}

/* ─── Category Icon Component ─── */

function CategoryIcon({ categoryId }: { categoryId: string }) {
  const iconClass = 'w-8 h-8';
  const containerClass =
    'w-12 h-12 rounded-2xl bg-[var(--color-accent-subtle)] flex items-center justify-center';

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
