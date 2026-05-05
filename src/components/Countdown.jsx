import React, { useState, useEffect } from 'react';
import { CONFERENCE_DATE } from '../utils/data';
import './Countdown.css';

function getTimeLeft() {
  const now = new Date();
  const diff = CONFERENCE_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const TimeBlock = React.memo(function TimeBlock({ value, label }) {
  const [flip, setFlip] = useState(false);
  const [prev, setPrev] = useState(value);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => {
        setFlip(false);
        setPrev(value);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const display = String(value).padStart(2, '0');

  return (
    <div className="countdown__block">
      <div className={`countdown__flip ${flip ? 'countdown__flip--active' : ''}`}>
        <span className="countdown__num">{display}</span>
      </div>
      <span className="countdown__label">{label}</span>
    </div>
  );
});

export default function Countdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="countdown">
      <div className="container">
        <div className="countdown__inner">
          <div className="countdown__label-top reveal">
            <span>Conference begins in</span>
          </div>
          <div className="countdown__blocks reveal delay-2">
            <TimeBlock value={time.days} label="Days" />
            <div className="countdown__colon">:</div>
            <TimeBlock value={time.hours} label="Hours" />
            <div className="countdown__colon">:</div>
            <TimeBlock value={time.minutes} label="Minutes" />
            <div className="countdown__colon">:</div>
            <TimeBlock value={time.seconds} label="Seconds" />
          </div>
          <p className="countdown__sub reveal delay-3">
            Saturday, 30th May 2026 · Peter Mbah Law Auditorium, Godfrey Okoye University
          </p>
        </div>
      </div>
    </section>
  );
}
