'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { IndustryProject } from '@/types/content';

interface ProjectCardProps {
  project: IndustryProject;
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

export function ProjectCard({ project }: ProjectCardProps) {
  const Icon = industryIcons[project.industryIcon] ?? GlobeIcon;

  return (
    <motion.article
      className={cn(
        'relative w-full rounded-[38px] overflow-hidden bg-white',
        'group'
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image Placeholder */}
      <div className="w-full aspect-[16/9] bg-gradient-to-br from-[rgb(240,240,240)] to-[rgb(220,220,220)] relative">
        {/* Abstract decorative pattern as placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-4 gap-4 opacity-25">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-xl"
                style={{
                  backgroundColor: i % 3 === 0 ? 'var(--color-accent)' : i % 2 === 0 ? 'var(--color-dark)' : 'rgb(180,180,180)',
                  opacity: 0.25 + (i * 0.05),
                  transform: `rotate(${(i * 5) - 15}deg)`,
                }}
              />
            ))}
          </div>
          {/* Main category icon */}
          <div className="absolute w-24 h-24 rounded-3xl bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Icon className="w-12 h-12" />
          </div>
        </div>

        {/* Overlay Bar */}
        <div
          className={cn(
            'absolute bottom-4 left-4 right-4',
            'rounded-[34px] px-6 py-4',
            'flex items-center justify-between',
            'backdrop-blur-[10px]'
          )}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
        >
          {/* Industry Badge + Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-subtle)] flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span
                className="text-[11px] font-medium uppercase tracking-wide block"
                style={{ color: 'var(--color-accent)' }}
              >
                {project.industry}
              </span>
              <span
                className="text-base font-bold text-[var(--color-dark)] block leading-tight"
                style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
              >
                {project.title}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="hidden md:flex items-center gap-2">
            {project.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[var(--color-background)]"
                style={{ color: 'rgba(0, 0, 0, 0.6)' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section - Challenge, Solution, Results */}
      <div className="p-6 md:p-8 space-y-5">
        {/* Subtitle */}
        <p
          className="text-lg font-medium leading-snug"
          style={{ color: 'rgba(0, 0, 0, 0.8)' }}
        >
          {project.subtitle}
        </p>

        {/* Challenge, Solution, Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Mobile Tags */}
        <div className="flex md:hidden flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-[var(--color-background)]"
              style={{ color: 'rgba(0, 0, 0, 0.6)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
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
    <div className="bg-[var(--color-background)] rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <span
          className="text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: accentColor }}
        >
          {label}
        </span>
      </div>
      <p
        className="text-sm leading-relaxed line-clamp-4"
        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
      >
        {content}
      </p>
    </div>
  );
}

/* ─── SVG Icons ─── */

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
