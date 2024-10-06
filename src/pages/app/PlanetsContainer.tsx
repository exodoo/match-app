import React from 'react';
import { Navigate } from 'react-router-dom';

import { Auth } from '../../api';

const PlanetsContainer: React.FC = () => {
    if (!Auth.getInstance().isLoggedIn())
        return <Navigate to="/" replace />;
    
    return (
        <div>
            <div className="card">
                <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
            </div>
        </div>
    );
};

export default PlanetsContainer;
