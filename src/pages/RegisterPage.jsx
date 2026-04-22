import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Check, User, Mail, Phone, Building, GraduationCap, MessageSquare, MapPin, Calendar, Clock, Ticket, AlertTriangle } from 'lucide-react';
import { submitRegistration, SHEET_URL } from '../utils/googleSheets';
import Footer from '../components/Footer';
import './RegisterPage.css';

const LEVELS = [
  { group: 'University', options: ['100 Level', '200 Level', '300 Level', '400 Level', '500 Level', 'Postgraduate'] },
  { group: 'Secondary School', options: ['SS1', 'SS2', 'SS3'] },
  { group: 'Other', options: ['Alumni', 'Professional', 'Other'] },
];

const REFERRALS = [
  'Social Media (Instagram/Twitter)',
  'WhatsApp / Broadcast',
  'Class / Chapel Announcement',
  'Friend or Colleague',
  'Flyer / Poster',
  'Other',
];

const INITIAL = {
  fullName: '',
  email: '',
  phone: '',
  institution: '',
  level: '',
  referral: '',
};

export default function RegisterPage() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const isConfigured = SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Register — Build & Scale 2026';
  }, []);

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone number is required';
    if (!form.institution.trim()) e.institution = 'Institution is required';
    if (!form.level) e.level = 'Please select your level';
    if (!form.referral) e.referral = 'Please tell us how you heard about us';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    if (!isConfigured) {
      // Demo mode — just show success
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      await submitRegistration({ ...form, timestamp: new Date().toISOString() });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="register-success">
        <div className="register-success__card">
          <div className="register-success__icon">
            <CheckCircle size={40} />
          </div>
          <h2 className="register-success__title">You're In.</h2>
          <p className="register-success__name">Welcome, {form.fullName.split(' ')[0]}.</p>
          <p className="register-success__body">
            Your seat at Build & Scale 2026 has been secured. We'll send confirmation details to{' '}
            <strong>{form.email}</strong>. See you on the 30th of May.
          </p>
          <div className="register-success__detail">
            <span><MapPin size={14} /> Peter Mbah Law Auditorium, GO University</span>
            <span><Calendar size={14} /> Friday, 30th May 2026 · 8:00 AM</span>
          </div>
          <Link to="/" className="register-success__back">
            <ArrowLeft size={15} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="register page-enter">
        {/* Header */}
        <div className="register__header">
          <div className="register__header-bg" />
          <div className="container register__header-inner">
            <Link to="/" className="register__back-link">
              <ArrowLeft size={16} />
              Back to Home
            </Link>
            <div className="register__header-content">
              <div className="section-label" style={{ color: 'rgba(230,190,138,0.8)' }}>
                Conference Registration
              </div>
              <h1 className="register__title">Secure Your Seat</h1>
              <p className="register__subtitle">
                Build & Scale 2026 · Friday, 30th May · Peter Mbah Law Auditorium
              </p>
            </div>
          </div>
        </div>

        {/* Form area */}
        <div className="register__body">
          <div className="container">
            <div className="register__layout">
              {/* Left — info panel */}
              <aside className="register__info">
                <div className="register__info-card">
                  <h3 className="register__info-title">What to expect</h3>
                  <ul className="register__info-list">
                    {[
                      'A full day of practical learning',
                      'Access to all keynotes & workshops',
                      'Networking with 100+ builders',
                      'Panel Q&A with experienced speakers',
                      'Refreshments throughout the day',
                      'Certificate of participation',
                    ].map((item) => (
                      <li key={item} className="register__info-item">
                        <Check size={14} className="register__info-check" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="register__info-divider" />

                  <div className="register__info-event">
                    <p className="register__info-event-label">Event Details</p>
                    <p className="register__info-event-val"><Calendar size={14} /> Friday, 30th May 2026</p>
                    <p className="register__info-event-val"><Clock size={14} /> Registration from 8:00 AM</p>
                    <p className="register__info-event-val"><MapPin size={14} /> Peter Mbah Law Auditorium</p>
                    <p className="register__info-event-val"><GraduationCap size={14} /> Godfrey Okoye University, Enugu</p>
                  </div>

                  <div className="register__info-divider" />
                  <p className="register__info-free">
                    <Ticket size={14} /> <strong>Completely Free</strong>
                  </p>
                </div>
              </aside>

              {/* Right — form */}
              <div className="register__form-wrap">
                {!isConfigured && (
                  <div className="register__demo-banner">
                    <AlertTriangle size={15} /> <strong>Developer Note:</strong> Google Sheets not yet connected. Submissions will show success in demo mode.
                    See <code>src/utils/googleSheets.js</code> for setup instructions.
                  </div>
                )}

                {status === 'error' && (
                  <div className="register__error-banner">
                    Something went wrong. Please try again or contact us directly at 08146732800.
                  </div>
                )}

                <form className="register__form" onSubmit={handleSubmit} noValidate>
                  <div className="register__form-section">
                    <h4 className="register__form-section-title">Personal Information</h4>

                    {/* Full Name */}
                    <div className={`register__field ${errors.fullName ? 'register__field--error' : ''}`}>
                      <label className="register__label">
                        <User size={14} /> Full Name
                      </label>
                      <input
                        className="register__input"
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <span className="register__error">{errors.fullName}</span>}
                    </div>

                    <div className="register__row">
                      {/* Email */}
                      <div className={`register__field ${errors.email ? 'register__field--error' : ''}`}>
                        <label className="register__label">
                          <Mail size={14} /> Email Address
                        </label>
                        <input
                          className="register__input"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                        />
                        {errors.email && <span className="register__error">{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div className={`register__field ${errors.phone ? 'register__field--error' : ''}`}>
                        <label className="register__label">
                          <Phone size={14} /> Phone Number
                        </label>
                        <input
                          className="register__input"
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="08012345678"
                        />
                        {errors.phone && <span className="register__error">{errors.phone}</span>}
                      </div>
                    </div>
                  </div>

                  <div className="register__form-section">
                    <h4 className="register__form-section-title">Academic Details</h4>

                    {/* Institution */}
                    <div className={`register__field ${errors.institution ? 'register__field--error' : ''}`}>
                      <label className="register__label">
                        <Building size={14} /> Institution / School
                      </label>
                      <input
                        className="register__input"
                        type="text"
                        name="institution"
                        value={form.institution}
                        onChange={handleChange}
                        placeholder="e.g. Godfrey Okoye University"
                      />
                      {errors.institution && <span className="register__error">{errors.institution}</span>}
                    </div>

                    {/* Level */}
                    <div className={`register__field ${errors.level ? 'register__field--error' : ''}`}>
                      <label className="register__label">
                        <GraduationCap size={14} /> Current Level / Year
                      </label>
                      <select
                        className="register__input register__select"
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                      >
                        <option value="">Select your level</option>
                        {LEVELS.map((group) => (
                          <optgroup key={group.group} label={group.group}>
                            {group.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {errors.level && <span className="register__error">{errors.level}</span>}
                    </div>
                  </div>

                  <div className="register__form-section">
                    <h4 className="register__form-section-title">One Last Thing</h4>

                    {/* Referral */}
                    <div className={`register__field ${errors.referral ? 'register__field--error' : ''}`}>
                      <label className="register__label">
                        <MessageSquare size={14} /> How did you hear about Build & Scale 2026?
                      </label>
                      <div className="register__radio-grid">
                        {REFERRALS.map((r) => (
                          <label
                            key={r}
                            className={`register__radio-option ${form.referral === r ? 'register__radio-option--selected' : ''}`}
                          >
                            <input
                              type="radio"
                              name="referral"
                              value={r}
                              checked={form.referral === r}
                              onChange={handleChange}
                            />
                            <span>{r}</span>
                          </label>
                        ))}
                      </div>
                      {errors.referral && <span className="register__error">{errors.referral}</span>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="register__submit"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="register__spinner" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <span>Register for Build & Scale 2026</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="register__disclaimer">
                    By registering, you confirm you'll make every effort to attend on 30th May 2026.
                    Spaces are limited — please only register if you intend to come.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
