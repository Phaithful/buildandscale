import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader, ArrowLeft, User, Mail, Phone, Building, GraduationCap, Hash } from 'lucide-react';
import { fetchRegistrations } from '../utils/googleSheets';
import './VerifyPage.css';

export default function VerifyPage() {
  const [params] = useSearchParams();
  const id = params.get('id');

  const [status, setStatus] = useState('loading'); // loading | found | not-found | error
  const [attendee, setAttendee] = useState(null);

  useEffect(() => {
    document.title = 'Verify Registration — Build & Scale 2026';
    if (!id) { setStatus('not-found'); return; }

    fetchRegistrations()
      .then((rows) => {
        const match = rows.find((r) => r['Registration ID'] === id);
        if (match) { setAttendee(match); setStatus('found'); }
        else setStatus('not-found');
      })
      .catch(() => setStatus('error'));
  }, [id]);

  return (
    <div className="verify">
      <div className="verify__card">
        {/* Brand */}
        <div className="verify__brand">
          <div className="verify__brand-mark">B&amp;S</div>
          <span className="verify__brand-label">Build &amp; Scale 2026</span>
        </div>

        {status === 'loading' && (
          <div className="verify__state">
            <Loader size={40} className="verify__spin" />
            <p className="verify__state-text">Verifying registration&hellip;</p>
          </div>
        )}

        {status === 'found' && (
          <>
            <div className="verify__confirmed">
              <CheckCircle size={48} />
            </div>
            <h1 className="verify__title">Registration Confirmed</h1>
            <p className="verify__subtitle">Valid attendee for Build &amp; Scale 2026</p>

            <div className="verify__details">
              <div className="verify__details-header">Attendee Details</div>
              <div className="verify__details-body">
                <div className="verify__row">
                  <span className="verify__row-icon"><User size={13} /></span>
                  <span className="verify__row-label">Full Name</span>
                  <span className="verify__row-value">{attendee['Full Name'] || '—'}</span>
                </div>
                <div className="verify__row">
                  <span className="verify__row-icon"><Mail size={13} /></span>
                  <span className="verify__row-label">Email</span>
                  <span className="verify__row-value">{attendee['Email'] || '—'}</span>
                </div>
                <div className="verify__row">
                  <span className="verify__row-icon"><Phone size={13} /></span>
                  <span className="verify__row-label">Phone</span>
                  <span className="verify__row-value">{attendee['Phone'] || '—'}</span>
                </div>
                <div className="verify__row">
                  <span className="verify__row-icon"><Building size={13} /></span>
                  <span className="verify__row-label">Institution</span>
                  <span className="verify__row-value">{attendee['Institution'] || '—'}</span>
                </div>
                <div className="verify__row">
                  <span className="verify__row-icon"><GraduationCap size={13} /></span>
                  <span className="verify__row-label">Level</span>
                  <span className="verify__row-value">{attendee['Level'] || '—'}</span>
                </div>
                <div className="verify__row">
                  <span className="verify__row-icon"><Hash size={13} /></span>
                  <span className="verify__row-label">Registration ID</span>
                  <span className="verify__row-value verify__row-value--mono">{attendee['Registration ID'] || '—'}</span>
                </div>
              </div>
            </div>

            <p className="verify__event">
              Friday, 30th May 2026 &middot; Peter Mbah Law Auditorium, GO University
            </p>
          </>
        )}

        {status === 'not-found' && (
          <div className="verify__state verify__state--invalid">
            <div className="verify__invalid-icon">
              <XCircle size={48} />
            </div>
            <h1 className="verify__title verify__title--invalid">Not Found</h1>
            <p className="verify__state-text">
              {id
                ? `No registration found for ID: ${id}`
                : 'No registration ID provided in this link.'}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="verify__state">
            <XCircle size={40} className="verify__error-icon" />
            <p className="verify__state-text">Could not connect to the registration database. Please try again.</p>
          </div>
        )}

        <Link to="/" className="verify__back">
          <ArrowLeft size={14} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
