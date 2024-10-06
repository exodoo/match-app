import React from 'react';

import './Logo.css';
import logoWhite from './logo.png';
import logoDark from './logo.png';

type LogoProps = {
    theme?: 'dark' | 'light';
};

export const Logo: React.FC<LogoProps> = ({ theme }) => {
    return (
        <div className="logo">
            <img src={theme === 'dark' ? logoDark : logoWhite} alt="logo" />
        </div>
    );
};