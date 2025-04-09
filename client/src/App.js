import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import the Navbar component
import HomePage from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import CountryData from './components/countryData';
import ApiKeyManager from './components/ApiKeyManager';
import Dashboard from './components/Dashboard';

const App = () => {
    const [apiKey, setApiKey] = useState('');

    return (
        <Router>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
                <Navbar /> {/* Include the Navbar component */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login setApiKey={setApiKey} />} />
                    <Route path="/country-data" element={apiKey ? <CountryData apiKey={apiKey} /> : <p>Please log in to view country data.</p>} />
                    <Route path="/api-key-manager" element={<ApiKeyManager />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;