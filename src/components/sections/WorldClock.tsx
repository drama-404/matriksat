'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/components/animations/variants';

interface TimezoneDisplay {
  city: string;
  country: string;
  timezone: string;
}

const TIMEZONES: TimezoneDisplay[] = [
  { city: 'Tirana', country: 'Albania', timezone: 'Europe/Tirane' },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
  { city: 'London', country: 'UK', timezone: 'Europe/London' },
  { city: 'New York', country: 'USA', timezone: 'America/New_York' },
];

function formatTime(timezone: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(new Date());
}

export function WorldClock() {
  const [times, setTimes] = useState<string[]>(() =>
    TIMEZONES.map((tz) => formatTime(tz.timezone))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimes(TIMEZONES.map((tz) => formatTime(tz.timezone)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="section-container" aria-label="World Clock">
      <motion.div
        className="flex flex-wrap justify-between items-center gap-6 max-w-[1100px] mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {TIMEZONES.map((tz, index) => (
          <div key={tz.timezone} className="flex flex-col items-center gap-1">
            <span
              className="text-xs font-medium"
              style={{ color: 'rgba(0, 0, 0, 0.5)' }}
            >
              {tz.city}, {tz.country}
            </span>
            <span
              className="text-lg font-semibold text-[var(--color-dark)] tabular-nums"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {times[index]}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
