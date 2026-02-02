'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { IndustryProject } from '@/types/content';

interface ExpandableProjectCardProps {
  project: IndustryProject;
  isExpanded: boolean;
  onToggle: () => void;
}

// Industry icon mapping
const industryIcons: Record<string, React.FC<{ className?: string }>> = {
  hotel: HotelIcon,
  store: StoreIcon,
  warehouse: WarehouseIcon,
  receipt: ReceiptIcon,
  truck: TruckIcon,
  building: BuildingIcon,
  globe: GlobeIcon,
  phone: PhoneIcon,
  cloud: CloudIcon,
  cart: CartIcon,
};

export function ExpandableProjectCard({
  project,
  isExpanded,
  onToggle,
}: ExpandableProjectCardProps) {
  const Icon = industryIcons[project.industryIcon] ?? GlobeIcon;

  return (
    <motion.article
      layout
      className={cn(
        'rounded-2xl bg-[var(--color-background)] cursor-pointer overflow-hidden',
        'transition-shadow duration-200',
        isExpanded ? 'ring-2 ring-[var(--color-accent)]' : 'hover:shadow-md'
      )}
      onClick={onToggle}
      role="button"
      aria-expanded={isExpanded}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      {/* Collapsed Header - always visible */}
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-3">
          {/* Industry Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span
              className="text-[11px] font-medium uppercase tracking-wide"
              style={{ color: 'var(--color-accent)' }}
            >
              {project.industry}
            </span>
            <h4
              className="text-base font-semibold text-[var(--color-dark)] mt-0.5 leading-tight"
              style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
            >
              {project.title}
            </h4>
            <p
              className="text-sm mt-1 line-clamp-2"
              style={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              {project.subtitle}
            </p>
          </div>

          {/* Expand indicator */}
          <motion.div
            className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronIcon className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white"
              style={{ color: 'rgba(0, 0, 0, 0.5)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-4 pb-5 md:px-5 md:pb-6 border-t border-white/50">
              <div className="pt-4 space-y-4">
                {/* Challenge */}
                <ProjectSection
                  label="Challenge"
                  content={project.challenge}
                  accentColor="var(--color-accent)"
                />

                {/* Solution */}
                <ProjectSection
                  label="Solution"
                  content={project.solution}
                  accentColor="#22c55e"
                />

                {/* Results */}
                <ProjectSection
                  label="Results"
                  content={project.results}
                  accentColor="#f59e0b"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ─── Project Section (Challenge/Solution/Results) ─── */

function ProjectSection({
  label,
  content,
  accentColor,
}: {
  label: string;
  content: string;
  accentColor: string;
}) {
  return (
    <div className="flex gap-3">
      <div
        className="flex-shrink-0 w-1 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <div>
        <span
          className="text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: accentColor }}
        >
          {label}
        </span>
        <p
          className="text-sm mt-1 leading-relaxed"
          style={{ color: 'rgba(0, 0, 0, 0.7)' }}
        >
          {content}
        </p>
      </div>
    </div>
  );
}

/* ─── SVG Icons ─── */

function ChevronIcon({ className }: { className?: string }) {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function HotelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M6 21V9l6-4 6 4v12M10 21v-4h4v4M9 9h6M9 13h6" />
    </svg>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l1.5-5h15L21 9M3 9v12h18V9M3 9h18M9 21V13h6v8" />
    </svg>
  );
}

function WarehouseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M4 21V10l8-6 8 6v11M9 21v-5h6v5M9 12h6" />
    </svg>
  );
}

function ReceiptIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2l-3 2-3-2-3 2-3-2-3 2-3-2zM8 10h8M8 14h4" />
    </svg>
  );
}

function TruckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  );
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
