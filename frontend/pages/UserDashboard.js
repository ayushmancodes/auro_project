import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div>
            <h1>Welcome to Career Tracker</h1>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Link to="/job-applications" style={linkStyle}>
                    Manage Job Applications
                </Link>
                <Link to="/skill-analysis" style={linkStyle}>
                    Analyze Skill Gaps
                </Link>
                <Link to="/growth-progress" style={linkStyle}>
                    Monitor Progress
                </Link>
            </nav>
        </div>
    );
};

// Styling for the links (you can move this to a CSS file if preferred)
const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    padding: '8px 16px',
    borderRadius: '4px',
    backgroundColor: '#f0f0f0',
    transition: 'background-color 0.3s ease',
};

export default UserDashboard;
