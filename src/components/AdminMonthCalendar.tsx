import { useEffect, useState } from 'react';
import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const newYorkToday = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(new Date());
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value);
  return new Date(value('year'), value('month') - 1, value('day'));
};

export function AdminMonthCalendar() {
  const [today, setToday] = useState(newYorkToday);
  const [month, setMonth] = useState(() => startOfMonth(newYorkToday()));

  useEffect(() => {
    const timer = window.setInterval(() => setToday(newYorkToday()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const days = eachDayOfInterval({ start: startOfMonth(month), end: endOfMonth(month) });
  const offset = days[0].getDay();

  return (
    <section className="mt-8" aria-label="Calendar, New York time">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold" aria-live="polite">{format(month, 'MMMM yyyy')}</h2>
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon" className="size-8 text-inherit hover:bg-brand-purple hover:text-inherit" onClick={() => setMonth((current) => subMonths(current, 1))} aria-label="Previous month" title="Previous month"><ChevronLeft aria-hidden="true" /></Button>
          <Button type="button" variant="ghost" size="icon" className="size-8 text-inherit hover:bg-brand-purple hover:text-inherit" onClick={() => setMonth((current) => addMonths(current, 1))} aria-label="Next month" title="Next month"><ChevronRight aria-hidden="true" /></Button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 text-center text-xs" aria-hidden="true">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, index) => <span key={index} className="py-1 opacity-60">{label}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-y-1 text-center text-xs">
        {Array.from({ length: offset }, (_, index) => <span key={`blank-${index}`} aria-hidden="true" />)}
        {days.map((day) => {
          const isToday = format(day, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
          return <span key={day.toISOString()} aria-label={format(day, 'EEEE, MMMM d, yyyy') + (isToday ? ', today' : '')} aria-current={isToday ? 'date' : undefined} className={`mx-auto flex size-7 items-center justify-center rounded-full ${isToday ? 'bg-brand-green font-bold' : ''}`}>{format(day, 'd')}</span>;
        })}
      </div>
      <p className="mt-3 text-xs opacity-60">New York time</p>
    </section>
  );
}