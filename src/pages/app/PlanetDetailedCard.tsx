import React from 'react';

type PlanetDetailedCardProps = {
  planet: unknown;
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
        <button onClick={() => onRate(planet, 1)}>1</button>
      </div>
    </div>
  );
};

export default PlanetDetailedCard;
