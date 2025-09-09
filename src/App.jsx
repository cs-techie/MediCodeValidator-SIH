import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CodeSearch from './pages/CodeSearch';
import Validation from './pages/Validation';
import Reports from './pages/Reports';
import Integration from './pages/Integration';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<CodeSearch />} />
            <Route path="/validation" element={<Validation />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/integration" element={<Integration />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
