'use client';

import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Locale } from '@/i18n/routing';

interface LanguageToggleProps {
  locale: Locale;
  className?: string;
}

export function LanguageToggle({ locale, className }: LanguageToggleProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'px-2 py-1 text-sm font-medium rounded transition-colors',
          locale === 'en'
            ? 'text-[rgb(22,22,22)]'
            : 'text-[rgba(0,0,0,0.53)] hover:text-[rgb(22,22,22)]'
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-[rgba(0,0,0,0.3)]">/</span>
      <button
        onClick={() => switchLocale('al')}
        className={cn(
          'px-2 py-1 text-sm font-medium rounded transition-colors',
          locale === 'al'
            ? 'text-[rgb(22,22,22)]'
            : 'text-[rgba(0,0,0,0.53)] hover:text-[rgb(22,22,22)]'
        )}
        aria-label="Switch to Albanian"
      >
        AL
      </button>
    </div>
  );
}
