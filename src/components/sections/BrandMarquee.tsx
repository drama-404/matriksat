import { cn } from '@/lib/utils';

// Placeholder brand names until actual logo SVGs are added
const brandNames = [
  'TechCorp', 'BuildCo', 'DataFlow', 'CloudSys',
  'InnovateLab', 'NexGen', 'AlphaAI', 'SmartOps',
  'ConnectHub', 'PrimeStack', 'ClearView', 'AutoScale',
  'ByteForge', 'SignalPath',
];

interface BrandMarqueeProps {
  className?: string;
}

export function BrandMarquee({ className }: BrandMarqueeProps) {
  // Duplicate array for seamless loop
  const allBrands = [...brandNames, ...brandNames];

  return (
    <section
      className={cn('py-8 overflow-hidden', className)}
      aria-label="Trusted brands"
    >
      <div className="marquee-animation flex items-center gap-12">
        {allBrands.map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className={cn(
              'flex-shrink-0 flex items-center justify-center',
              'h-[40px] px-4'
            )}
            aria-hidden={index >= brandNames.length}
          >
            <span
              className="text-lg font-semibold tracking-[-0.5px] whitespace-nowrap select-none"
              style={{
                color: 'rgba(0, 0, 0, 0.25)',
                fontFamily: 'var(--font-euclid), var(--font-inter), sans-serif',
              }}
            >
              {brand}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
