import React, { useEffect, useRef, useState } from 'react';
import { STATS } from '../utils/data';
import './Stats.css';

function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

const StatItem = React.memo(function StatItem({ stat, active }) {
  const count = useCountUp(stat.value, 1600, active);
  return (
    <div className="stats__item">
      <span className="stats__num">
        {count}{stat.suffix}
      </span>
      <span className="stats__label">{stat.label}</span>
    </div>
  );
});

export default function Stats() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      <div className="container">
        <div className="stats__inner">
          {STATS.map((s, i) => (
            <React.Fragment key={s.label}>
              <StatItem stat={s} active={active} />
              {i < STATS.length - 1 && <div className="stats__sep" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
