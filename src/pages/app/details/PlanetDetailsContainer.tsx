import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlanetDetailedCard from './PlanetDetailedCard';

const PlanetDetailsContainer: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [planet, setPlanet] = useState<any | null>(null);

    useEffect(() => {
        console.log('PlanetDetailsContainer', id);
        setPlanet({ name: 'Earth', planet_texture: 'earth', background: 'blue' });
    }, [id]);

    return <PlanetDetailedCard planet={planet} />;
};

export default PlanetDetailsContainer;
