import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import VerifyPage from './pages/VerifyPage';
import Navbar from './components/Navbar';
import OrbitalLoader from './components/OrbitalLoader';

function App() {
  const [loading, setLoading] = React.useState(true);
  const isVerify = window.location.pathname === '/verify';

  React.useEffect(() => {
    if (isVerify) { setLoading(false); return; }
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [isVerify]);

  if (loading) return <OrbitalLoader />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/register" element={<><Navbar /><RegisterPage /></>} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
