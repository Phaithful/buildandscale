import React from 'react';
import './About.css';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">

        {/* Core message */}
        <div className="about__message">
          <div className="about__message-left reveal-left">
            <div className="section-label">The Core Message</div>
            <blockquote className="about__quote">
              "Do you see a man diligent in his work? He will stand before kings,
              he will not stand before mere men."
            </blockquote>
            <cite className="about__cite">— Proverbs 22:29</cite>
          </div>

          <div className="about__message-right reveal-right delay-2">
            <p className="about__body">
              This is not a conference about motivation. It is a conference about
              diligence, systems, and execution. Every student in that auditorium has
              ideas. What separates builders from dreamers is the discipline to show up,
              do the work, and build consistently.
            </p>
            <p className="about__body">
              Build & Scale 2026 exists because too many Nigerian students leave university
              with great ideas that were never built. We intend to change that, one
              student at a time, starting on 30th May.
            </p>

            <div className="about__pillars">
              {[
                { num: '01', title: 'Ideas are not enough.', desc: 'Every student has ideas. Execution is what separates builders from dreamers.' },
                { num: '02', title: 'Excellence is a choice.', desc: 'The students who will stand in rooms of influence are those who chose excellence early.' },
                { num: '03', title: 'Now is the time to build.', desc: 'You do not need a perfect plan. You need a clear vision and the courage to start.' },
              ].map((p, i) => (
                <div className="about__pillar" key={p.num}>
                  <span className="about__pillar-num">{p.num}</span>
                  <div>
                    <h4 className="about__pillar-title">{p.title}</h4>
                    <p className="about__pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission & Vision cards */}
        <div className="about__mv" id="mission">
          <div className="about__mv-card about__mv-card--vision reveal delay-1">
            <div className="about__mv-icon">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="about__mv-label">Our Vision</div>
            <h3 className="about__mv-title">Purpose-Driven Builders</h3>
            <div className="gold-divider" />
            <p className="about__mv-body">
              To raise disciplined, purpose-driven builders who create scalable solutions
              that transform society, graduates who do not wait for opportunity but build it.
            </p>
          </div>

          <div className="about__mv-card about__mv-card--mission reveal delay-3">
            <div className="about__mv-icon about__mv-icon--gold">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
            </div>
            <div className="about__mv-label about__mv-label--dark">Our Mission</div>
            <h3 className="about__mv-title about__mv-title--dark">Practical Tools for Execution</h3>
            <div className="gold-divider" style={{ background: 'linear-gradient(90deg, rgba(0,0,128,0.4), rgba(0,0,128,0.2))' }} />
            <p className="about__mv-body about__mv-body--dark">
              To equip students with practical tools, structured thinking, and execution
              strategies they can apply immediately to build and scale meaningful initiatives.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
