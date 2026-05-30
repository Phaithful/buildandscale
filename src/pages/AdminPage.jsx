import React, { useState, useEffect, useCallback } from 'react';
import {
  LogOut, RefreshCw, Download, Users, TrendingUp, School,
  Search, ChevronUp, ChevronDown, Send, CheckCircle, X, UserPlus, BookOpen, UserCheck,
} from 'lucide-react';
import {
  fetchRegistrations, sendReminderEmails, SHEET_URL,
  fetchSecondaryStudents, submitSecondaryStudent, updateSecondaryCheckIn,
  generateSecStudentId,
} from '../utils/googleSheets';
import './AdminPage.css';

const ADMIN_PASSWORD = 'Admin2357';

const DEMO_SECONDARY = [
  { Timestamp: '5/30/2026, 07:45:00', 'Full Name': 'Chisom Eze', Class: 'SS3', 'Student ID': 'SEC-DEMO-001', 'Checked In': 'FALSE' },
  { Timestamp: '5/30/2026, 07:46:00', 'Full Name': 'Obiora Nwachukwu', Class: 'SS2', 'Student ID': 'SEC-DEMO-002', 'Checked In': 'TRUE' },
  { Timestamp: '5/30/2026, 07:47:00', 'Full Name': 'Adanna Obi', Class: 'SS1', 'Student ID': 'SEC-DEMO-003', 'Checked In': 'FALSE' },
  { Timestamp: '5/30/2026, 07:48:00', 'Full Name': 'Emeka Okafor', Class: 'SS3', 'Student ID': 'SEC-DEMO-004', 'Checked In': 'TRUE' },
  { Timestamp: '5/30/2026, 07:49:00', 'Full Name': 'Ngozi Ibe', Class: 'SS2', 'Student ID': 'SEC-DEMO-005', 'Checked In': 'FALSE' },
];

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
  const [activeTab, setActiveTab] = useState('registrations');

  // Registrations tab
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('Timestamp');
  const [sortDir, setSortDir] = useState('desc');
  const [levelFilter, setLevelFilter] = useState('All');
  const [reminderOpen, setReminderOpen] = useState(false);
  const [reminderSubject, setReminderSubject] = useState('Build & Scale 2026 — See You Saturday!');
  const [reminderMessage, setReminderMessage] = useState(
    "We're looking forward to seeing you at Build & Scale 2026 this Saturday, 30th May 2026!\n\nDoors open at 8:00 AM at the Peter Mbah Law Auditorium, Godfrey Okoye University, Enugu.\n\nDon't forget to bring your registration QR code for entry. See you there!"
  );
  const [reminderSending, setReminderSending] = useState(false);
  const [reminderDone, setReminderDone] = useState(null);

  // Secondary students tab
  const [secStudents, setSecStudents] = useState([]);
  const [secLoading, setSecLoading] = useState(false);
  const [secError, setSecError] = useState('');
  const [secSearch, setSecSearch] = useState('');
  const [secClassFilter, setSecClassFilter] = useState('All');
  const [addName, setAddName] = useState('');
  const [addClass, setAddClass] = useState('SS1');
  const [adding, setAdding] = useState(false);
  const [addErr, setAddErr] = useState('');

  const isConfigured = SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';

  const load = useCallback(async () => {
    if (!isConfigured) {
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

  const loadSecondary = useCallback(async () => {
    if (!isConfigured) {
      setSecStudents(DEMO_SECONDARY);
      return;
    }
    setSecLoading(true);
    setSecError('');
    try {
      const rows = await fetchSecondaryStudents();
      setSecStudents(rows);
    } catch {
      setSecError('Could not load secondary students. Make sure the Apps Script has been updated — see src/utils/googleSheets.js for instructions.');
    } finally {
      setSecLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    if (authed) {
      load();
      loadSecondary();
    }
  }, [authed, load, loadSecondary]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Incorrect password. Please try again.');
    }
  };

  // ── Registrations derived ───────────────────────────────────────
  const uniStudents = data.filter((r) => r.Level && !['SS1', 'SS2', 'SS3'].includes(r.Level)).length;
  const secStudentsInReg = data.filter((r) => ['SS1', 'SS2', 'SS3'].includes(r.Level)).length;
  const institutions = [...new Set(data.map((r) => r.Institution).filter(Boolean))].length;
  const checkedInCount = data.filter((r) => (r['Checked In'] || '').toString().trim()).length;
  const levels = ['All', ...new Set(data.map((r) => r.Level).filter(Boolean))].sort();

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

  // ── Secondary derived ───────────────────────────────────────────
  const secCheckedIn = secStudents.filter((s) => s['Checked In'] === 'TRUE').length;
  const secSS1 = secStudents.filter((s) => s.Class === 'SS1').length;
  const secSS2 = secStudents.filter((s) => s.Class === 'SS2').length;
  const secSS3 = secStudents.filter((s) => s.Class === 'SS3').length;

  const filteredSec = secStudents.filter((s) => {
    const q = secSearch.toLowerCase();
    const matchSearch = !q || (s['Full Name'] || '').toLowerCase().includes(q);
    const matchClass = secClassFilter === 'All' || s.Class === secClassFilter;
    return matchSearch && matchClass;
  });

  // ── Secondary handlers ──────────────────────────────────────────
  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!addName.trim()) { setAddErr('Please enter the student\'s full name.'); return; }
    setAdding(true);
    setAddErr('');
    const studentId = generateSecStudentId();
    const newStudent = {
      Timestamp: new Date().toLocaleString('en-NG', { timeZone: 'Africa/Lagos' }),
      'Full Name': addName.trim(),
      Class: addClass,
      'Student ID': studentId,
      'Checked In': 'FALSE',
    };
    setSecStudents((prev) => [newStudent, ...prev]);
    setAddName('');
    if (isConfigured) {
      try {
        await submitSecondaryStudent({ name: newStudent['Full Name'], secClass: addClass, studentId });
      } catch {
        setAddErr('Added locally. Sheet sync may have failed — refresh to verify.');
      }
    }
    setAdding(false);
  };

  const handleToggleCheckIn = async (studentId) => {
    const current = secStudents.find((s) => s['Student ID'] === studentId);
    if (!current) return;
    const wasChecked = current['Checked In'] === 'TRUE';
    setSecStudents((prev) =>
      prev.map((s) =>
        s['Student ID'] === studentId ? { ...s, 'Checked In': wasChecked ? 'FALSE' : 'TRUE' } : s
      )
    );
    if (isConfigured) {
      try {
        await updateSecondaryCheckIn({ studentId, checkedIn: !wasChecked });
      } catch {
        setSecStudents((prev) =>
          prev.map((s) =>
            s['Student ID'] === studentId ? { ...s, 'Checked In': current['Checked In'] } : s
          )
        );
      }
    }
  };

  // ── Reminder ────────────────────────────────────────────────────
  const handleSendReminder = async () => {
    if (!reminderSubject.trim() || !reminderMessage.trim()) return;
    setReminderSending(true);
    try {
      await sendReminderEmails({ subject: reminderSubject, message: reminderMessage });
      setReminderDone(data.length);
    } catch {
      setReminderDone(0);
    } finally {
      setReminderSending(false);
    }
  };

  const closeReminder = () => { setReminderOpen(false); setReminderDone(null); };

  // ── CSV exports ─────────────────────────────────────────────────
  const exportCSV = () => {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const rows = data.map((r) => headers.map((h) => `"${(r[h] || '').replace(/"/g, '""')}"`).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BuildAndScale2026_Registrations_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportSecCSV = () => {
    if (!secStudents.length) return;
    const headers = ['Full Name', 'Class', 'Checked In', 'Student ID', 'Timestamp'];
    const rows = secStudents.map((s) =>
      headers.map((h) => `"${(s[h] || '').replace(/"/g, '""')}"`).join(',')
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `BuildAndScale2026_SecondaryStudents_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const SortIcon = ({ field }) =>
    sortField === field
      ? sortDir === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
      : null;

  // ── Login screen ────────────────────────────────────────────────
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

  // ── Dashboard ───────────────────────────────────────────────────
  return (
    <div className="admin">
      <header className="admin__header">
        <div className="admin__header-brand">
          <img src="/Logo.svg" alt="Build & Scale 2026" className="admin__header-logo-img" />
          <div>
            <p className="admin__header-title">Admin Dashboard</p>
            <p className="admin__header-sub">Build & Scale 2026 · Registrations</p>
          </div>
        </div>
        <div className="admin__header-actions">
          {activeTab === 'registrations' ? (
            <>
              <button className="admin__btn admin__btn--outline" onClick={load} disabled={loading}>
                <RefreshCw size={15} className={loading ? 'admin-spin' : ''} />
                Refresh
              </button>
              <button className="admin__btn admin__btn--outline" onClick={exportCSV} disabled={!data.length}>
                <Download size={15} />
                Export CSV
              </button>
              <button className="admin__btn admin__btn--primary" onClick={() => setReminderOpen(true)} disabled={!data.length}>
                <Send size={15} />
                Send Reminder
              </button>
            </>
          ) : (
            <>
              <button className="admin__btn admin__btn--outline" onClick={loadSecondary} disabled={secLoading}>
                <RefreshCw size={15} className={secLoading ? 'admin-spin' : ''} />
                Refresh
              </button>
              <button className="admin__btn admin__btn--outline" onClick={exportSecCSV} disabled={!secStudents.length}>
                <Download size={15} />
                Export CSV
              </button>
            </>
          )}
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
            Configure <code>SHEET_URL</code> in <code>src/utils/googleSheets.js</code> to see live data.
          </div>
        )}

        {activeTab === 'registrations' && fetchError && (
          <div className="admin__error">{fetchError}</div>
        )}

        {/* Stats row — registrations tab only */}
        {activeTab === 'registrations' && (
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
              sub={`${secStudentsInReg} secondary`}
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
            <StatCard
              icon={<UserCheck size={20} />}
              label="Checked In"
              value={checkedInCount}
              sub={`of ${data.length} registered`}
            />
          </div>
        )}

        {/* Tab nav */}
        <div className="admin__tabs">
          <button
            className={`admin__tab ${activeTab === 'registrations' ? 'admin__tab--active' : ''}`}
            onClick={() => setActiveTab('registrations')}
          >
            <Users size={15} />
            Registrations
            <span className="admin__tab-badge">{data.length}</span>
          </button>
          <button
            className={`admin__tab ${activeTab === 'secondary' ? 'admin__tab--active' : ''}`}
            onClick={() => setActiveTab('secondary')}
          >
            <BookOpen size={15} />
            Secondary School
            <span className="admin__tab-badge">{secStudents.length}</span>
          </button>
        </div>

        {/* ── Registrations tab ── */}
        {activeTab === 'registrations' && (
          <>
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
                      {['#', 'Full Name', 'Email', 'Phone', 'Institution', 'Level', 'Referral', 'Registration ID', 'Checked In', 'Timestamp'].map((h) => (
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
                          <span className={`admin__badge ${['SS1', 'SS2', 'SS3'].includes(row.Level) ? 'admin__badge--sec' : 'admin__badge--uni'}`}>
                            {row.Level || '—'}
                          </span>
                        </td>
                        <td className="admin__td admin__td--muted">{row.Referral || '—'}</td>
                        <td className="admin__td admin__td--muted" style={{ fontFamily: 'monospace', fontSize: '12px', letterSpacing: '0.06em' }}>{row['Registration ID'] || '—'}</td>
                        <td className="admin__td">
                          {(row['Checked In'] || '').toString().trim() ? (
                            <span className="admin__badge admin__badge--present" title={row['Checked In']}>Present</span>
                          ) : (
                            <span className="admin__badge admin__badge--absent">Absent</span>
                          )}
                        </td>
                        <td className="admin__td admin__td--muted">{row.Timestamp || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <p className="admin__footer-note">
              Showing {filtered.length} of {data.length} registrations · Last refreshed {new Date().toLocaleTimeString()}
            </p>
          </>
        )}

        {/* ── Secondary School tab ── */}
        {activeTab === 'secondary' && (
          <>
            {/* Add student form */}
            <div className="sec-add">
              <p className="sec-add__title">Add Student</p>
              <form className="sec-add__form" onSubmit={handleAddStudent}>
                <input
                  className="sec-add__input"
                  type="text"
                  placeholder="Full name"
                  value={addName}
                  onChange={(e) => { setAddName(e.target.value); setAddErr(''); }}
                  disabled={adding}
                  autoComplete="off"
                />
                <select
                  className="sec-add__select"
                  value={addClass}
                  onChange={(e) => setAddClass(e.target.value)}
                  disabled={adding}
                >
                  <option value="SS1">SS1</option>
                  <option value="SS2">SS2</option>
                  <option value="SS3">SS3</option>
                </select>
                <button
                  type="submit"
                  className="admin__btn admin__btn--primary"
                  disabled={adding || !addName.trim()}
                >
                  {adding
                    ? <><RefreshCw size={14} className="admin-spin" /> Adding…</>
                    : <><UserPlus size={14} /> Add Student</>}
                </button>
              </form>
              {addErr && <p className="sec-add__error">{addErr}</p>}
            </div>

            {/* Mini stats */}
            <div className="sec-stats">
              <div className="sec-stat">
                <span className="sec-stat__val">{secStudents.length}</span>
                <span className="sec-stat__lbl">Total</span>
              </div>
              <div className="sec-stat sec-stat--checked">
                <span className="sec-stat__val">{secCheckedIn}</span>
                <span className="sec-stat__lbl">Checked In</span>
              </div>
              <div className="sec-stat">
                <span className="sec-stat__val">{secSS1}</span>
                <span className="sec-stat__lbl">SS1</span>
              </div>
              <div className="sec-stat">
                <span className="sec-stat__val">{secSS2}</span>
                <span className="sec-stat__lbl">SS2</span>
              </div>
              <div className="sec-stat">
                <span className="sec-stat__val">{secSS3}</span>
                <span className="sec-stat__lbl">SS3</span>
              </div>
            </div>

            {/* Filters */}
            <div className="admin__filters">
              <div className="admin__search-wrap">
                <Search size={15} className="admin__search-icon" />
                <input
                  className="admin__search"
                  type="text"
                  placeholder="Search by name..."
                  value={secSearch}
                  onChange={(e) => setSecSearch(e.target.value)}
                />
              </div>
              <select
                className="admin__filter-select"
                value={secClassFilter}
                onChange={(e) => setSecClassFilter(e.target.value)}
              >
                <option value="All">All Classes</option>
                <option value="SS1">SS1</option>
                <option value="SS2">SS2</option>
                <option value="SS3">SS3</option>
              </select>
            </div>

            {/* Student list */}
            {secLoading ? (
              <div className="admin__loading">
                <div className="admin__loading-spinner" />
                <span>Loading students…</span>
              </div>
            ) : secError ? (
              <div className="admin__error">{secError}</div>
            ) : (
              <div className="sec-list">
                {filteredSec.length === 0 ? (
                  <div className="sec-empty">
                    <Users size={28} />
                    <p>
                      {secStudents.length === 0
                        ? 'No secondary school students added yet. Use the form above to add students.'
                        : 'No students match your search.'}
                    </p>
                  </div>
                ) : (
                  filteredSec.map((student) => {
                    const isChecked = student['Checked In'] === 'TRUE';
                    return (
                      <div
                        key={student['Student ID']}
                        className={`sec-row${isChecked ? ' sec-row--checked' : ''}`}
                        onClick={() => handleToggleCheckIn(student['Student ID'])}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggleCheckIn(student['Student ID']);
                          }
                        }}
                      >
                        <div className={`sec-row__check${isChecked ? ' sec-row__check--on' : ''}`}>
                          {isChecked && <CheckCircle size={16} />}
                        </div>
                        <div className="admin__avatar">
                          {(student['Full Name'] || '?')[0].toUpperCase()}
                        </div>
                        <span className="sec-row__name">{student['Full Name']}</span>
                        <span className={`admin__badge admin__badge--${(student.Class || '').toLowerCase()}`}>
                          {student.Class}
                        </span>
                        {isChecked && <span className="sec-row__status">Checked In</span>}
                        <span className="sec-row__time">{student.Timestamp || ''}</span>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            <p className="admin__footer-note">
              {filteredSec.length} of {secStudents.length} students · {secCheckedIn} checked in
            </p>
          </>
        )}
      </div>

      {/* Reminder Modal */}
      {reminderOpen && (
        <div className="admin-reminder-overlay" onClick={() => { if (!reminderSending) closeReminder(); }}>
          <div className="admin-reminder" onClick={(e) => e.stopPropagation()}>
            {reminderDone !== null ? (
              <div className="admin-reminder__success">
                <CheckCircle size={44} className="admin-reminder__success-icon" />
                <p className="admin-reminder__success-title">Emails sent!</p>
                <p className="admin-reminder__success-sub">Reminder delivered to {reminderDone} registered attendee{reminderDone !== 1 ? 's' : ''}.</p>
                <button className="admin__btn admin__btn--outline" onClick={closeReminder}>Close</button>
              </div>
            ) : (
              <>
                <div className="admin-reminder__head">
                  <div>
                    <p className="admin-reminder__title">Send Reminder Email</p>
                    <p className="admin-reminder__sub">{data.length} registered attendee{data.length !== 1 ? 's' : ''} will receive this</p>
                  </div>
                  <button className="admin-reminder__close" onClick={closeReminder} disabled={reminderSending} aria-label="Close">
                    <X size={16} />
                  </button>
                </div>

                <div className="admin-reminder__body">
                  <label className="admin-reminder__label">Subject</label>
                  <input
                    className="admin-reminder__input"
                    value={reminderSubject}
                    onChange={(e) => setReminderSubject(e.target.value)}
                    placeholder="Email subject line"
                    disabled={reminderSending}
                  />
                  <label className="admin-reminder__label">Message</label>
                  <textarea
                    className="admin-reminder__textarea"
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    placeholder="Write your message here…"
                    rows={8}
                    disabled={reminderSending}
                  />
                  <p className="admin-reminder__hint">
                    Each email will be personalised with the attendee's first name. Event details are included automatically.
                  </p>
                </div>

                <div className="admin-reminder__foot">
                  <button className="admin__btn admin__btn--ghost" onClick={closeReminder} disabled={reminderSending}>Cancel</button>
                  <button
                    className="admin__btn admin__btn--primary"
                    onClick={handleSendReminder}
                    disabled={reminderSending || !reminderSubject.trim() || !reminderMessage.trim()}
                  >
                    {reminderSending
                      ? <><RefreshCw size={14} className="admin-spin" /> Sending…</>
                      : <><Send size={14} /> Send to {data.length} attendee{data.length !== 1 ? 's' : ''}</>}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GraduationCapIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
      <path d="M6 12v5c3.333 2 8.667 2 12 0v-5" />
    </svg>
  );
}
