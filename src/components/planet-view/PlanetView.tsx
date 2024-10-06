import React, { useState, useEffect } from 'react';

import './PlanetView.css';

type PlanetViewProps = {
    planetTexture: string;
    background?: string;
};

const apiUrl = import.meta.env.VITE_PLANET_MICROFE_URL as string;

export const PlanetView: React.FC<PlanetViewProps> = ({ planetTexture, background }) => {
    const [planetUrl, setPlanetUrl] = useState<string>('');

    useEffect(() => {
        const params = new URLSearchParams();
        params.append('texture', planetTexture);
        params.append('background', background || '');
        const iframeUrl = `${apiUrl}?${params.toString()}`;
        setPlanetUrl(iframeUrl);
    }, [planetTexture, background]);

    return (
        <div>
            <iframe
                src={planetUrl}
                className="planet-view"
                title="Planet View">
            </iframe>
        </div>
    );
};