import React from 'react';

import './PlanetView.css';

type PlanetViewProps = {
    planetTexture: string;
    background?: string;
    name?: string;
};

export const PlanetView: React.FC<PlanetViewProps> = ({ planetTexture, background, name }) => {
    return (
        <div>
            <div className="card">
                <p>Edit <code>src/App.tsx</code> and save to test HMR</p>
            </div>
        </div>
    );
};