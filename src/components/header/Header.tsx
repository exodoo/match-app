import React from 'react';

import { Logo } from '../logo/Logo';
import './Header.css';

export const Header: React.FC = () => {
    return (
        <div className="header">
            <Logo />
        </div>
    );
};