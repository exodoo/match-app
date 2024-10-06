import React from 'react';
import { Navigate } from 'react-router-dom';

import { Auth } from '../../api';
import { Avatar } from '../../components/avatar/Avatar';

const PlanetsContainer: React.FC = () => {
    if (!Auth.getInstance().isLoggedIn()) {
        return <Navigate to="/" replace />;
    }

    const userId = localStorage.getItem('id') || '';
    
    return (
        <div>
            <div className="card">
                <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
            </div>
            <div className="avatar-container">
                <h3>User Avatar:</h3>
                <Avatar userId={userId} alt="Test User Avatar" />
            </div>
        </div>
    );
};

export default PlanetsContainer;
