'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerChildren } from '@/components/animations/variants';
import { Modal } from '@/components/ui/Modal';
import type { Locale } from '@/i18n/routing';
import type { ProjectsContent, Project } from '@/types/content';

import projectsEN from '@/content/en/projects.json';
import projectsAL from '@/content/al/projects.json';

interface PortfolioProps {
  locale: Locale;
}

export function Portfolio({ locale }: PortfolioProps) {
  const content: ProjectsContent = locale === 'en' ? projectsEN : projectsAL;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const viewLabel = locale === 'en' ? 'View Project' : 'Shiko Projektin';
  const challengeLabel = locale === 'en' ? 'The Challenge' : 'Sfida';
  const solutionLabel = locale === 'en' ? 'The Solution' : 'Zgjidhja';
  const resultsLabel = locale === 'en' ? 'The Results' : 'Rezultatet';

  return (
    <section id="our-work" className="section-container" aria-labelledby="portfolio-heading">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <p
          className="text-sm font-normal mb-2"
          style={{ color: 'rgba(0, 0, 0, 0.5)' }}
        >
          {content.headerLabel}
        </p>
        <h2
          id="portfolio-heading"
          className="text-[33px] font-bold tracking-[-1.32px] leading-[39.6px] text-[rgb(0,0,0)]"
          style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
        >
          {content.heading}
        </h2>
      </motion.div>

      {/* Project Cards */}
      <motion.div
        className="flex flex-col gap-8 max-w-[990px] mx-auto"
        variants={staggerChildren}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {content.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            viewLabel={viewLabel}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </motion.div>

      {/* Project Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div>
            {/* Title */}
            <h3
              className="text-[32px] font-bold mb-4"
              style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
            >
              {selectedProject.title}
            </h3>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {selectedProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-[rgb(245,245,245)]"
                  style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Challenge */}
            <div className="mb-6">
              <h4
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
              >
                {challengeLabel}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                {selectedProject.modalContent.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-6">
              <h4
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
              >
                {solutionLabel}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                {selectedProject.modalContent.solution}
              </p>
            </div>

            {/* Results */}
            <div>
              <h4
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
              >
                {resultsLabel}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                {selectedProject.modalContent.results}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

/* ─── Project Card ─── */

interface ProjectCardProps {
  project: Project;
  viewLabel: string;
  onSelect: () => void;
}

function ProjectCard({ project, viewLabel, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      className={cn(
        'relative w-full rounded-[38px] overflow-hidden card-shadow',
        'group cursor-pointer'
      )}
      variants={fadeInUp}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      onClick={onSelect}
    >
      {/* Project Image Placeholder */}
      <div
        className="w-full aspect-[16/10] bg-gradient-to-br from-[rgb(230,230,230)] to-[rgb(200,200,200)] relative"
      >
        {/* Abstract decorative pattern as placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-3 gap-3 opacity-20">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-lg"
                style={{
                  backgroundColor: i % 2 === 0 ? 'rgb(52,145,255)' : 'rgb(22,22,22)',
                  opacity: 0.3 + (i * 0.07),
                }}
              />
            ))}
          </div>
        </div>

        {/* Overlay Bar */}
        <div
          className={cn(
            'absolute bottom-4 left-4 right-4',
            'rounded-[34px] px-8 py-5',
            'flex items-center justify-between',
            'backdrop-blur-[10px]'
          )}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
        >
          {/* Project Logo/Name */}
          <span
            className="text-lg font-bold text-[rgb(0,0,0)]"
            style={{ fontFamily: 'var(--font-satoshi), var(--font-inter), sans-serif' }}
          >
            {project.logoText}
          </span>

          {/* View Project Button */}
          <button
            className={cn(
              'flex items-center gap-2 bg-white rounded-[58px] px-6 py-4',
              'text-sm font-medium text-[rgb(0,0,0)]',
              'group-hover:bg-[rgb(22,22,22)] group-hover:text-white',
              'transition-colors duration-300',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(52,145,255)]'
            )}
            aria-label={`${viewLabel}: ${project.title}`}
          >
            {viewLabel}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300"
              aria-hidden="true"
            >
              <line x1="3" y1="8" x2="13" y2="8" />
              <polyline points="9 4 13 8 9 12" />
            </svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
