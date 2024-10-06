import React from 'react';

import { PlanetView } from '../../components/planet-view/PlanetView';

type PlanetDetailedCardProps = {
  planet: any;
  onRate: (planet: unknown, rating: number) => void;
};

const PlanetDetailedCard: React.FC<PlanetDetailedCardProps> = ({ planet, onRate }) => {
  if (!planet) {
    return null;
  }

  return (
    <div>
      <div className="card">
        {planet.name}
        <PlanetView planetTexture={planet.planet_texture} background={planet.background} />
        <button onClick={() => onRate(planet, 1)}>1</button>
      </div>
    </div>
  );
};

export default PlanetDetailedCard;
