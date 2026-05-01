import React from 'react';
import { SPEAKERS } from '../utils/data';
import './Speakers.css';

const SpeakerCard = React.memo(function SpeakerCard({ speaker, index }) {
  return (
    <div className={`speaker-card reveal delay-${index + 1}`}>
      <div className="speaker-card__img-wrap">
        {speaker.image ? (
          <img
            src={speaker.image}
            alt={speaker.name}
            className="speaker-card__img"
            loading="lazy"
          />
        ) : (
          <div className="speaker-card__avatar">
            <span>{speaker.initials}</span>
          </div>
        )}

        {/* Blur overlay — always in DOM, CSS controls opacity on hover */}
        <div className="speaker-card__blur-overlay" />

        <div className="speaker-card__session-badge">
          {speaker.session}
        </div>
      </div>

      <div className="speaker-card__info">
        <h3 className="speaker-card__name">{speaker.name}</h3>
        <p className="speaker-card__role">{speaker.title}</p>
        <p className="speaker-card__org">{speaker.organisation}</p>

        <div className="speaker-card__bio-wrap">
          <p className="speaker-card__bio">{speaker.bio}</p>
        </div>
      </div>
    </div>
  );
});

export default function Speakers() {
  return (
    <section className="speakers" id="speakers">
      <div className="container">
        <div className="speakers__header reveal">
          <div className="section-label">The Builders on Stage</div>
          <h2 className="speakers__title">
            Meet Our <em>Speakers</em>
          </h2>
          <p className="speakers__sub">
            Each speaker at Build & Scale 2026 is a builder, not just a success story.
            They come to share what it truly took.
          </p>
        </div>

        <div className="speakers__grid">
          {SPEAKERS.map((speaker, i) => (
            <SpeakerCard key={speaker.id} speaker={speaker} index={i % 6} />
          ))}
        </div>
      </div>
    </section>
  );
}
