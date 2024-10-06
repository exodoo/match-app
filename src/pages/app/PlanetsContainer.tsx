import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Auth, Planets } from '../../api';
import PlanetDetailedCard from './PlanetDetailedCard';

const planetsService = Planets.getInstance();

const PlanetsContainer: React.FC = () => {
    const [completed, setCompleted] = useState(false);
    const [selected, setSelected] = useState<unknown | null>(null);
    const [loading, setLoading] = useState(true);
    const [rateSending, setRateSending] = useState(false);

    if (!Auth.getInstance().isLoggedIn())
        return <Navigate to="/" replace />;

    const handleRatePlanet = (planet: any, rating: number) => {
        if (completed || rateSending) return;
        setRateSending(true);
        planetsService.ratePlanet(planet.id, rating)
            .then(() => {
                return planetsService.getPlanets();
            })
            .then((planets) => {
                planets.length === 0 && !!selected
                    ? setCompleted(true) :
                    setSelected(planets[0]);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setRateSending(false);
            });
    };

    useEffect(() => {
        planetsService.getPlanets()
            .then((planets) => {
                setSelected(planets[0]);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className="card">
                {loading && <p>Loading...</p>}
                <PlanetDetailedCard planet={selected} onRate={handleRatePlanet} />
            </div>
            <div className="avatar-container">
                <h3>User Avatar:</h3>
                <Avatar userId={userId} alt="Test User Avatar" />
            </div>
        </div>
    );
};

export default PlanetsContainer;
