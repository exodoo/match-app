import React from 'react';

import { PlanetView } from '../../../components/planet-view/PlanetView';

type PlanetDetailedCardProps = {
  planet: unknown;
};

const PlanetDetailedCard: React.FC<PlanetDetailedCardProps> = ({ planet }) => {
  if (!planet) {
    return null;
  }

  return (
    <div>
      <div className="card">
        {planet.name}
        <PlanetView planetTexture={planet.planet_texture} background={planet.background} />
      </div>
    </div>
  );
};

export default PlanetDetailedCard;
