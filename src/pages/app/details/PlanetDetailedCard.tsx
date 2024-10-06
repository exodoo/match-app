import React from 'react';

import { DetailedHeader } from './components';

type PlanetDetailedCardProps = {
  planet: any;
};

const PlanetDetailedCard: React.FC<PlanetDetailedCardProps> = ({ planet }) => {
  if (!planet) {
    return null;
  }

  return (
    <div>
      <div className="card">
        <DetailedHeader planet={planet} />
      </div>
    </div>
  );
};

export default PlanetDetailedCard;
