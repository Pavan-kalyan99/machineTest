import React from 'react';
import {Routes, Route } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import Dashboard from './components/pages/Dashboard';
import AddAgent from './components/pages/AddAgent';
import UploadCSV from './components/pages/UploadFile';

const App = () => {
  // console.log('called');
  return (
    // <Router>
    <>
    
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-agent" element={<AddAgent />} />
        <Route path="/upload-csv" element={<UploadCSV />} />
      </Routes>
    
    </>
    // </Router>
  );
}
export default App;