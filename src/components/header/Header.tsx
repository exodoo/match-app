import React from 'react';

import { Logo } from '../logo/Logo';
import './Header.css';

type HeaderProps = {
    theme?: 'dark' | 'light';
};

export const Header: React.FC<HeaderProps> = ({ theme }) => {
    return (
        <div className="header">
            <Logo theme={theme} />
        </div>
    );
};