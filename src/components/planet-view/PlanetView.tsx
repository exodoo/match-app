import React from 'react';

import './PlanetView.css';

type PlanetViewProps = {
    planetTexture: string;
    background?: string;
    name?: string;
};

export const PlanetView: React.FC<PlanetViewProps> = ({ planetTexture, background, name }) => {
    const apiUrl = import.meta.env.VITE_PLANET_MICROFE_URL as string;
    const params = new URLSearchParams();
    params.append('texture', planetTexture);
    params.append('background', background || '');
    const iframeUrl = `${apiUrl}?${params.toString()}`;

    return (
        <div>
            <iframe 
                src={iframeUrl} 
                className="planet-view"
                title="Planet View">
            </iframe>
        </div>
    );
};