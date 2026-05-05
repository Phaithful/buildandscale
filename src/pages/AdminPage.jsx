import React, { useState, useEffect, useCallback } from 'react';
import { LogOut, RefreshCw, Download, Users, TrendingUp, School, Search, ChevronUp, ChevronDown } from 'lucide-react';
import { fetchRegistrations, SHEET_URL } from '../utils/googleSheets';
import './AdminPage.css';

const ADMIN_PASSWORD = 'Admin2357';

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="admin-stat">
      <div className="admin-stat__icon">{icon}</div>
      <div className="admin-stat__info">
        <p className="admin-stat__value">{value}</p>
        <p className="admin-stat__label">{label}</p>
        {sub && <p className="admin-stat__sub">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('Timestamp');
  const [sortDir, setSortDir] = useState('desc');
  const [levelFilter, setLevelFilter] = useState('All');
  const isConfigured = SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  const load = useCallback(async () => {
    if (!isConfigured) {
      // Demo data
      setData([
        { Timestamp: '4/30/2026, 09:12:00', 'Full Name': 'Chidi Okonkwo', Email: 'chidi@email.com', Phone: '08012345678', Institution: 'Godfrey Okoye University', Level: '300 Level', Referral: 'Social Media' },
        { Timestamp: '4/30/2026, 10:05:00', 'Full Name': 'Adaeze Eze', Email: 'adaeze@email.com', Phone: '08098765432', Institution: 'UNN', Level: '200 Level', Referral: 'Friend or Colleague' },
        { Timestamp: '4/30/2026, 10:47:00', 'Full Name': 'Emeka Nwosu', Email: 'emeka@email.com', Phone: '08055556666', Institution: 'ESUT', Level: 'SS3', Referral: 'Flyer / Poster' },
        { Timestamp: '4/30/2026, 11:20:00', 'Full Name': 'Ngozi Okeke', Email: 'ngozi@email.com', Phone: '08033334444', Institution: 'Godfrey Okoye University', Level: '400 Level', Referral: 'WhatsApp / Broadcast' },
        { Timestamp: '4/30/2026, 12:00:00', 'Full Name': 'Kelechi Amadi', Email: 'kelechi@email.com', Phone: '08077778888', Institution: 'Godfrey Okoye University', Level: '100 Level', Referral: 'Class / Chapel Announcement' },
      ]);
      return;
    }
    setLoading(true);
    setFetchError('');
    try {
      const rows = await fetchRegistrations();
      setData(rows);
    } catch {
      setFetchError('Could not load registrations. Check your Google Sheets connection.');
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    if (authed) load();
  }, [authed, load]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Incorrect password. Please try again.');
    }
  };

  // Derived stats
  const uniStudents = data.filter((r) => r.Level && !['SS1','SS2','SS3'].includes(r.Level)).length;
  const secStudents = data.filter((r) => ['SS1','SS2','SS3'].includes(r.Level)).length;
  const institutions = [...new Set(data.map((r) => r.Institution).filter(Boolean))].length;
  const levels = ['All', ...new Set(data.map((r) => r.Level).filter(Boolean))].sort();

  // Filter + sort
  const filtered = data
    .filter((r) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        (r['Full Name'] || '').toLowerCase().includes(q) ||
        (r.Email || '').toLowerCase().includes(q) ||
        (r.Institution || '').toLowerCase().includes(q);
      const matchLevel = levelFilter === 'All' || r.Level === levelFilter;
      return matchSearch && matchLevel;
    })
    .sort((a, b) => {
      const av = a[sortField] || '';
      const bv = b[sortField] || '';
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const handleSort = (field) => {
    if (sortField === field) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const exportCSV = () => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map((r) => headers.map((h) => `"${(r[h] || '').replace(/"/g, '""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BuildAndScale2026_Registrations_${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }) =>
    sortField === field
      ? sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
      : null;

  // Login screen
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <div className="admin-login__logo">
            <img src="/Logo.svg" alt="Build & Scale 2026" className="admin-login__logo-img" />
          </div>
          <h2 className="admin-login__title">Admin Portal</h2>
          <p className="admin-login__sub">Build & Scale 2026 · Registration Dashboard</p>
          <form className="admin-login__form" onSubmit={handleLogin}>
            <div className="admin-login__field">
              <label className="admin-login__label">Password</label>
              <input
                className="admin-login__input"
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            {pwError && <p className="admin-login__error">{pwError}</p>}
            <button type="submit" className="admin-login__btn">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      {/* Top bar */}
      <header className="admin__header">
        <div className="admin__header-brand">
          <img src="/Logo.svg" alt="Build & Scale 2026" className="admin__header-logo-img" />
          <div>
            <p className="admin__header-title">Admin Dashboard</p>
            <p className="admin__header-sub">Build & Scale 2026 · Registrations</p>
          </div>
        </div>
        <div className="admin__header-actions">
          <button className="admin__btn admin__btn--outline" onClick={load} disabled={loading}>
            <RefreshCw size={15} className={loading ? 'admin-spin' : ''} />
            Refresh
          </button>
          <button className="admin__btn admin__btn--outline" onClick={exportCSV} disabled={!data.length}>
            <Download size={15} />
            Export CSV
          </button>
          <button className="admin__btn admin__btn--ghost" onClick={() => setAuthed(false)}>
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </header>

      <div className="admin__body">
        {!isConfigured && (
          <div className="admin__demo-notice">
            📋 <strong>Demo Mode:</strong> Google Sheets not connected. Showing sample data.
            Configure <code>SHEET_URL</code> in <code>src/utils/googleSheets.js</code> to see live registrations.
          </div>
        )}

        {fetchError && <div className="admin__error">{fetchError}</div>}

        {/* Stats row */}
        <div className="admin__stats">
          <StatCard
            icon={<Users size={20} />}
            label="Total Registrations"
            value={data.length}
            sub={`${filtered.length} shown`}
          />
          <StatCard
            icon={<GraduationCapIcon />}
            label="University Students"
            value={uniStudents}
            sub={`${secStudents} secondary`}
          />
          <StatCard
            icon={<School size={20} />}
            label="Institutions"
            value={institutions}
            sub="represented"
          />
          <StatCard
            icon={<TrendingUp size={20} />}
            label="Capacity"
            value={`${Math.round((data.length / 100) * 100)}%`}
            sub="of 100 seats"
          />
        </div>

        {/* Filters */}
        <div className="admin__filters">
          <div className="admin__search-wrap">
            <Search size={15} className="admin__search-icon" />
            <input
              className="admin__search"
              type="text"
              placeholder="Search by name, email, or institution..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="admin__filter-select"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
          >
            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="admin__table-wrap">
          {loading ? (
            <div className="admin__loading">
              <div className="admin__loading-spinner" />
              <span>Loading registrations...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin__empty">
              <Users size={32} />
              <p>No registrations found{search ? ' for your search' : ''}.</p>
            </div>
          ) : (
            <table className="admin__table">
              <thead>
                <tr>
                  {['#', 'Full Name', 'Email', 'Phone', 'Institution', 'Level', 'Referral', 'Registration ID', 'Timestamp'].map((h) => (
                    <th
                      key={h}
                      className={`admin__th ${h !== '#' ? 'admin__th--sortable' : ''}`}
                      onClick={() => h !== '#' && handleSort(h)}
                    >
                      {h} <SortIcon field={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={i} className="admin__tr">
                    <td className="admin__td admin__td--num">{i + 1}</td>
                    <td className="admin__td admin__td--name">
                      <div className="admin__name-cell">
                        <div className="admin__avatar">
                          {(row['Full Name'] || '?')[0].toUpperCase()}
                        </div>
                        {row['Full Name'] || '—'}
                      </div>
                    </td>
                    <td className="admin__td">{row.Email || '—'}</td>
                    <td className="admin__td">{row.Phone || '—'}</td>
                    <td className="admin__td">{row.Institution || '—'}</td>
                    <td className="admin__td">
                      <span className={`admin__badge ${['SS1','SS2','SS3'].includes(row.Level) ? 'admin__badge--sec' : 'admin__badge--uni'}`}>
                        {row.Level || '—'}
                      </span>
                    </td>
                    <td className="admin__td admin__td--muted">{row.Referral || '—'}</td>
                    <td className="admin__td admin__td--muted" style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.06em' }}>{row['Registration ID'] || '—'}</td>
                    <td className="admin__td admin__td--muted">{row.Timestamp || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="admin__footer-note">
          Showing {filtered.length} of {data.length} registrations ·
          Last refreshed {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

// Inline graduation cap icon
function GraduationCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
      <path d="M6 12v5c3.333 2 8.667 2 12 0v-5"/>
    </svg>
  );
}
