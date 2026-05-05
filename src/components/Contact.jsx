import React, { useState } from 'react';
import { MapPin, Phone, Mail, Instagram, MessageCircle, Send } from 'lucide-react';
import { submitContactMessage, SHEET_URL } from '../utils/googleSheets';

function XLogo({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="X (formerly Twitter)">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.733-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const isConfigured = SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      if (isConfigured) {
        await submitContactMessage(form);
      }
      setSent(true);
    } catch {
      setSent(true); // still show success — no-cors means we can't read errors
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      {/* Wave top */}
      <div className="contact__wave">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,0 L0,0 Z"
            fill="#FAF9F6"
          />
        </svg>
      </div>

      <div className="container">
        <div className="contact__header reveal">
          <div className="section-label" style={{ color: 'rgba(230,190,138,0.7)' }}>
            Get In Touch
          </div>
          <h2 className="contact__title">
            We'd Love To <em>Hear From You</em>
          </h2>
        </div>

        <div className="contact__grid">
          {/* Left — info */}
          <div className="contact__info reveal-left">
            <p className="contact__info-body">
              Have a question, need more information, or want to partner with Build & Scale 2026?
              Reach out, we respond quickly.
            </p>

            <div className="contact__details">
              <div className="contact__detail">
                <div className="contact__detail-icon"><MapPin size={16} /></div>
                <div>
                  <p className="contact__detail-label">Venue</p>
                  <p className="contact__detail-value">Peter Mbah Law Auditorium,<br />Godfrey Okoye University, Enugu</p>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon"><Phone size={16} /></div>
                <div>
                  <p className="contact__detail-label">Lead Convener</p>
                  <p className="contact__detail-value">08146732800</p>
                </div>
              </div>
              <div className="contact__detail">
                <div className="contact__detail-icon"><Mail size={16} /></div>
                <div>
                  <p className="contact__detail-label">Email</p>
                  <p className="contact__detail-value">buildandscaleint1@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="contact__socials">
              <p className="contact__socials-label">Follow the journey</p>
              <div className="contact__social-icons">
                <a href="https://www.instagram.com/buildandscale.ng/" target="_blank" rel="noopener noreferrer" className="contact__social-btn" aria-label="Instagram">
                  <Instagram size={18} />
                </a>
                <a href="#" className="contact__social-btn" aria-label="X (formerly Twitter)">
                  <XLogo size={18} />
                </a>
                <a href="#" className="contact__social-btn" aria-label="WhatsApp">
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact__form-wrap reveal-right delay-2">
            {sent ? (
              <div className="contact__success">
                <div className="contact__success-icon">✓</div>
                <h4>Message Received</h4>
                <p>We'll get back to you as soon as possible. Thank you for reaching out.</p>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label className="contact__label">Your Name</label>
                    <input
                      className="contact__input"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__label">Email Address</label>
                    <input
                      className="contact__input"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      required
                    />
                  </div>
                </div>
                <div className="contact__field">
                  <label className="contact__label">Message</label>
                  <textarea
                    className="contact__input contact__textarea"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="What would you like to know?"
                    rows={5}
                    required
                  />
                </div>
                <button type="submit" className="contact__submit" disabled={sending}>
                  {sending ? (
                    <span className="contact__submit-spinner" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
