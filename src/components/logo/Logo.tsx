import React from 'react';

import './Logo.css';
import logo from './logo.png';

export const Logo: React.FC = () => {
    return (
        <div className="logo">
            <img src={logo} alt="logo" />
        </div>
    );
};