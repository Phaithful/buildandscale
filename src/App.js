import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import OrbitalLoader from './components/OrbitalLoader';

function App() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <OrbitalLoader />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar /><HomePage /></>} />
        <Route path="/register" element={<><Navbar /><RegisterPage /></>} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
